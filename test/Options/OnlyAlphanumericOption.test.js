import OnlyAlphanumericOption from "../../src/Options/OnlyAlphanumericOption";

describe("OnlyAlphanumericOption", () => {
  let onlyAlphanumericOption;

  beforeEach(() => {
    onlyAlphanumericOption = new OnlyAlphanumericOption().onlyAlphanumeric(
      true
    );
  });

  test("validates alphanumeric input correctly", () => {
    expect(onlyAlphanumericOption.validate("abc123")).toBeTruthy();
    expect(onlyAlphanumericOption.validate("ABC123")).toBeTruthy();
  });

  test("rejects non-alphanumeric input when onlyAlphanumeric is true", () => {
    onlyAlphanumericOption.onlyAlphanumeric(true);
    expect(onlyAlphanumericOption.validate("abc123!@#")).toBeFalsy();
    expect(onlyAlphanumericOption.validate(" ")).toBeFalsy();
  });

  test("builds correct regex pattern for alphanumeric constraint", () => {
    onlyAlphanumericOption.onlyAlphanumeric(true);
    expect(onlyAlphanumericOption.build()).toEqual("[a-zA-Z0-9]+");
  });

  test("builds correct regex pattern without alphanumeric constraint", () => {
    onlyAlphanumericOption.onlyAlphanumeric(false);
    expect(onlyAlphanumericOption.build()).toEqual(".+");
  });
});
