import NumberOption from "../../src/Options/NumberOption";

describe("NumberOption", () => {
  let numberOption;

  beforeEach(() => {
    numberOption = new NumberOption();
  });

  test("validates exact numeric count correctly", () => {
    numberOption.setExactValue(3);
    expect(numberOption.validate("123")).toBeTruthy();
    expect(numberOption.validate("12")).toBeFalsy();
    expect(numberOption.validate("1234")).toBeFalsy();
  });

  test("validates minimum numeric count correctly", () => {
    numberOption.setMinValue(2);
    expect(numberOption.validate("1")).toBeFalsy();
    expect(numberOption.validate("12")).toBeTruthy();
    expect(numberOption.validate("123")).toBeTruthy();
  });

  test("validates maximum numeric count correctly", () => {
    numberOption.setMaxValue(3);
    expect(numberOption.validate("1234")).toBeFalsy();
    expect(numberOption.validate("123")).toBeTruthy();
    expect(numberOption.validate("12")).toBeTruthy();
  });

  // Add more tests as necessary...
});
