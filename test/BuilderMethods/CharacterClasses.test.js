// CharacterClasses.test.js
import { RegexBuilder } from "../../src";

describe("CharacterClasses", () => {
  let regexBuilder;

  beforeEach(() => {
    regexBuilder = new RegexBuilder();
  });

  // Test method for adding lowercase text pattern
  test("lowercaseText adds [a-z] with correct quantifier", () => {
    regexBuilder.lowercaseText(5);
    expect(regexBuilder.pattern).toBe("[a-z]{5}");
  });

  // Test method for adding uppercase text pattern
  test("textUppercase adds [A-Z] with correct quantifier", () => {
    regexBuilder.textUppercaseRange(2, 4);
    expect(regexBuilder.pattern).toBe("[A-Z]{2,4}");
  });

  // Test method for adding digits pattern
  test("digits adds \\d with correct quantifier", () => {
    regexBuilder.digits();
    expect(regexBuilder.pattern).toBe("\\d+");
  });

  // Test method for non-digits
  test("nonDigits adds \\D with correct quantifier", () => {
    regexBuilder.nonDigits(1);
    expect(regexBuilder.pattern).toBe("\\D{1}");
  });

  // Test method for alphanumeric characters
  test("alphanumeric adds [a-zA-Z0-9] with correct quantifier", () => {
    regexBuilder.alphanumericRange(1, 10);
    expect(regexBuilder.pattern).toBe("[a-zA-Z0-9]{1,10}");
  });

  // Test method for whitespace characters
  test("whitespace adds \\s with correct quantifier", () => {
    regexBuilder.whitespace();
    expect(regexBuilder.pattern).toBe("\\s+");
  });

  // Test method for non-whitespace characters
  test("nonWhitespace adds \\S with correct quantifier", () => {
    regexBuilder.nonWhitespaceRange(3, 6);
    expect(regexBuilder.pattern).toBe("\\S{3,6}");
  });

  // Test method for any character
  test("anyChar adds . with correct quantifier", () => {
    regexBuilder.anyChars();
    expect(regexBuilder.pattern).toBe(".+");
  });
});
