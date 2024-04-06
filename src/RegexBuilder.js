import BasePattern from "./Builder/BasePattern.js";

class RegexBuilder extends BasePattern {
  constructor() {
    super();
    // Define default values
    this.str = "";
    this.pattern = "";
    this.returnGroups = false;
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

  // Predefined patterns as methods
  email() {
    this.setPattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}");
    return this;
  }

  url() {
    this.setPattern("^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$");
    return this;
  }

  getAllMatches(input) {
    // Potentially modify to account for group handling based on `this.returnGroups`
    return super.getMatches(input, this.returnGroups);
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

  setReturnGroups(enable = true) {
    this.returnGroups = enable;
    return this;
  }
}

export default RegexBuilder;
