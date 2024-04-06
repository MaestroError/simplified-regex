const CharacterClasses = {
  lowercaseText(length = null) {
    return this.handleTextLowercase(length);
  },

  textLowercase(length = null) {
    return this.handleTextLowercase(length);
  },

  textLowercaseRange(minLength = 0, maxLength = 0) {
    return this.handleTextLowercase(null, minLength, maxLength);
  },

  lowercaseTextRange(minLength = 0, maxLength = 0) {
    return this.handleTextLowercase(null, minLength, maxLength);
  },

  handleTextLowercase(length = null, minLength = 0, maxLength = 0) {
    this.pattern += this.inCharSet ? "a-z" : "[a-z]";
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  textUppercase(length = null) {
    return this.handleTextUppercase(length);
  },

  uppercaseText(length = null) {
    return this.handleTextUppercase(length);
  },

  textUppercaseRange(minLength = 0, maxLength = 0) {
    return this.handleTextUppercase(null, minLength, maxLength);
  },

  uppercaseTextRange(minLength = 0, maxLength = 0) {
    return this.handleTextUppercase(null, minLength, maxLength);
  },

  handleTextUppercase(length = null, minLength = 0, maxLength = 0) {
    this.pattern += this.inCharSet ? "A-Z" : "[A-Z]";
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  text(length = null) {
    return this.handleText(length);
  },

  textRange(minLength = 0, maxLength = 0) {
    return this.handleText(null, minLength, maxLength);
  },

  handleText(length = null, minLength = 0, maxLength = 0) {
    this.pattern += this.inCharSet ? "a-zA-Z" : "[a-zA-Z]"; // Matches both uppercase and lowercase letters
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  digits(length = null) {
    return this.handleDigits(length);
  },

  digitsRange(minLength = 0, maxLength = 0) {
    return this.handleDigits(null, minLength, maxLength);
  },

  numbers(length = null) {
    return this.handleDigits(length);
  },

  numbersRange(minLength = 0, maxLength = 0) {
    return this.handleDigits(null, minLength, maxLength);
  },

  anyNumbers() {
    return this.handleDigits();
  },

  digit() {
    return this.digits(1); // Reuse the existing digits method for single digit
  },

  number() {
    return this.digits(1); // Reuse the existing digits method for single number
  },

  handleDigits(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "\\d"; // Matches digits
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  nonDigits(length = null) {
    return this.handleNonDigits(length);
  },

  nonDigit() {
    return this.nonDigits(1); // Matches single non-digit
  },

  nonDigitsRange(minLength = 0, maxLength = 0) {
    return this.handleNonDigits(null, minLength, maxLength);
  },

  handleNonDigits(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "\\D"; // Matches non-digits
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  alphanumeric(length = null) {
    return this.handleAlphanumeric(length);
  },

  alphanumericRange(minLength = 0, maxLength = 0) {
    return this.handleAlphanumeric(null, minLength, maxLength);
  },

  textAndDigits(length = null) {
    return this.handleAlphanumeric(length);
  },

  textAndDigitsRange(minLength = 0, maxLength = 0) {
    return this.handleAlphanumeric(null, minLength, maxLength);
  },

  handleAlphanumeric(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "[a-zA-Z0-9]"; // Matches alphanumeric characters
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  whitespace(length = null) {
    return this.handleWhitespace(length);
  },

  whitespaceRange(minLength = 0, maxLength = 0) {
    return this.handleWhitespace(null, minLength, maxLength);
  },

  handleWhitespace(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "\\s"; // Matches whitespace characters
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  nonWhitespace(length = null) {
    return this.handleNonWhitespace(length);
  },

  nonWhitespaceRange(minLength = 0, maxLength = 0) {
    return this.handleNonWhitespace(null, minLength, maxLength);
  },

  handleNonWhitespace(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "\\S"; // Matches non-whitespace characters
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  wordChar() {
    return this.wordChars(1); // Simplified method for a single word character
  },

  wordChars(length = null) {
    return this.handleWordChar(length);
  },

  wordCharRange(minLength = 0, maxLength = 0) {
    return this.handleWordChar(null, minLength, maxLength);
  },

  wordCharsRange(minLength = 0, maxLength = 0) {
    return this.handleWordChar(null, minLength, maxLength);
  },

  handleWordChar(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "\\w"; // Matches word characters (alphanumeric + "_")
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  nonWordChar() {
    return this.nonWordChars(1); // Simplified method for a single non-word character
  },

  nonWordChars(length = null) {
    return this.handleNonWordChar(length);
  },

  nonWordCharRange(minLength = 0, maxLength = 0) {
    return this.handleNonWordChar(null, minLength, maxLength);
  },

  handleNonWordChar(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "\\W"; // Matches non-word characters (opposite of \w)
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  anyChar() {
    return this.anyChars(1);
  },

  anyChars(length = null) {
    return this.handleAnyChar(length);
  },

  anyCharRange(minLength = 0, maxLength = 0) {
    return this.handleAnyChar(null, minLength, maxLength);
  },

  anyCharsRange(minLength = 0, maxLength = 0) {
    return this.anyCharRange(minLength, maxLength);
  },

  handleAnyChar(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "."; // Matches any character (except newline)
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  visibleChars(length = null) {
    return this.handleVisibleChars(length);
  },

  visibleCharsRange(minLength = 0, maxLength = 0) {
    return this.handleVisibleChars(null, minLength, maxLength);
  },

  handleVisibleChars(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "\\S"; // Matches any non-whitespace character (visible characters)
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },

  invisibleChars(length = null) {
    return this.handleInvisibleChars(length);
  },

  invisibleCharsRange(minLength = 0, maxLength = 0) {
    return this.handleInvisibleChars(null, minLength, maxLength);
  },

  handleInvisibleChars(length = null, minLength = 0, maxLength = 0) {
    this.pattern += "\\s"; // Matches any whitespace character (invisible characters)
    this.pattern += this.getLengthOption(length, minLength, maxLength);
    return this;
  },
};

export default CharacterClasses;
