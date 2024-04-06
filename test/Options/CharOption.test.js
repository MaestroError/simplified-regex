import CharOption from "../../src/Options/CharOption";

describe("CharOption", () => {
  let charOption;

  beforeEach(() => {
    charOption = new CharOption();
  });

  test("validates with no special characters correctly", () => {
    charOption.noSpecialCharacters();
    expect(charOption.validate("ABCdef")).toBeTruthy();
    expect(charOption.validate("ABC#def")).toBeFalsy();
  });

  test("validates minimum and maximum special characters correctly", () => {
    charOption.minSpecialCharacters(1).maxSpecialCharacters(2);
    expect(charOption.validate("A@B")).toBeTruthy();
    expect(charOption.validate("A!@B#")).toBeFalsy();
    expect(charOption.validate("AB")).toBeFalsy();
  });

  test("validates only lowercase and uppercase correctly", () => {
    charOption.onlyLowercase();
    expect(charOption.validate("abcdef")).toBeTruthy();
    expect(charOption.validate("Abcdef")).toBeFalsy();
    charOption.onlyLowercase(false).onlyUppercase();
    expect(charOption.validate("ABCDEF")).toBeTruthy();
    expect(charOption.validate("ABCDEf")).toBeFalsy();
  });
});
