import CharacterOption from "../../src/Options/CharacterOption";

describe("CharacterOption", () => {
  let characterOption;

  beforeEach(() => {
    characterOption = new CharacterOption();
  });

  test("allows specific characters", () => {
    characterOption.allow(["a", "b", "c"]);
    expect(characterOption.validate("abc")).toBeTruthy();
    expect(characterOption.validate("def")).toBeFalsy();
  });

  test("excludes specific characters", () => {
    characterOption.exclude(["x", "y", "z"]);
    expect(characterOption.validate("abc")).toBeTruthy();
    expect(characterOption.validate("xyz")).toBeFalsy();
  });

  test("validates minimum number of uppercase characters", () => {
    characterOption.setMinUppercase(2);
    expect(characterOption.validate("abC")).toBeFalsy();
    expect(characterOption.validate("AbC")).toBeTruthy();
  });

  test("validates minimum number of lowercase characters", () => {
    characterOption.setMinLowercase(2);
    expect(characterOption.validate("abC")).toBeTruthy();
    expect(characterOption.validate("AbC")).toBeFalsy();
  });

  test("combines allowed and excluded character validations", () => {
    characterOption.allow(["a", "b", "c"]).exclude(["x", "y", "z"]);
    expect(characterOption.validate("abc")).toBeTruthy();
    expect(characterOption.validate("axy")).toBeFalsy();
  });

  test("handles combined minimum uppercase and lowercase validations", () => {
    characterOption.setMinUppercase(1).setMinLowercase(2);
    expect(characterOption.validate("aBc")).toBeTruthy();
    expect(characterOption.validate("ABC")).toBeFalsy();
    expect(characterOption.validate("abc")).toBeFalsy();
  });

  test("builds correct regex pattern with allowed and excluded characters", () => {
    characterOption.allow(["a", "b"]).exclude(["x", "y"]);
    const pattern = characterOption.build();
    expect(pattern).toBeInstanceOf(RegExp);
    expect("a").toMatch(pattern);
    expect("x").not.toMatch(pattern);
  });

  test("builds regex pattern for minimum uppercase and lowercase characters", () => {
    characterOption.setMinUppercase(1).setMinLowercase(2);
    const pattern = characterOption.build();
    expect("aBc").toMatch(pattern);
    expect("Abc").toMatch(pattern);
    expect("ABC").not.toMatch(pattern);
    expect("abc").not.toMatch(pattern);
  });
});
