import ContainSpacesOption from "../../src/Options/ContainSpacesOption";

describe("ContainSpacesOption", () => {
  let option;

  beforeEach(() => {
    option = new ContainSpacesOption();
  });

  test("should validate input without spaces when noSpaces is set to true", () => {
    option.noSpaces(true);
    expect(option.validate("NoSpacesHere")).toBeTruthy();
    expect(option.validate("There are spaces")).toBeFalsy();
  });

  test("should validate input with no consecutive double spaces when noDoubleSpaces is set", () => {
    option.setNoDoubleSpaces(true);
    expect(option.validate("No double  spaces")).toBeFalsy();
    expect(option.validate("No double spaces")).toBeTruthy();
  });

  test("should validate input respecting the maximum number of spaces allowed", () => {
    option.setMaxSpaces(3);
    expect(option.validate("One  two")).toBeTruthy(); // 2 spaces
    expect(option.validate("One    three")).toBeFalsy(); // 4 spaces, exceeds limit
  });
});
