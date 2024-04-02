import OptionsBuilder from "./OptionsBuilder.js";

class BasePattern {
  constructor() {
    // Initialize an OptionsBuilder instance to manage pattern options
    this.optionsBuilder = new OptionsBuilder();
    this.pattern = "[a-z]";
    this.name = "";
    this.args = [];
    this.defaultOptions = [];
    this.expressionFlags = "";
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

  getMatches(input, returnGroups = false) {
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
      return allMatches.map((match) => ({
        result: match[0],
        groups: match.slice(1).map((group) => group || ""), // Ensure undefined groups are returned as empty strings.
      }));
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

  processArguments(args, values) {
    const options = {};
    args.forEach((arg, index) => {
      if (values[index]) {
        options[arg] = values[index];
      }
    });
    return options;
  }

  processCallback(callback) {
    const optionsBuilder = new OptionsBuilder();
    callback(optionsBuilder);
    return optionsBuilder.getOptions();
  }

  addExpressionFlag(flag) {
    if (!this.expressionFlags.includes(flag)) {
      this.expressionFlags += flag;
    }
  }
}

export default BasePattern;
