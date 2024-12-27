import BasePattern from "./Builder/BasePattern.js";

class RegexBuilder extends BasePattern {
  constructor() {
    super();
    // Define default values
    this.str = "";
    this.pattern = "";
    this.returnGroups = false;
    this.namedGroups = false;
  }

  // Utility method to set the regex pattern directly
  setPattern(pattern) {
    this.pattern = pattern;
    return this;
  }

  checkPattern() {
    if (this.pattern === undefined || this.pattern === "") {
      throw new Error("Pattern must be set and cannot be an empty string.");
    }
    return true; // Pattern is set and not an empty string
  }

  getAllMatches(input) {
    // Potentially modify to account for group handling based on `this.returnGroups`
    return super.getMatches(input, this.returnGroups, this.namedGroups);
  }

  /**
   * Searches for a keyword in the multiline string.
   *
   * @param {string} keyword The keyword to search for.
   * @return {Array|null} An array of matches or null if no matches are found.
   */
  searchByKeyword(keyword) {
    const builder = new RegexBuilder();
    builder
      .start()
      .anyChars()
      .lookAhead((pattern) => {
        pattern.exact(keyword);
      })
      .anyChars();

    return builder.get(this.str);
  }

  /**
   * Searches for a pattern in the multiline string.
   *
   * @param {Function} callback The pattern to search for.
   * @return {Array|null} An array of matches or null if no matches are found.
   */
  searchBySubpattern(callback) {
    // Get pattern from callback
    const subPattern = new RegexBuilder();
    callback(subPattern);

    const builder = new RegexBuilder();
    builder
      .start()
      .anyChars()
      .lookAhead((pattern) => {
        pattern.addRawRegex(subPattern.toRegex());
      })
      .anyChars();

    return builder.get(this.str);
  }

  /**
   * Filters the current multiline string by the given keyword
   * And return every line except that includes keyword
   *
   * @param {string} keyword The keyword to filter the string by.
   * @return {Array|null} The filtered result as an array, or null if no match is found.
   */
  exceptByKeyword(keyword) {
    const builder = new RegexBuilder();
    builder
      .start()
      .useStringBeginning()
      .negativeLookAhead((pattern) => {
        pattern.anyChars().exact(keyword);
      })
      .anyChars()
      .useStringEnd()
      .asMultiline();

    return builder.get(this.str);
  }

  /**
   * Filters the current multiline string by the given subpattern
   * And return every line except that includes subpattern
   *
   * @param {Function} callback A callback function that defines the subpattern.
   * @return {Array|null} The resulting pattern as an array, or null if no match is found.
   */
  exceptBySubpattern(callback) {
    // Get pattern from callback
    const subPattern = new RegexBuilder();
    callback(subPattern);

    const builder = new RegexBuilder();
    builder
      .start()
      .useStringBeginning()
      .negativeLookAhead((pattern) => {
        pattern.anyChars().addRawRegex(subPattern.toRegex());
      })
      .anyChars()
      .useStringEnd()
      .asMultiline();

    return builder.get(this.str);
  }

  swapByCallback(callback, results) {
    const swapped = [];
    results.forEach((match) => {
      const data = match.groups;
      const replaced = callback(data);
      swapped.push(replaced);
    });
    return swapped;
  }

  swapByString(objectString, results) {
    const swapped = [];
    results.forEach((match) => {
      const data = match.groups;
      let swappedString = objectString;
      Object.keys(data).forEach((key) => {
        const pattern = new RegExp(`\\[\\s*${key}\\s*\\]`, "i");
        swappedString = swappedString.replace(pattern, data[key]);
      });
      swapped.push(swappedString);
    });
    return swapped;
  }

  // Main API

  setString(str) {
    this.str = str;
    return this;
  }

  source(str) {
    this.setString(str);
    return this;
  }

  start(str) {
    this.setString(str);
    return this;
  }

  get(source = "") {
    if (source.length > 0) {
      this.source(source);
    }
    this.checkPattern();
    const matches = this.getAllMatches(this.str);
    return matches; // Returns the matches as an array
  }

  check(source = "") {
    if (source.length > 0) {
      this.source(source);
    }
    this.checkPattern();
    return this.validateInput(this.str);
  }

  checkString(source = "") {
    if (source.length > 0) {
      this.source(source);
    }
    this.checkPattern();
    return this.validateMatches(this.str);
  }

  count() {
    this.checkPattern();
    const matches = this.getMatches(this.str);
    return matches ? matches.length : 0;
  }

  toRegex() {
    this.checkPattern();
    return this.pattern;
  }

  replace(replacePattern) {
    this.checkPattern();
    const matches = this.getAllMatches(this.str);

    if (matches) {
      const uniqueMatches = [...new Set(matches)];
      let replaced = this.str;
      uniqueMatches.forEach((match) => {
        replaced = replaced.replace(
          new RegExp(match, "g"),
          replacePattern(match)
        );
      });
      return replaced;
    }
    return this.str;
  }

  search(keywordOrPattern) {
    let matches;

    if (typeof keywordOrPattern === "function") {
      matches = this.searchBySubpattern(keywordOrPattern);
    } else if (typeof keywordOrPattern === "string") {
      matches = this.searchByKeyword(keywordOrPattern);
    }

    if (matches) {
      return matches.map((match) => match.trim());
    }

    return null;
  }

  searchReverse(keywordOrPattern) {
    let matches;

    if (typeof keywordOrPattern === "function") {
      matches = this.exceptBySubpattern(keywordOrPattern);
    } else if (typeof keywordOrPattern === "string") {
      matches = this.exceptByKeyword(keywordOrPattern);
    }

    if (matches) {
      const filteredMatches = matches
        .map((match) => match.trim())
        .filter((match) => match !== "");
      return filteredMatches;
    }

    return null;
  }

  swap(stringOrCallback) {
    // Check if the pattern is set
    this.checkPattern();

    // Check if groups are enabled
    if (!this.getReturnGroups()) {
      throw new Error(
        "Swap must be used with groups (group or namedGroup methods)."
      );
    }

    const results = this.get();
    let matches;

    if (typeof stringOrCallback === "function") {
      matches = this.swapByCallback(stringOrCallback, results);
    } else if (typeof stringOrCallback === "string") {
      matches = this.swapByString(stringOrCallback, results);
    } else {
      throw new Error(
        "Invalid input for swap. Expected a string or a callback function."
      );
    }

    return matches;
  }

  options(optionsInput) {
    // Check if optionsInput is an object
    if (
      typeof optionsInput === "object" &&
      optionsInput !== null &&
      !Array.isArray(optionsInput)
    ) {
      this.processOptionsArray(optionsInput);
    }
    // Check if optionsInput is a function (callback)
    else if (typeof optionsInput === "function") {
      this.processOptionsCallback(optionsInput);
    } else {
      throw new Error(
        "Invalid input for options. Expected an object or a callback function."
      );
    }
    return this;
  }

  asCaseInsensitive() {
    this.addExpressionFlag("i");
    return this;
  }

  asMultiline() {
    this.addExpressionFlag("m");
    return this;
  }

  asSingleline() {
    this.addExpressionFlag("s");
    return this;
  }

  asUnicode() {
    this.addExpressionFlag("u");
    return this;
  }

  asSticky() {
    this.addExpressionFlag("y");
    return this;
  }

  setReturnGroups(enable = true) {
    this.returnGroups = enable;
    return this;
  }

  getReturnGroups() {
    return this.returnGroups;
  }

  setNamedGroups(enable = true) {
    this.namedGroups = enable;
    return this;
  }

  getNamedGroups() {
    return this.namedGroups;
  }
}

export default RegexBuilder;
