import OptionsBuilder from "./OptionsBuilder.js";

class BasePattern {
  constructor() {
    // Initialize an OptionsBuilder instance to manage pattern options
    this.optionsBuilder = new OptionsBuilder();
    // String to hold the constructed regex pattern.
    this.pattern = "[a-z]";
    // Regex expression flags like "g"
    this.expressionFlags = "";
    // Flag to indicate if the next quantifier should be lazy (non-greedy).
    this.lazy = false;
    // Flag to indicate that pattern is used inside charSet (Auto remove of extra "[]").
    this.inCharSet = false;
  }

  getPattern() {
    return this.pattern;
  }

  add(partOfPattern) {
    this.pattern += partOfPattern;
    return this;
  }

  setOptions(options) {
    // Use the setOptions method from OptionsBuilder to handle object input
    this.optionsBuilder.setOptions(options);
  }

  setOptionsObject(optionsFromTempBuilder) {
    this.optionsBuilder.setOptionsFromTempBuilder(optionsFromTempBuilder);
  }

  // Accept an option instance and delegate to OptionsBuilder
  setOption(name, value) {
    this.optionsBuilder.setOption(name, value);
  }

  validateInput(input) {
    const mainPattern = this.getInputValidationPattern();

    return mainPattern.test(input) && this.optionsBuilder.validate(input);
  }

  validateMatches(input) {
    const mainPattern = this.getMatchesValidationPattern();
    const matches = input.match(mainPattern) || [];

    return (
      matches.length > 0 &&
      matches.every((match) => this.optionsBuilder.validate(match))
    );
  }

  getMatches(input, returnGroups = false, namedGroups = false) {
    // Ensure the pattern is compiled with the 'g' flag to find all matches.
    // Also, incorporate any expression flags set previously.
    this.addExpressionFlag("g");
    const regex = this.getMatchesValidationPattern();
    const allMatches = [...input.matchAll(regex)];

    if (!allMatches.length) {
      return null;
    }

    // When returnGroups is true, return an array of objects with 'result' and 'groups'.
    if (returnGroups) {
      console.log(allMatches);
      if (namedGroups) {
        return allMatches.map((match) => ({
          result: match[0],
          groups: match.groups,
        }));
      } else {
        return allMatches.map((match) => ({
          result: match[0],
          groups: match.slice(1).map((group) => group || ""), // Ensure undefined groups are returned as empty strings.
        }));
      }
    } else {
      // When returnGroups is false, validate each match against the options.
      // Since validation might not always be relevant (e.g., specific to whole input validation),
      // this filtering could be adjusted or removed based on the specific validation logic in optionsBuilder.
      return allMatches
        .map((match) => match[0]) // First, extract the full match from each result.
        .filter((match) => this.optionsBuilder.validate(match)); // Then, optionally filter matches through validation.
    }
  }

  getInputValidationPattern() {
    // Build the regex considering the pattern and expression flags
    return new RegExp(`^${this.pattern}$`, this.expressionFlags);
  }

  getMatchesValidationPattern() {
    // Build the regex considering the pattern and expression flags
    return new RegExp(this.pattern, this.expressionFlags);
  }

  filterByOptions(allMatches) {
    return allMatches.filter((match) => this.validateOptions(match));
  }

  validateOptions(input) {
    return this.optionsBuilder.validate(input);
  }

  processOptionsArray(optionsObject) {
    // Here, directly utilize setOptions from BasePattern or manipulate as needed
    this.setOptions(optionsObject);
  }

  processOptionsCallback(optionsCallback) {
    // Initialize a temporary OptionsBuilder instance to capture the options set by the callback
    const tempOptionsBuilder = new OptionsBuilder();
    // Execute the callback with the temporary OptionsBuilder as its argument
    optionsCallback(tempOptionsBuilder);
    // Now, apply the options captured by the temporary OptionsBuilder to this RegexBuilder instance
    // This assumes that setOptions can handle the result of tempOptionsBuilder.getOptions()
    const options = tempOptionsBuilder.getOptions();
    this.setOptionsObject(options);
  }

  addExpressionFlag(flag) {
    if (!this.expressionFlags.includes(flag)) {
      this.expressionFlags += flag;
    }
  }

  /**
   * Applies a quantifier to a given regex pattern.
   *
   * @param string $pattern The regex pattern to which the quantifier will be applied.
   * @param string|null $quantifier The quantifier to apply. Can be 'zeroOrMore', 'oneOrMore', or 'optional'.
   * @return string The modified pattern with the quantifier applied.
   */
  applyQuantifier(pattern, q) {
    if (!q) {
      return pattern;
    }

    let p = pattern;
    switch (q) {
      case "zeroOrMore":
      case "0>":
      case "0+":
      case "*":
        p = `(?:${pattern})*`;
        break;
      case "oneOrMore":
      case "1>":
      case "1+":
      case "+":
        p = `(?:${pattern})+`;
        break;
      case "optional":
      case "?":
      case "|":
        p = `(?:${pattern})?`;
        break;
      default:
        if (Number.isInteger(q)) {
          p = `(?:${pattern}){${q}}`;
        } else if (/^\d{1,10}$/.test(q)) {
          p = `(?:${pattern}){${q}}`;
        } else if (/^\d{1,10},\d{1,10}$/.test(q)) {
          const range = q.split(",");
          p = `(?:${pattern}){${range[0]},${range[1]}}`;
        }
        break;
    }

    return this.lazy ? this.addLazy(p) : p;
  }

  /**
   * Generates a regex quantifier string based on length parameters.
   *
   * @param int|null $length Exact length for the quantifier.
   * @param int $minLength Minimum length for the quantifier.
   * @param int $maxLength Maximum length for the quantifier.
   * @return string The generated regex quantifier string.
   */
  getLengthOption(length = null, minLength = 0, maxLength = 0) {
    let qntf = "+";
    if (Number.isInteger(length) && length > 0) {
      qntf = `{${length}}`;
    } else if (length === 0 || this.inCharSet) {
      return "";
    } else if (minLength > 0 && maxLength > 0) {
      qntf = `{${minLength},${maxLength}}`;
    } else if (minLength > 0) {
      qntf = `{${minLength},}`;
    } else if (maxLength > 0) {
      qntf = `{0,${maxLength}}`;
    }

    return this.lazy ? this.addLazy(qntf) : qntf;
  }

  /**
   * Adds a lazy (non-greedy) modifier to a quantifier
   * and sets $lazy to false for ensuring single use
   *
   * @param string $quantifier The quantifier to which the lazy modifier will be added.
   * @return string The quantifier with the lazy modifier applied.
   */
  addLazy(quantifier) {
    this.lazy = false;
    return quantifier + "?";
  }

  /**
   * Creates a lazy (non-greedy) quantifier for the next method call.
   *
   * @return self
   */
  asLazy() {
    this.lazy = true;
    return this; // Allow chaining
  }

  isInCharSet() {
    this.inCharSet = true;
    return this; // Allow chaining
  }

  escapeAndAdd(partOfPattern, quantifier = null) {
    const escapedPart = this.escapeString(partOfPattern);
    this.pattern += quantifier
      ? this.applyQuantifier(escapedPart, quantifier)
      : escapedPart;
    return this; // Enable chaining
  }

  escapeString(str) {
    // RegExp.escape proposal is not yet implemented in JavaScript, so we use a manual escape method.
    // This method escapes special characters used in regex.
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  escapeArray(arr) {
    return arr.map((item) => this.escapeString(item));
  }
}

export default BasePattern;
