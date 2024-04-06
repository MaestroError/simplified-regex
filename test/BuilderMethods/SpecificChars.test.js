import { RegexBuilder } from "../../src";

describe("SpecificChars Methods with Pattern Checks", () => {
  let regexBuilder;

  beforeEach(() => {
    regexBuilder = new RegexBuilder();
  });

  test("tilde, hyphen, and minus methods append characters correctly and check patterns", () => {
    const testString = "~--";
    regexBuilder.tilde().hyphen(2);
    expect(regexBuilder.source(testString).check()).toBeTruthy();
    expect(regexBuilder.source(testString).checkString()).toBeTruthy();
    expect(regexBuilder.source(testString).get()).toEqual([testString]);
  });

  test("doubleQuote and singleQuote methods append quotes correctly", () => {
    const testString = `"'`;
    regexBuilder.doubleQuote().singleQuote();
    expect(regexBuilder.source(testString).check()).toBeTruthy();

    expect(
      regexBuilder.source(`Here are quotes: ${testString}`).checkString()
    ).toBeTruthy();

    const matches = regexBuilder.source(`Here is a quote: ${testString}`).get();
    expect(matches).toEqual([testString]);
  });

  test("percent, dollar, and hash methods handle special characters correctly", () => {
    const testString = "%$$$$#";
    regexBuilder.percent().dollar("1+").hash();
    expect(regexBuilder.source(testString).check()).toBeTruthy();
    expect(
      regexBuilder.source(`Special chars: ${testString}`).checkString()
    ).toBeTruthy();
  });

  test("unicode method handles Unicode characters correctly", () => {
    const testString = "𐍈"; // Example Unicode character
    const codePoint = testString.codePointAt(0).toString(16);
    regexBuilder.unicode(codePoint);
    expect(regexBuilder.source(testString).check()).toBeTruthy();
    expect(
      regexBuilder.source(`Unicode character: ${testString}`).checkString()
    ).toBeTruthy();
  });

  test("openSquareBracket and closeSquareBracket handle bracket characters", () => {
    const testString = "[]";
    regexBuilder.openSquareBracket().closeSquareBracket();
    expect(regexBuilder.source(testString).check()).toBeTruthy();
    expect(
      regexBuilder.source(`Brackets: ${testString}`).checkString()
    ).toBeTruthy();
    expect(
      regexBuilder.source(`Here are some brackets: ${testString}`).get()
    ).toEqual([testString]);
  });
});
