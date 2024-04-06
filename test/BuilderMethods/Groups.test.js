import { RegexBuilder } from "../../src";

describe("Groups Methods with Pattern Checks", () => {
  let regexBuilder;

  beforeEach(() => {
    regexBuilder = new RegexBuilder();
  });

  test("charSet creates character set groups correctly", () => {
    const testString = "abc";
    const test = regexBuilder
      .source(testString)
      .charSet((rb) => rb.text())
      .check();
    expect(test).toBeFalsy();
  });

  test("negativeCharSet excludes specific characters correctly", () => {
    const testString = "1235";
    regexBuilder.negativeCharSet((rb) => rb.text());
    expect(regexBuilder.source(testString).checkString()).toBeTruthy();
    expect(regexBuilder.source("a").check()).toBeFalsy(); // 'a' is excluded by [^a-zA-Z]
  });

  test("group wraps pattern in capturing groups", () => {
    const testString = "123-456";
    regexBuilder.group((rb) => rb.digits(3));
    const matches = regexBuilder.source(testString).get();
    expect(matches).toEqual(["123", "456"]); // Expect capturing groups to match '123' and '456'
  });

  test("nonCapturingGroup wraps pattern in non-capturing groups", () => {
    const testString = "123-456";
    regexBuilder
      .nonCapturingGroup((rb) => rb.digits(3))
      .hyphen()
      .nonCapturingGroup((rb) => rb.digits(3));
    expect(regexBuilder.source(testString).check()).toBeTruthy();
    // Non-capturing groups do not capture content, so only the overall match is checked
  });

  test("orPattern allows alternation between patterns", () => {
    const testString = "cat";
    regexBuilder
      .orPattern((rb) => rb.exact("cat"))
      .orPattern((rb) => rb.exact("dog"));
    expect(regexBuilder.source(testString).check()).toBeTruthy();
    expect(regexBuilder.source("dog").check()).toBeTruthy();
    expect(regexBuilder.source("bird").check()).toBeFalsy(); // 'bird' is not part of the alternation
  });

  test("lookAhead checks for pattern ahead without including it in the match", () => {
    const testString = "windows10";
    regexBuilder.text().lookAhead((rb) => rb.digits());
    expect(regexBuilder.source(testString).checkString()).toBeTruthy();
    expect(regexBuilder.source("windows").checkString()).toBeFalsy(); // Fails because digits are expected ahead
  });

  test("lookBehind checks for pattern behind without including it in the match", () => {
    const testString = "10windows";
    regexBuilder.lookBehind((rb) => rb.digits()).text();
    expect(regexBuilder.source(testString).checkString()).toBeTruthy();
  });

  test("negativeLookAhead ensures specified pattern is not ahead", () => {
    const testString = "windowsXP";
    regexBuilder.text().negativeLookAhead((rb) => rb.exact("10"));
    expect(regexBuilder.source(testString).check()).toBeTruthy();
    expect(regexBuilder.source("windows10").check()).toBeFalsy(); // Fails because '10' is not allowed ahead
  });

  test("negativeLookBehind ensures specified pattern is not behind", () => {
    const testString = "XPwindows";
    regexBuilder.negativeLookBehind((rb) => rb.exact("10")).text();
    expect(regexBuilder.source(testString).check()).toBeTruthy();
  });
});
