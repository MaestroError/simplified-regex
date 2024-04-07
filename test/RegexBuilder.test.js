// tests/RegexBuilder.test.js
import { RegexBuilder } from "../src";

describe("RegexBuilder Main API Methods", () => {
  let regexBuilder;

  beforeEach(() => {
    regexBuilder = new RegexBuilder();
    // Example uses a simple pattern with groups for testing purposes
    regexBuilder.setPattern("(\\d{3})-(\\d{2})-(\\d{4})").setReturnGroups(true);
  });

  test("get returns all matches and groups when returnGroups is true", () => {
    const input = "My numbers are 123-45-6789 and 987-65-4321.";
    const matches = regexBuilder.source(input).get();
    expect(matches).toEqual([
      { result: "123-45-6789", groups: ["123", "45", "6789"] },
      { result: "987-65-4321", groups: ["987", "65", "4321"] },
    ]);
  });

  test("check returns true for an exact match", () => {
    const input = "123-45-6789";
    const isValid = regexBuilder.source(input).check();
    expect(isValid).toBeTruthy();
  });

  test("check returns false for a non-exact match", () => {
    const input = "My number is 123-45-6789.";
    const isValid = regexBuilder.source(input).check();
    expect(isValid).toBeFalsy();
  });

  test("checkString returns true if the pattern is found within the string", () => {
    const input = "My number is 123-45-6789.";
    const containsPattern = regexBuilder.source(input).checkString();
    expect(containsPattern).toBeTruthy();
  });

  test("checkString returns false if the pattern is not found within the string", () => {
    const input = "No numbers here!";
    const containsPattern = regexBuilder.source(input).checkString();
    expect(containsPattern).toBeFalsy();
  });

  test("count returns the correct number of matches", () => {
    const input = "My numbers are 123-45-6789 and 987-65-4321.";
    const count = regexBuilder.source(input).count();
    expect(count).toBe(2);
  });

  test("toRegex returns a RegExp object with the correct pattern and flags", () => {
    regexBuilder.addExpressionFlag("g"); // Global search
    const regex = regexBuilder.toRegex();
    expect(regex).toBe("(\\d{3})-(\\d{2})-(\\d{4})"); // Check the pattern
  });
});

describe("RegexBuilder Options", () => {
  let regexBuilder;

  beforeEach(() => {
    regexBuilder = new RegexBuilder();
  });

  test("options method applies options correctly using an object", () => {
    // Assuming setPattern sets a pattern that matches any string
    regexBuilder.setPattern(".+");
    // Applying minLength option using an object
    regexBuilder.options({ minLength: 5 });

    const inputShort = "1234"; // Shorter than minLength
    const inputValid = "12345"; // Exactly minLength

    expect(regexBuilder.source(inputShort).check()).toBeFalsy();
    expect(regexBuilder.source(inputValid).check()).toBeTruthy();
  });

  test("options method applies options correctly using a callback", () => {
    // Assuming setPattern sets a pattern that matches any string
    regexBuilder.setPattern(".+");
    // Applying minLength option using a callback
    regexBuilder.options((opts) => {
      opts.minLength(5);
    });

    const inputShort = "123"; // Shorter than minLength
    const inputValid = "123456"; // Longer than minLength, valid

    expect(regexBuilder.source(inputShort).check()).toBeFalsy();
    expect(regexBuilder.source(inputValid).check()).toBeTruthy();
  });

  test("options method applies options correctly using a callback and returns filltered values", () => {
    // Assuming setPattern sets a pattern that matches any string
    regexBuilder.setPattern("\\d+\\b");
    // Applying minLength option using a callback
    regexBuilder.options((opts) => {
      opts.minLength(5);
    });

    const input = "123 12345 15 3687 654123"; // Shorter than minLength

    expect(regexBuilder.source(input).get()).toEqual(["12345", "654123"]);
  });
});

describe("Custom Pattern Tests", () => {
  test("extracts dates in specific format from text", () => {
    const regexBuilder = new RegexBuilder();
    const matches = regexBuilder
      .start("Meeting on 2021-09-15 and 2021-10-20")
      .digits(4)
      .dash()
      .digits(2)
      .dash()
      .digits(2)
      .get();

    expect(matches).toEqual(["2021-09-15", "2021-10-20"]);
  });

  test("validates usernames in a string", () => {
    const regexBuilder = new RegexBuilder();
    const matches = regexBuilder
      .start("Users: user_123, JohnDoe_99")
      .alphanumeric()
      .underscore()
      .digitsRange(0, 2)
      .wordBoundary()
      .get();

    expect(matches).toEqual(["JohnDoe_99"]);
  });
});

describe("Predefined Pattern Tests", () => {
  test("validates email addresses correctly", () => {
    const email = "test@example.com";
    const regexBuilder = new RegexBuilder();
    const isValid = regexBuilder.start(email).email().check();

    expect(isValid).toBeTruthy();
  });

  test("validates domain names correctly", () => {
    const domain = "example.com";
    const regexBuilder = new RegexBuilder();
    const isValid = regexBuilder.start(domain).domainName().check();

    expect(isValid).toBeTruthy();
  });

  test("validates credit card numbers correctly", () => {
    const regexBuilder = new RegexBuilder();
    const creditCardNumber = "4111111111111111"; // Visa test number
    regexBuilder.creditCardNumber();
    const isValid = regexBuilder.check(creditCardNumber);

    expect(isValid).toBeTruthy();
  });

  test("validates currency formats correctly", () => {
    const regexBuilder = new RegexBuilder();
    const currency = "$100.00";
    regexBuilder.currency();
    const isValid = regexBuilder.check(currency);

    expect(isValid).toBeTruthy();
  });

  test("validates dates correctly", () => {
    const regexBuilder = new RegexBuilder();
    const date = "2023-01-01";
    regexBuilder.date();
    const isValid = regexBuilder.check(date);

    expect(isValid).toBeTruthy();
  });

  test("validates IPv4 addresses correctly", () => {
    const regexBuilder = new RegexBuilder();
    const ipAddress = "192.168.1.1";
    regexBuilder.ipAddress();
    const isValid = regexBuilder.check(ipAddress);

    expect(isValid).toBeTruthy();
  });

  test("validates IPv6 addresses correctly", () => {
    const regexBuilder = new RegexBuilder();
    const ipv6Address = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
    regexBuilder.ipv6Address();
    const isValid = regexBuilder.check(ipv6Address);

    expect(isValid).toBeTruthy();
  });

  test("validates phone numbers correctly", () => {
    const regexBuilder = new RegexBuilder();
    const phoneNumber = "+1 (123) 456-7890";
    regexBuilder.phone();
    const isValid = regexBuilder.check(phoneNumber);

    expect(isValid).toBeTruthy();
  });

  test("validates usernames correctly", () => {
    const regexBuilder = new RegexBuilder();
    const username = "user_123";
    regexBuilder.username();
    const isValid = regexBuilder.check(username);

    expect(isValid).toBeTruthy();
  });
});
