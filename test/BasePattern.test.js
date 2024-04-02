// BasePattern.test.js
import BasePattern from "./../src/Builder/BasePattern"; // Update with the correct path to your BasePattern class

describe("BasePattern", () => {
  let basePattern;

  beforeEach(() => {
    basePattern = new BasePattern();
  });

  test("setOptions applies multiple options correctly", () => {
    // Mocking the optionsBuilder.setOptions method for simplicity
    basePattern.optionsBuilder.setOptions = jest.fn();

    const options = { minLength: 2, maxLength: 5 };
    basePattern.setOptions(options);

    expect(basePattern.optionsBuilder.setOptions).toHaveBeenCalledWith(options);
  });

  test("setOption applies a single option correctly", () => {
    // Mocking the optionsBuilder.setOption method
    basePattern.optionsBuilder.setOption = jest.fn();

    basePattern.setOption("minLength", 3);

    expect(basePattern.optionsBuilder.setOption).toHaveBeenCalledWith(
      "minLength",
      3
    );
  });

  test("validateInput returns true for valid input", () => {
    // Assuming the pattern is "[a-z]+" and the input is valid
    basePattern.pattern = "[a-z]+";
    basePattern.expressionFlags = "";

    const result = basePattern.validateInput("abc");
    expect(result).toBeTruthy();
  });

  test("validateInput returns false for invalid input", () => {
    // Assuming the pattern is "[a-z]+" and the input is invalid
    basePattern.pattern = "[a-z]+";
    basePattern.expressionFlags = "";

    const result = basePattern.validateInput("123");
    expect(result).toBeFalsy();
  });

  test("validateMatches checks matches correctly", () => {
    // Test to ensure validateMatches works as expected
    basePattern.pattern = "a";

    const result = basePattern.validateMatches("ababa");
    expect(result).toBeTruthy();
  });

  test("getMatches returns correct matches", () => {
    // Assuming we want all 'a's in the string
    basePattern.pattern = "a";

    const matches = basePattern.getMatches("abac", false);
    expect(matches).toEqual(["a", "a"]);
  });

  test("getMatches returns correct matches and groups when returnGroups is true", () => {
    // Setting a pattern with capture groups
    basePattern.pattern = "(\\d+)-(\\d+)-(\\d+)";

    const input = "My numbers are 123-45-6789 and 987-65-4321.";
    const expected = [
      { result: "123-45-6789", groups: ["123", "45", "6789"] },
      { result: "987-65-4321", groups: ["987", "65", "4321"] },
    ];

    const matches = basePattern.getMatches(input, true);
    expect(matches).toEqual(expected);
  });
});
