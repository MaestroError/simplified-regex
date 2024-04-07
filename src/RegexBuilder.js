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
  email(maxLength = null, onlyDomains = [], onlyExtensions = []) {
    // this.setPattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}");
    const regex = new this.constructor();
    regex
      .charSet((reg) => {
        reg.alphanumeric().underscore().percent().plus().minus();
      }, "1+")
      .atSign()
      .charSet((reg) => {
        reg.alphanumeric().dot().minus();
      }, "1+")
      .dot()
      .charSet((reg) => {
        reg.text();
      }, "2,10");

    this.setPattern(regex.toRegex());

    this.setOptions({
      maxLength: maxLength,
      onlyDomains: onlyDomains,
      onlyExtensions: onlyExtensions,
    });

    return this;
  }

  url(onlyProtocol = []) {
    // this.setPattern("(https?://[a-zA-Z0-9.-]+.[a-zA-Z]{2,}(/[a-zA-Z0-9/]*)?)");

    const regex = new this.constructor();

    // Common part of the URL pattern: domain name and optional path
    regex
      .exact("http")
      .exact("s", true, "?")
      .colon()
      .forwardSlash()
      .forwardSlash()
      .charSet((reg) => {
        reg.alphanumeric().dot().minus();
      }, "1+")
      .dot()
      .charSet((reg) => {
        reg.text();
      }, "2,6") // For simplicity, assuming TLD lengths of 2 to 6 characters
      .nonCapturingGroup((reg) => {
        reg.forwardSlash().charSet((reg) => {
          reg.alphanumeric().hyphen().underscore().forwardSlash();
        }, "*");
      }, "?");

    // Assuming setPattern constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Here we set the options; modify this part based on how your setOptions method works
    this.setOptions({
      onlyProtocol: onlyProtocol,
    });

    return this;
  }

  creditCardNumber(cardTypes = "") {
    const regex = new this.constructor();

    // Define the generic pattern for credit card numbers
    regex
      .nonCapturingGroup((reg) => {
        reg
          .nonCapturingGroup((reg) => {
            reg
              // Visa: Starts with 4
              .nonCapturingGroup((reg) => {
                reg.exact("4").digits(3);
              })
              .or()
              // MasterCard: Starts with 51 through 55
              .nonCapturingGroup((reg) => {
                reg
                  .exact("5")
                  .charSet((reg) => {
                    reg.exact("1").hyphen().exact("5");
                  })
                  .digits(2);
              })
              .or()
              // Discover: Starts with 6011 or 65
              .nonCapturingGroup((reg) => {
                reg.exact("6").nonCapturingGroup((reg) => {
                  reg.exact("011").or().exact("5").digits(2);
                });
              });
          })
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(4)
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(4)
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(4);
      })
      .or()
      // AMEX part:
      .nonCapturingGroup((reg) => {
        reg
          .nonCapturingGroup((reg) => {
            reg
              .exact("3")
              .charSet((reg) => {
                reg.exact("47");
              })
              .digits(2);
          })
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(6)
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(5);
      });

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Set options, including cardTypes which can be used for further validation or filtering
    this.setOptions({
      allowCardTypes: cardTypes,
    });

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
