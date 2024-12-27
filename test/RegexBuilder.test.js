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

  test("replaces all texts using replace method", () => {
    const regexBuilder = new RegexBuilder();
    const input = "Send to example@email.com or reply to EXAMPLE2@Email.com";
    const replaced = regexBuilder
      .start(input)
      .email()
      .replace((foundString) => `Email: ${foundString}`);

    expect(replaced).toBe(
      "Send to Email: example@email.com or reply to Email: EXAMPLE2@Email.com"
    );
  });

  test("replaces the same texts using replace method", () => {
    const regexBuilder = new RegexBuilder();
    const input = "Send to example@email.com or reply to example@email.com";
    const replaced = regexBuilder
      .start(input)
      .email()
      .replace((foundString) => `Email: ${foundString}`);

    expect(replaced).toBe(
      "Send to Email: example@email.com or reply to Email: example@email.com"
    );
  });

  test("accepts JavaScript functions in replace method", () => {
    const regexBuilder = new RegexBuilder();
    const input = "Send to example-1@email.com or reply to example-2@email.com";
    const replaced = regexBuilder
      .start(input)
      .email()
      .replace((foundString) => foundString.toUpperCase());

    expect(replaced).toBe(
      "Send to EXAMPLE-1@EMAIL.COM or reply to EXAMPLE-2@EMAIL.COM"
    );
  });
});

// Search feature tests:

test("searches multiline string using keyword", () => {
  const regexBuilder = new RegexBuilder();
  const input = `
    Whose woods these are I think I know.
    His house is in the village though;
    He will not see me stopping here
    To watch his woods fill up with snow.

    The woods are lovely, dark and deep,
    But I have promises to keep,
    And miles to go before I sleep,
    And miles to go before I sleep.
  `;
  const found = regexBuilder.source(input).search("woods");

  expect(found).toEqual([
    "Whose woods these are I think I know.",
    "To watch his woods fill up with snow.",
    "The woods are lovely, dark and deep,",
  ]);
});

test("searches multiline string using subpattern with ready-to-use patterns", () => {
  const regexBuilder = new RegexBuilder();
  const input = `
    Please contact us via email at info@example.com for more details.
    For support inquiries, you can also email us at support@example.com.
    Our marketing team is reachable at marketing@example.com for collaborations.
    For urgent matters, you can reach out through the phone number provided.
    Subscribe to our newsletter to stay updated with the latest news.
    Feel free to send feedback directly to our office address.
    Any emails sent after 5 PM may be responded to the next business day.
    Check the FAQ section for answers to common questions.
    Social media channels are also available for quick updates.
    We value your input and encourage you to share your thoughts.
  `;
  const found = regexBuilder.source(input).search((pattern) => {
    pattern.email();
  });

  expect(found).toEqual([
    "Please contact us via email at info@example.com for more details.",
    "For support inquiries, you can also email us at support@example.com.",
    "Our marketing team is reachable at marketing@example.com for collaborations.",
  ]);
});

test("searches multiline string using subpattern with builder pattern methods", () => {
  const regexBuilder = new RegexBuilder();
  const input = `
    Discover the latest tips and tricks to boost your productivity.
    Join the conversation with #LaravelTips and #WebDevelopment.
    Stay updated with our blog for more insightful content.
    Follow us on social media and use #CodingMadeEasy to share your journey.
    Let’s build something amazing together!
  `;
  const found = regexBuilder.source(input).search((pattern) => {
    pattern.start().hashtag().alphanumeric();
  });

  expect(found).toEqual([
    "Join the conversation with #LaravelTips and #WebDevelopment.",
    "Follow us on social media and use #CodingMadeEasy to share your journey.",
  ]);
});

