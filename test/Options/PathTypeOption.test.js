import PathTypeOption from "../../src/Options/PathTypeOption";

describe("PathTypeOption", () => {
  let pathTypeOption;

  beforeEach(() => {
    pathTypeOption = new PathTypeOption();
  });

  test("correctly validates absolute paths", () => {
    pathTypeOption.setPathType("absolute");
    expect(pathTypeOption.validate("/home/user")).toBeTruthy();
    expect(pathTypeOption.validate("C:\\Users")).toBeTruthy();
    expect(pathTypeOption.validate("relative\\path")).toBeFalsy();
  });

  test("correctly validates relative paths", () => {
    pathTypeOption.setPathType("relative");
    expect(pathTypeOption.validate("relative/path")).toBeTruthy();
    expect(pathTypeOption.validate("../parent")).toBeTruthy();
    expect(pathTypeOption.validate("/absolute/path")).toBeFalsy();
    expect(pathTypeOption.validate("C:\\Absolute\\Path")).toBeFalsy();
  });

  test("defaults to passing validation when no path type is set", () => {
    expect(pathTypeOption.validate("any/path")).toBeTruthy();
  });
});
