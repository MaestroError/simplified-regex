import CountryCodeOption from "../../src/Options/CountryCodeOption";

describe("CountryCodeOption", () => {
  let countryCodeOption;

  beforeEach(() => {
    countryCodeOption = new CountryCodeOption();
  });

  test("allows any input if no country code is set", () => {
    expect(countryCodeOption.validate("+1234567890")).toBeTruthy();
    expect(countryCodeOption.validate("9876543210")).toBeTruthy();
  });

  test("validates input correctly with a set country code", () => {
    countryCodeOption.setCountryCode("1");
    expect(countryCodeOption.validate("+234567890")).toBeFalsy();
    expect(countryCodeOption.validate("+19876543210")).toBeTruthy();
    expect(countryCodeOption.validate("19876543210")).toBeTruthy();
  });

  test("fails validation if input does not start with the correct country code", () => {
    countryCodeOption.setCountryCode("44");
    expect(countryCodeOption.validate("+144123456789")).toBeFalsy();
    expect(countryCodeOption.validate("44123456789")).toBeTruthy();
    expect(countryCodeOption.validate("+123456789")).toBeFalsy();
  });
});
