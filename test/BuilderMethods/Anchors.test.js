import { RegexBuilder } from "../../src";

describe("Anchors Methods with Pattern Checks", () => {
  let regexBuilder;

  beforeEach(() => {
    regexBuilder = new RegexBuilder();
  });

  test("wordBoundary adds word boundaries correctly", () => {
    const testString = "the quick brown fox";
    // Using wordBoundary to ensure 'fox' is matched as a whole word
    regexBuilder.wordBoundary().exact("fox").wordBoundary();
    expect(regexBuilder.source(testString).checkString()).toBeTruthy();
    expect(regexBuilder.source("fox").check()).toBeTruthy();
    expect(regexBuilder.source("foxes").check()).toBeFalsy(); // Should not match since 'foxes' is not a boundary match
  });

  test("wordBorder is consistent with wordBoundary functionality", () => {
    const testString = "the quick brown fox";
    // wordBorder is an alias to wordBoundary, so behavior should be identical
    regexBuilder.wordBorder().exact("quick").wordBorder();
    expect(regexBuilder.source(testString).checkString()).toBeTruthy();
    expect(regexBuilder.source("quickly").check()).toBeFalsy(); // Should not match 'quickly' as it's not a boundary match
  });

  test("asWord wraps the pattern within word boundaries to match a complete word", () => {
    const sentence = "The quick brown fox";
    const sentenceWrong = "The quickly brown fox";
    // asWord should ensure that the pattern only matches if it forms a complete word
    regexBuilder.exact("quick").asWord();
    expect(regexBuilder.source(sentence).checkString()).toBeTruthy();
    expect(regexBuilder.source(sentenceWrong).checkString()).toBeFalsy();
  });
});