// SearchReverse feature tests:
test("excludes lines from multiline string using keyword", () => {
  const regexBuilder = new RegexBuilder();
  const input = `
    [2024-12-23 10:00:00] INFO: User logged in.
    [2024-12-25 10:05:00] ERROR: Unable to connect to database.
    [2024-12-25 10:10:00] INFO: User updated profile.
    [2024-12-15 10:15:00] WARNING: Disk space running low.
    [2024-12-34 10:20:00] ERROR: Timeout while fetching data.
  `;
  const found = regexBuilder.source(input).searchReverse("INFO");

  expect(found).toEqual([
    "[2024-12-25 10:05:00] ERROR: Unable to connect to database.",
    "[2024-12-15 10:15:00] WARNING: Disk space running low.",
    "[2024-12-34 10:20:00] ERROR: Timeout while fetching data.",
  ]);
});

test("excludes lines from multiline string using subpattern", () => {
  const regexBuilder = new RegexBuilder();
  const input = `
    [2024-12-23 10:00:00] INFO: User logged in.
    [2024-12-25 10:05:00] ERROR: Unable to connect to database.
    [2024-12-25 10:10:00] INFO: User updated profile.
    [2024-12-15 10:15:00] WARNING: Disk space running low.
    [2024-12-34 10:20:00] ERROR: Timeout while fetching data.
  `;
  const found = regexBuilder.source(input).searchReverse((pattern) => {
    pattern.start().digits(4).dash().digits(2).dash().exact("25");
  });

  expect(found).toEqual([
    "[2024-12-23 10:00:00] INFO: User logged in.",
    "[2024-12-15 10:15:00] WARNING: Disk space running low.",
    "[2024-12-34 10:20:00] ERROR: Timeout while fetching data.",
  ]);
});

// Groups tests:
test("returns group data correctly (JIRA issue IDs)", () => {
  const regexBuilder = new RegexBuilder();
  const found = regexBuilder
    .start("RI-2142, PO-2555")
    .group((pattern) => pattern.textUppercase(2), 1)
    .dash()
    .group((pattern) => pattern.digitsRange(2, 4), 1)
    .get();

  expect(found).toEqual([
    {
      result: "RI-2142",
      groups: ["RI", "2142"],
    },
    {
      result: "PO-2555",
      groups: ["PO", "2555"],
    },
  ]);
});

// Named groups tests:
test("returns named groups data correctly (JIRA issue IDs)", () => {
  const regexBuilder = new RegexBuilder();
  const found = regexBuilder
    .start("RI-2142, PO-2555")
    .namedGroup((pattern) => pattern.textUppercase(2), "project", 1)
    .dash()
    .namedGroup((pattern) => pattern.digitsRange(2, 4), "issue", 1)
    .get();

  expect(found).toEqual([
    {
      result: "RI-2142",
      groups: {
        project: "RI",
        issue: "2142",
      },
    },
    {
      result: "PO-2555",
      groups: {
        project: "PO",
        issue: "2555",
      },
    },
  ]);
});

// Swap tests:
test("can swap text using callback", () => {
  const regexBuilder = new RegexBuilder();
  const result = regexBuilder
    .start("RI-2142, RI-1234, PO-2555")
    .namedGroup((pattern) => pattern.textUppercase(2), "project", 1)
    .dash()
    .namedGroup((pattern) => pattern.digitsRange(2, 4), "issue", 1);

  const results = result.swap((data) => {
    return `The issue #${data.issue} of project ${data.project} is in progress`;
  });

  expect(results).toEqual([
    "The issue #2142 of project RI is in progress",
    "The issue #1234 of project RI is in progress",
    "The issue #2555 of project PO is in progress",
  ]);
});

test("can swap text using pattern string", () => {
  const regexBuilder = new RegexBuilder();
  const result = regexBuilder
    .start(
      "/container-tbilisi-1585, /container-berlin-1234, /container-tbilisi-2555"
    )
    .slash()
    .exact("container")
    .dash()
    .namedGroup((pattern) => pattern.text(), "City")
    .dash()
    .namedGroup((pattern) => pattern.digitsRange(2, 5), "id");

  const results = result.swap("/container/[ID]?city=[CITY]");

  expect(results).toEqual([
    "/container/1585?city=tbilisi",
    "/container/1234?city=berlin",
    "/container/2555?city=tbilisi",
  ]);
});
