import DomainSpecificOption from "../../src/Options/DomainSpecificOption";

describe("DomainSpecificOption", () => {
  let domainSpecificOption;

  beforeEach(() => {
    domainSpecificOption = new DomainSpecificOption();
  });

  test("validates allowed domain correctly", () => {
    domainSpecificOption.setAllowedDomains(["example.com"]);
    expect(domainSpecificOption.validate("user@example.com")).toBeTruthy();
    expect(domainSpecificOption.validate("user@notallowed.com")).toBeFalsy();
  });

  test("validates allowed extensions correctly", () => {
    domainSpecificOption.setAllowedExtensions(["com", "net"]);
    expect(domainSpecificOption.validate("example.com")).toBeTruthy();
    expect(domainSpecificOption.validate("example.net")).toBeTruthy();
    expect(domainSpecificOption.validate("example.org")).toBeFalsy();
  });

  test("passes validation with no domains or extensions set", () => {
    expect(domainSpecificOption.validate("anything.goes")).toBeTruthy();
  });

  test("handles multiple domains", () => {
    domainSpecificOption.setAllowedDomains("example.com,allowed.com");
    expect(domainSpecificOption.validate("user@example.com")).toBeTruthy();
    expect(domainSpecificOption.validate("user@allowed.com")).toBeTruthy();
    expect(domainSpecificOption.validate("blocked.org")).toBeFalsy();
    expect(domainSpecificOption.validate("user@blocked.com")).toBeFalsy();
  });

  test("handles multiple extensions", () => {
    domainSpecificOption.setAllowedExtensions(["com", "net"]);
    expect(domainSpecificOption.validate("user@example.com")).toBeTruthy();
    expect(domainSpecificOption.validate("user@allowed.com")).toBeTruthy();
    expect(domainSpecificOption.validate("website.net")).toBeTruthy();
    expect(domainSpecificOption.validate("website.org")).toBeFalsy();
  });
});
