// tests/RegexBuilder.test.js
import { RegexBuilder } from "../src";

describe("RegexBuilder Main API Methods", () => {
  let regexBuilder;

  beforeEach(() => {
    regexBuilder = new RegexBuilder();
    // Example uses a simple pattern with groups for testing purposes
    regexBuilder.setPattern("(\\d{3})-(\\d{2})-(\\d{4})").setReturnGroups(true);
  });

  test("get returns all matches and groups when returnGroups is true", () => {
    const input = "My numbers are 123-45-6789 and 987-65-4321.";
    const matches = regexBuilder.source(input).get();
    expect(matches).toEqual([
      { result: "123-45-6789", groups: ["123", "45", "6789"] },
      { result: "987-65-4321", groups: ["987", "65", "4321"] },
    ]);
  });

  test("check returns true for an exact match", () => {
    const input = "123-45-6789";
    const isValid = regexBuilder.source(input).check();
    expect(isValid).toBeTruthy();
  });

  test("check returns false for a non-exact match", () => {
    const input = "My number is 123-45-6789.";
    const isValid = regexBuilder.source(input).check();
    expect(isValid).toBeFalsy();
  });

  test("checkString returns true if the pattern is found within the string", () => {
    const input = "My number is 123-45-6789.";
    const containsPattern = regexBuilder.source(input).checkString();
    expect(containsPattern).toBeTruthy();
  });

  test("checkString returns false if the pattern is not found within the string", () => {
    const input = "No numbers here!";
    const containsPattern = regexBuilder.source(input).checkString();
    expect(containsPattern).toBeFalsy();
  });

  test("count returns the correct number of matches", () => {
    const input = "My numbers are 123-45-6789 and 987-65-4321.";
    const count = regexBuilder.source(input).count();
    expect(count).toBe(2);
  });

  test("toRegex returns a RegExp object with the correct pattern and flags", () => {
    regexBuilder.addExpressionFlag("g"); // Global search
    const regex = regexBuilder.toRegex();
    expect(regex).toBe("(\\d{3})-(\\d{2})-(\\d{4})"); // Check the pattern
  });
});

describe("RegexBuilder Options", () => {
  let regexBuilder;

  beforeEach(() => {
    regexBuilder = new RegexBuilder();
  });

  test("options method applies options correctly using an object", () => {
    // Assuming setPattern sets a pattern that matches any string
    regexBuilder.setPattern(".+");
    // Applying minLength option using an object
    regexBuilder.options({ minLength: 5 });

    const inputShort = "1234"; // Shorter than minLength
    const inputValid = "12345"; // Exactly minLength

    expect(regexBuilder.source(inputShort).check()).toBeFalsy();
    expect(regexBuilder.source(inputValid).check()).toBeTruthy();
  });

  test("options method applies options correctly using a callback", () => {
    // Assuming setPattern sets a pattern that matches any string
    regexBuilder.setPattern(".+");
    // Applying minLength option using a callback
    regexBuilder.options((opts) => {
      opts.minLength(5);
    });

    const inputShort = "123"; // Shorter than minLength
    const inputValid = "123456"; // Longer than minLength, valid

    expect(regexBuilder.source(inputShort).check()).toBeFalsy();
    expect(regexBuilder.source(inputValid).check()).toBeTruthy();
  });

  // Add more tests as needed for other options or combinations of options
});
