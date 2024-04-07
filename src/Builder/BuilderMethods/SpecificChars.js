const SpecificChars = {
  tab(q = null) {
    return this.escapeAndAdd("t", q); // Matches a tab character
  },

  newLine(q = null) {
    return this.escapeAndAdd("n", q); // Matches a newline character
  },

  carriageReturn(q = null) {
    return this.escapeAndAdd("r", q); // Matches a carriage return character
  },

  verticalTab(q = null) {
    return this.escapeAndAdd("v", q); // Matches a vertical tab character
  },

  formFeed(q = null) {
    return this.escapeAndAdd("f", q); // Matches a form feed character
  },

  dash(q = null) {
    return this.escapeAndAdd("-", q);
  },

  dot(q = null) {
    return this.escapeAndAdd(".", q); // Escaped dot to match the dot character itself
  },

  space(q = null) {
    return this.escapeAndAdd(" ", q);
  },

  backslash(q = null) {
    return this.escapeAndAdd("\\", q); // Double escape for a single backslash
  },

  forwardSlash(q = null) {
    return this.escapeAndAdd("/", q);
  },

  slash(q = null) {
    return this.escapeAndAdd("/", q);
  },

  doubleSlash(q = null) {
    return this.escapeAndAdd("//", q);
  },

  underscore(q = null) {
    return this.escapeAndAdd("_", q);
  },

  pipe(q = null) {
    return this.escapeAndAdd("|", q);
  },

  ampersand(q = null) {
    return this.escapeAndAdd("&", q);
  },

  asterisk(q = null) {
    return this.escapeAndAdd("*", q); // Escaped asterisk to match the asterisk character itself
  },

  plus(q = null) {
    return this.escapeAndAdd("+", q); // Escaped plus to match the plus character itself
  },

  questionMark(q = null) {
    return this.escapeAndAdd("?", q); // Escaped question mark to match the question mark itself
  },

  atSign(q = null) {
    return this.escapeAndAdd("@", q);
  },

  atSymbol(q = null) {
    return this.escapeAndAdd("@", q);
  },

  exclamationMark(q = null) {
    return this.escapeAndAdd("!", q);
  },

  period(q = null) {
    return this.escapeAndAdd(".", q);
  },

  comma(q = null) {
    return this.escapeAndAdd(",", q);
  },

  semicolon(q = null) {
    return this.escapeAndAdd(";", q);
  },

  colon(q = null) {
    return this.escapeAndAdd(":", q);
  },

  equalSign(q = null) {
    return this.escapeAndAdd("=", q);
  },

  tilde(q = null) {
    return this.escapeAndAdd("~", q);
  },

  hyphen(q = null) {
    return this.escapeAndAdd("-", q);
  },

  minus(q = null) {
    return this.escapeAndAdd("-", q);
  },

  doubleQuote(q = null) {
    return this.escapeAndAdd('"', q);
  },

  singleQuote(q = null) {
    return this.escapeAndAdd("'", q);
  },

  percent(q = null) {
    return this.escapeAndAdd("%", q);
  },

  dollar(q = null) {
    return this.escapeAndAdd("$", q); // Dollar sign is a special character in regex
  },

  hash(q = null) {
    return this.escapeAndAdd("#", q);
  },

  hashtag(q = null) {
    return this.escapeAndAdd("#", q);
  },

  backtick(q = null) {
    return this.escapeAndAdd("`", q);
  },

  caret(q = null) {
    return this.escapeAndAdd("^", q); // Caret is a special character in regex
  },

  unicode(code) {
    // @todo why do we use "u" instead of "x"
    const hexCode = typeof code === "number" ? code.toString(16) : code;
    this.pattern += `\\u{${hexCode}}`;
    return this.addExpressionFlag("u"); // Assuming addExpressionFlag is a method to add flags to the regex pattern
  },

  // Methods for paired characters with separate open and close methods and an extra method with a boolean argument
  openSquareBracket(q = null) {
    return this.escapeAndAdd("[", q); // Escape square bracket
  },

  closeSquareBracket(q = null) {
    return this.escapeAndAdd("]", q); // Escape square bracket
  },

  squareBracket(isOpen = true, q = null) {
    return isOpen ? this.openSquareBracket(q) : this.closeSquareBracket(q);
  },

  openCurlyBrace(q = null) {
    return this.escapeAndAdd("{", q); // Escape curly brace
  },

  closeCurlyBrace(q = null) {
    return this.escapeAndAdd("}", q); // Escape curly brace
  },

  curlyBrace(isOpen = true, q = null) {
    return isOpen ? this.openCurlyBrace(q) : this.closeCurlyBrace(q);
  },

  openParenthesis(q = null) {
    return this.escapeAndAdd("(", q); // Escape parenthesis
  },

  closeParenthesis(q = null) {
    return this.escapeAndAdd(")", q); // Escape parenthesis
  },

  parenthesis(isOpen = true, q = null) {
    return isOpen ? this.openParenthesis(q) : this.closeParenthesis(q);
  },

  openAngleBracket(q = null) {
    return this.escapeAndAdd("<", q); // Escape angle bracket
  },

  closeAngleBracket(q = null) {
    return this.escapeAndAdd(">", q); // Escape angle bracket
  },

  angleBracket(isOpen = true, q = null) {
    return isOpen ? this.openAngleBracket(q) : this.closeAngleBracket(q);
  },

  or(q = null) {
    this.pattern += "|";
    return this;
  },

  // Handling for exact, exactly, literal, character, char
  exact(stringOrArray, caseSensitive = true, q = null) {
    return this.handleExact(stringOrArray, caseSensitive, q);
  },
  exactly(stringOrArray, caseSensitive = true, q = null) {
    return this.handleExact(stringOrArray, caseSensitive, q);
  },
  literal(stringOrArray, caseSensitive = true, q = null) {
    return this.handleExact(stringOrArray, caseSensitive, q);
  },
  character(char, caseSensitive = true, q = null) {
    return this.handleExact(char, caseSensitive, q);
  },
  char(char, caseSensitive = true, q = null) {
    return this.handleExact(char, caseSensitive, q);
  },

  // Method to handle the 'exact' functionality, similar to handleExact in PHP
  handleExact(stringOrArray, caseSensitive = true, q = null) {
    let pattern;
    if (Array.isArray(stringOrArray)) {
      const escapedArray = this.escapeArray(stringOrArray); // Assume escapeArray is defined elsewhere
      pattern = `(?:${escapedArray.join("|")})`;
    } else {
      pattern = this.escapeString(stringOrArray); // Assume escapeString is defined elsewhere
    }
    if (!caseSensitive) {
      pattern = `(?i:${pattern})`;
    }
    this.pattern += q ? this.applyQuantifier(pattern, q) : pattern;
    return this;
  },
};

export default SpecificChars;
