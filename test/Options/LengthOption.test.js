import LengthOption from "../../src/Options/LengthOption"; // Update the path to where your LengthOption class is located

describe("LengthOption", () => {
  let lengthOption;

  beforeEach(() => {
    lengthOption = new LengthOption();
  });

  test("validates input against exact length correctly", () => {
    lengthOption.setExactLength(5);
    expect(lengthOption.validate("12345")).toBeTruthy();
    expect(lengthOption.validate("1234")).toBeFalsy();
    expect(lengthOption.validate("123456")).toBeFalsy();
  });

  test("validates input against minimum length correctly", () => {
    lengthOption.setMinLength(3);
    expect(lengthOption.validate("12")).toBeFalsy();
    expect(lengthOption.validate("123")).toBeTruthy();
    expect(lengthOption.validate("1234")).toBeTruthy();
  });

  test("validates input against maximum length correctly", () => {
    lengthOption.setMaxLength(4);
    expect(lengthOption.validate("12345")).toBeFalsy();
    expect(lengthOption.validate("1234")).toBeTruthy();
    expect(lengthOption.validate("123")).toBeTruthy();
  });

  test("builds correct regex pattern for exact length", () => {
    lengthOption.setExactLength(5);
    expect(lengthOption.build()).toEqual("{5}");
  });

  test("builds correct regex pattern for minimum length only", () => {
    lengthOption.setMinLength(2);
    expect(lengthOption.build()).toEqual("{2,}");
  });

  test("builds correct regex pattern for maximum length only", () => {
    lengthOption.setMaxLength(4);
    expect(lengthOption.build()).toEqual("{0,4}");
  });

  test("builds correct regex pattern for minimum and maximum length", () => {
    lengthOption.setMinLength(2);
    lengthOption.setMaxLength(4);
    expect(lengthOption.build()).toEqual("{2,4}");
  });

  test("setting exact length resets min and max length", () => {
    lengthOption.setMinLength(2);
    lengthOption.setMaxLength(4);
    lengthOption.setExactLength(3);

    expect(lengthOption.validate("123")).toBeTruthy();
    expect(lengthOption.validate("12")).toBeFalsy();
    expect(lengthOption.validate("1234")).toBeFalsy();
  });
});
