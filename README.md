# SimplifiedRegex

### simplified-regex

SimplifiedRegex is a JavaScript package designed to facilitate the construction and manipulation of regular expressions in a fluent and intuitive manner. Drawing inspiration from the [EloquentRegex](https://github.com/MaestroError/eloquent-regex) PHP package, SimplifiedRegex adapts its principles to the JavaScript ecosystem, offering a similar builder pattern and feature set optimized for both Node.js and browser environments.

#### What it does?

You can use all regex features without writing actual regex pattern. Let me show you how:

```javascript
const regex = new RegexBuilder();

// Check 2 passwords:
const strongPassword = "StrongP@ssw0rd";
const weakPassword = "password123";
// 8 (minLength), 1 (minUppercase), 1 (minDigits), 1 (minSpecialChars)
const checkStrong = regex.start(strongPassword).password(8, 1, 1, 1).check();
const checkWeak = regex.start(weakPassword).password(8, 1, 1, 1).check();

console.log(checkStrong); // True
console.log(checkWeak); // False
```

### Table of Contents

- **[Features](#features)**
- **[Installation](#installation)**
- **[Usage](#usage)**
  - [Importing](#importing)
  - [Actions](#actions)
    - [Get](#get)
    - [Check](#check)
    - [CheckString](#checkstring)
    - [Count](#count)
    - [Replace](#replace)
    - [ToRegex](#toregex)
    - [Search](#search)
    - [SearchReverse](#searchreverse)
    - [Swap](#swap)
  - [Building a Regex](#building-a-regex)
  - [Using Predefined Patterns](#using-predefined-patterns)
  - [Options](#options)
  - [Options List](#options-list)
  - [Applying Quantifiers](#applying-quantifiers)
- **[Advanced topics](#advanced-topics)**
  - [Regex Flags](#regex-flags)
  - [Character Sets](#character-sets)
  - [Groups](#groups)
  - [Conditional matching](#conditional-matching)
  - [Pattern alternation (orPattern)](#pattern-alternation-orpattern)
  - [Raw Methods](#raw-methods)
  - [The Lazy Quantifier Method](#the-lazy-quantifier-method)
- **[Contributing](#contributing)**
- **[Support](#support)**
- **[Credits](#credits)**
- **[Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)**
- **[License](#license)**

## Features

- **Fluent Interface**: Build complex regular expressions using a readable and intuitive syntax.
- **Builder Pattern**: Easily define and concatenate patterns with automatic escaping where necessary.
- **Predefined Patterns**: Utilize a collection of commonly used patterns, enhancing development efficiency.
- **Compatible**: Works seamlessly across major JavaScript environments, including browsers and Node.js.

## Installation

You can install the SimplifiedRegex package via npm or include it directly in your browser through a CDN.

### NPM

```bash
npm install simplified-regex
```

### CDN

For browser usage, you can include SimplifiedRegex directly from a CDN.  
unpkg:

```html
<script src="https://unpkg.com/simplified-regex/dist/simplified-regex.js"></script>
```

jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/simplified-regex@latest/dist/simplified-regex.js"></script>
```

## Usage

### Importing

In a Node.js environment, import SimplifiedRegex as follows:

```javascript
const { RegexBuilder } = require("simplified-regex");
```

For ES modules or TypeScript, use:

```javascript
import { RegexBuilder } from "simplified-regex";
```

### Actions

Actions are end methods created to finalize your pattern and take some action with it. They are the main features of the package as well. Let's discuss them one by one and check the examples.

#### Get

Returns all matches as an array/collection. Returns `null` if no matches are found.

_Example with ready-to-use pattern_

```javascript
const result = new RegexBuilder()
  .source("Support: support@example.com; Info: info@example.com")
  .email()
  .get();
// Returns: ["support@example.com", "info@example.com"]
```

_Example with custom pattern_

```javascript
const result = new RegexBuilder()
  .start("#hello #world This is a #test")
  .hash()
  .text()
  .get();
// Returns: ['#hello', '#world', '#test']
```

#### Check

Checks if the string exactly matches the pattern from start to end (strict match).

_Example with ready-to-use pattern_

```javascript
const result = new RegexBuilder().source("support@example.com").email().check();
// Returns: true
```

_Example with custom pattern_

```javascript
const result = new RegexBuilder().start("#test").hash().text().check();
// Returns: true
```

#### CheckString

Checks if the string contains any matches of the pattern. In the case of the email pattern, it will return `true` if one or more emails are present in the given source string.

_Example with ready-to-use pattern_

```javascript
const result = new RegexBuilder()
  .source("Support: support@example.com; Info: info@example.com")
  .email()
  .checkString();
// Returns: true
```

_Example with custom pattern_

```javascript
const result = new RegexBuilder()
  .start("#hello #world This is a #test")
  .hash()
  .text()
  .checkString();
// Returns: true
```

#### Count

Counts the number of matches and returns it as an integer. Returns `0` if no matches are found.

_Example with ready-to-use pattern_

```javascript
const result = new RegexBuilder()
  .source("Support: support@example.com; Info: info@example.com")
  .email()
  .count();
// Returns: 2
```

_Example with custom pattern_

```javascript
const result = new RegexBuilder()
  .start("#hello #world This is a #test")
  .hash()
  .text()
  .count();
// Returns: 3
```

#### Replace

Replaces found matches in the given source string using the provided **callback**.

_Example with ready-to-use pattern_

```javascript
const result = new RegexBuilder()
  .source("Support: support@example.com; Info: info@example.com")
  .email()
  .replace((foundItem) => {
    return `<span>${foundItem}</span>`;
  });
// Returns: "Support: <span>support@example.com</span>; Info: <span>info@example.com</span>"
```

_Example with custom pattern_

```javascript
const result = new RegexBuilder()
  .start("This is a #test")
  .hash()
  .text()
  .replace((foundItem) => {
    return `<a href='${foundItem}'>${foundItem}</a>`;
  });
// Returns: "This is a <a href='#test'>#test</a>"
```

#### ToRegex

Returns the built raw regex as a string. If any [options](#options) are applied, they will **not be included** in the `toRegex` method.

_Example with custom pattern_

```javascript
const regex = new RegexBuilder()
  .start()
  .textLowercase()
  .atSign()
  .textLowercase()
  .dot()
  .textLowercaseRange(2, 4)
  .toRegex();
// Returns: "[a-z]+@[a-z]+\.[a-z]{2,4}"
```

#### Search

The `search` method searches for a **keyword** or **pattern** (including ready-to-use patterns) in multiline text and returns lines where the subject is found. It is especially useful for processing large files like logs or JSON.

_Example with keyword search_

```javascript
const result = new RegexBuilder()
  .source(
    `
    Whose woods these are I think I know.
    His house is in the village though;
    He will not see me stopping here
    To watch his woods fill up with snow.

    The woods are lovely, dark and deep,
    But I have promises to keep,
    And miles to go before I sleep,
    And miles to go before I sleep.
  `
  )
  .search("woods");
/* Returns: [
    "Whose woods these are I think I know.",
    "To watch his woods fill up with snow.",
    "The woods are lovely, dark and deep,"
] */
```

_Example with pattern_

```javascript
const result = new RegexBuilder()
  .source(
    `
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
  `
  )
  .search((pattern) => {
    pattern.email();
  });
/* Returns: [
    'Please contact us via email at info@example.com for more details.',
    'For support inquiries, you can also email us at support@example.com.',
    'Our marketing team is reachable at marketing@example.com for collaborations.'
] */
```

#### SearchReverse

The `searchReverse` method searches for a **keyword** or **pattern** in multiline text and returns every line which **doesn't contain** the subject. It is especially useful for processing large text files like logs or JSON.

_Example with keyword search_

```javascript
// Find all log types except INFO
const result = new RegexBuilder()
  .source(
    `
    [2024-12-23 10:00:00] INFO: User logged in.
    [2024-12-25 10:05:00] ERROR: Unable to connect to database.
    [2024-12-25 10:10:00] INFO: User updated profile.
    [2024-12-15 10:15:00] WARNING: Disk space running low.
    [2024-12-34 10:20:00] ERROR: Timeout while fetching data.
  `
  )
  .searchReverse("INFO");
/* Returns: [
    '[2024-12-25 10:05:00] ERROR: Unable to connect to database.',
    '[2024-12-15 10:15:00] WARNING: Disk space running low.',
    '[2024-12-34 10:20:00] ERROR: Timeout while fetching data.'
] */
```

#### Swap

The `swap` method allows you to swap any kind of data logically, for example, build new URLs from old ones. It utilizes the "named groups" regex feature and can be used with a **callback** or **pattern string**.

_Example with pattern string_

```javascript
const builder = new RegexBuilder()
  .start(
    "URIs: /container-tbilisi-1585, /container-berlin-1234, /container-tbilisi-2555"
  )
  .slash() // "/"
  .exact("container") // "container" (static part of URI)
  .dash() // "-"
  .namedGroup((pattern) => pattern.text(), "City") // Text between dashes, Grouped & named as "City"
  .dash() // "-"
  .namedGroup((pattern) => pattern.digitsRange(2, 5), "id") // Numbers at end, Grouped & named as "id"
  .end(); // Ends custom pattern to make "swap" method available

// Using swap with pattern string
// which will swap placeholders like "[ID]" with
// Extracted data for each found match
const result = builder.swap("/container/[ID]?city=[CITY]");

/* Returns:
[
    '/container/1585?city=tbilisi',
    '/container/1234?city=berlin',
    '/container/2555?city=tbilisi'
]
*/
```

_Example with callback_

```javascript
const builder = new RegexBuilder().start(
  "Issues in progress: RI-2142, RI-1234, PO-2555"
);
builder
  .namedGroup((pattern) => pattern.textUppercase(2), "project", 1) // 2 uppercase char named as "project"
  .dash() // "-"
  .namedGroup((pattern) => pattern.digitsRange(2, 4), "issue", 1) // from 2 to 4 digits named as "issue"
  .end();

const results = builder.swap((data) => {
  return `The issue #${data.issue} of project ${data.project} is in progress`;
});

/* Returns:
[
    'The issue #2142 of project RI is in progress',
    'The issue #1234 of project RI is in progress',
    'The issue #2555 of project PO is in progress'
]
*/
```

### Building a Regex

The core of SimplifiedRegex is the `RegexBuilder` class, which you use to construct your regular expressions.

Example - Matching an email address:

```javascript
const builder = new RegexBuilder();
const regex = builder
  .start("example@email.com") // Indicates the start of the expression and adds target string
  .alphanumeric()
  .atSign() // Explicitly adds the "@" character
  .alphanumeric()
  .dot() // Adds a dot
  .textRange(2, 6); // Adds a word character pattern with a length range

console.log(regex.check()); // Outputs: true
```

But in case of an email address, you can easily use predefined pattern "email":

```javascript
const email = "test@example.com";
const regexBuilder = new RegexBuilder();
const isValid = regexBuilder.start(email).email().check(); // True
```

### Using Predefined Patterns

SimplifiedRegex comes with a set of commonly used predefined patterns, such as `email`, `url`, `ipAddress`, and more. Here is a list of all ready-to-use patterns and their arguments:

#### Email

Matches email addresses, allowing optional limitations on maximum length, specific domains, and extensions.

```javascript
email(maxLength = null, onlyDomains = [], onlyExtensions = []) {}
```

#### URL

Matches URLs, with an option to limit to specific protocols (e.g., HTTP, HTTPS).

```javascript
url(onlyProtocol = []) {}
```

#### Credit Card Number

Matches credit card numbers with an option to specify allowed card types (e.g., Visa, MasterCard, Amex).

```javascript
creditCardNumber(cardTypes = "") {} // example: cardTypes = 'visa,amex'
```

#### Currency

Matches currency amounts, with options for minimum and maximum digits, and specific currency symbols.

```javascript
currency(minDigits = null, maxDigits = null, specificCurrencies = []) {}
```

#### Date

Matches date formats such as YY(YY)-MM-DD and DD-MM-YY(YY).

```javascript

date() {}
```

#### Domain Name

Matches domain names, allowing optional limitations on maximum length, specific domains, and extensions.

```javascript

domainName(maxLength = null, onlyDomains = [], onlyExtensions = []) {}
```

#### File Path

Matches Unix-like file paths, with options to specify whether the path points to a directory, a file, or to define the type of path (absolute or relative).

```javascript

filePath(isDirectory = false, isFile = false, pathType = null) {}
```

#### Windows File Path

Matches Windows file paths, providing options to specify if the path points to a directory or a file.

```javascript

filePathWin(isDirectory = false, isFile = false) {}
```

#### HTML Tag

Matches HTML tags, with options to restrict or only match specific tags.

```javascript

htmlTag(restrictTags = [], onlyTags = []) {} // Example usage: htmlTag("p") for restricting the <p> tag
```

#### IP Address

Matches IPv4 addresses.

```javascript

ipAddress() {}
```

#### IPv6 Address

Matches IPv6 addresses.

```javascript

ipv6Address() {}
```

#### Password

Validates passwords with customizable constraints such as minimum length, minimum number of uppercase letters, digits, and special characters.

```javascript

password(minLength = 0, minUppercase = 0, minDigits = 0, minSpecialChars = 0) {}
```

#### Phone

Matches phone numbers, allowing an optional country code to be specified.

```javascript

phone(countryCode = "") {} // Example usage: phone("1") for US or phone("44") for UK
```

#### Time

Matches time formats, including optional seconds and AM/PM notation.

```javascript

time() {}
```

#### Username

Validates usernames based on allowed characters and length constraints.

```javascript

username() {}
```

You can check out files in the [examples](https://github.com/MaestroError/simplified-regex/tree/maestro/examples) folder to learn more about each pattern.

## Options

`SimplifiedRegex` offers a flexible system for applying options to enhance pattern matching. These options can refine matches based on additional assertions or act as filters for specific criteria. There are primarily two ways to apply options in `SimplifiedRegex`: directly as arguments or through the `options` method.

### Direct Arguments

Options can be passed directly as arguments to predefined pattern methods for straightforward configurations.

```javascript
// Using options as direct arguments to set constraints on a password pattern
regexBuilder.source(passwordString).password(8, 1, 1, 1).check();
```

### Options Method

The `options` method provides a versatile approach to configuring patterns, supporting both an object with key-value pairs and a callback for complex configurations. The `options` method allows set **any options** to the **any custom or predefined pattern**.

#### Using an Object

Specify options using an object for a clear and concise configuration.

```javascript
regexBuilder
  .source(passwordString)
  .password()
  .options({ minLength: 8, minDigits: 1 })
  .check();
```

_Note: To keep it simple - all option methods have exactly one argument_

#### Using a Callback

A callback allows for flexible option configuration, making it suitable for complex or dynamic setups.

```javascript
regexBuilder
  .source(passwordString)
  .password()
  .options((opts) => {
    opts.minLength(8).minSpecialChars(2);
  });
```

### Options as Extra Assertions

Options can enforce additional assertions beyond the base pattern match while using the `check` or `checkString` methods, ensuring more precise validation.

```javascript
// Using options to assert the minimum length of matches
regexBuilder.somePattern().options({ minLength: 5 }).check();
```

### Options as Filters

In scenarios involving the retrieval of matches (`get` & `count` methods), options can filter the results to include only those that meet specific criteria.

```javascript
// Filtering to include only matches with a minimum length
regexBuilder
  .source("123 12345 15 3687 654123")
  .text()
  .options({
    minLength: 5,
  })
  .get();
// Returns an array:
["12345", "654123"];
```

### Practical Examples

Options enhance the utility of the `SimplifiedRegex` package by providing fine-grained control over pattern matching and validation. Here's how you might apply options in practice:

```javascript
// Directly applying options to refine an email pattern
const emailPattern = regexBuilder.email(25, [], ["ge", "com"]);
console.log(emailPattern.source("test@example.com").check()); // true
console.log(emailPattern.source("test_EmaiL@example.ge").check()); // true
console.log(emailPattern.source("test_looooooong-email@example.ge").check()); // false (more than 25 chars)
console.log(emailPattern.source("test@example.fj").check()); // false (unallowed extension "fj")
```

This section of the documentation outlines the versatility and power of options within the `SimplifiedRegex` package, providing users with the tools needed to craft precise and effective regular expressions for a wide range of applications.

## Options List

The `SimplifiedRegex` package includes a comprehensive list of options, allowing for detailed customization of regex patterns. Options can be applied to any pattern via direct arguments or through the `options` method. Below is the categorized list of all available options:

### Length Options

Control the length constraints of the match.

```javascript
minLength(length);
maxLength(length);
exactLength(length);
```

### Character Options

Configure allowed characters, exclusions, and case sensitivity.

```javascript
allow(characters); // Specifies characters to include
exclude(characters); // Specifies characters to exclude
minUppercase(count);
minLowercase(count);
```

### Special Character Options

Manage the inclusion or exclusion of special characters.

```javascript
minSpecialChars(count);
maxSpecialChars(count);
onlyLowercase((only = true));
onlyUppercase((only = true));
noSpecialChars((disable = true));
```

### Number Options

Specify numerical constraints within the pattern.

```javascript
setMinValue(value);
setMaxValue(value);
minDigits(value);
maxDigits(value);
setExactValue(value); // Specifies an exact number of digits
```

### Card Type Options

Filter credit card numbers by their issuing network.

```javascript
onlyVisa();
onlyMasterCard();
onlyAmex();
allowCardTypes(types); // Allows specifying multiple card types
```

### Domain and Protocol Options

Customize URL and domain name matching.

```javascript
onlyDomains(domains);
onlyExtensions(extensions);
onlyProtocol(protocol);
onlyHttp((only = true));
onlyHttps((only = true));
```

### File Options

Define file path preferences.

```javascript
isFile((extension = null));
isDirectory((check = true));
```

### HTML Tags Options

Control the matching of HTML tags.

```javascript
onlyTags(tags);
restrictTags(tags);
```

### Miscellaneous Options

Other useful options for common use cases.

```javascript
pathType(value); // Specify "absolute" or "relative" paths
countryCode(code); // Filter phone numbers by country code
noSpaces((disallow = true));
noDoubleSpaces((disallow = true));
maxSpaces(max);
specificCurrencies(currencies); // Filter currency symbols
onlyAlphanumeric(value); // Ensure only alphanumeric characters are included
```

These options enhance the functionality and flexibility of `SimplifiedRegex`, enabling you to tailor regex patterns to meet specific requirements or constraints. Whether you're validating user input, parsing text data, or performing complex searches, these options provide the tools you need to achieve precise and efficient regex matching.

## Applying Quantifiers

Quantifiers in regular expressions are symbols or sets of symbols that specify how many instances of a character, group, or character class must be present in the input for a match to be found. SimplifiedRegex enhances the way quantifiers are used, making it simpler and more intuitive to define the frequency of pattern occurrences.

### Optional Elements

To make an element optional, use '?'. This matches zero or one occurrence of the preceding element (`dash` in this example).

```javascript
// Matches a string that may or may not contain a dash
const result = new RegexBuilder()
  .start("123-456")
  .exact("123")
  .dash("?")
  .exact("456")
  .check();
// Result would be true in both cases of the string: "123456" & "123-456"
```

### Specifying a Range

For specifying a range of occurrences, use a string with two numbers separated by a comma '2,5'. This matches the preceding element at least and at most the specified times.

```javascript
// Matches a string with 2 to 5 spaces
const result = new RegexBuilder()
  .start("someText  234")
  .text()
  .space("2,5")
  .digits()
  .check();
// Result: the "someText  234" would return true, but the "someText 234" false
```

### One or More

To match one or more occurrences of an element, use '+', '1+', '1>' or 'oneOrMore'. This ensures the element appears at least once.

```javascript
// Matches strings with one or more backslashes
const result = new RegexBuilder().start("\\\\").backslash("1+").check();
// Result: true (if one or more backslashes are found)
```

### Zero or More

The '0+' quantifier matches zero or more occurrences of the preceding element.

```javascript
// Matches strings with zero or more forward slashes
const result = new RegexBuilder()
  .start("test258...")
  .alphanumeric()
  .dot("0+")
  .check();
// Result would be true in both cases of the string: "test258..." & "test"
```

### Exact Number

To match an exact number of occurrences, directly specify the number.

```javascript
// Matches strings with exactly 2 underscores
const result = new RegexBuilder()
  .start("1235__158")
  .digits()
  .underscore("2")
  .digits()
  .check();
// Result would be true in cases of the string: "1235__158", but "1235___158" and "1235_158" will be false
```

### To Custom Character Sets and Groups

You can apply quantifiers to custom character sets and groups as the second argument after the callback, matching a specific number of occurrences.

```javascript
// Matches strings with exactly 3 periods or colons
const regex = new RegexBuilder()
  .start()
  .charSet((pattern) => {
    pattern.period().colon();
  }, "3")
  .toRegex();
// Result: ([\.\:]){3}
```

### Quantifier Values

In [Special Characters](#special-characters) and [Groups](#groups) - nearly all methods allow quantifiers with values:

- Zero or More = `"zeroOrMore"`, `"0>"`, `"0+"`, `"*"`
- One or More = `"oneOrMore"`, `"1>"`, `"1+"`, `"+"`
- Optional (Zero or One) = `"optional"`, `"?"`, `"|"`
- Exact Amount = `2`, `"5"`
- Range = `"0,5"`

Example: `->literal("hello world", false, "1+")`

But [Character Classes](#character-classes) have a different approach, let's take `digits` as an example:

```javascript
// By default, it is set as One or More
new RegexBuilder().start("12345").digits();

// You can completely remove the quantifier by passing 0 as the first argument
new RegexBuilder().start("12345").digits(0);

// You can specify the exact amount of digits by passing an integer
new RegexBuilder().start("12345").digits(5);

// You can specify a range of digits by adding "Range" to the method
new RegexBuilder().start("12345").digitsRange(1, 5); // Matches from 1 to 5 digits
```

# Advanced topics

## Regex Flags

Regex flags are special tokens that modify the behavior of regular expressions, allowing for more flexible and powerful pattern matching. In SimplifiedRegex, applying regex flags to your patterns enables specialized matching behaviors such as case-insensitive searches, multiline matching, single-line mode, and support for Unicode characters. Let's explore how to apply these flags using examples.

### Case-Insensitive Matching

Sometimes, the case of letters in a string should not affect the match. To achieve case-insensitive matching, use the `asCaseInsensitive()` flag.

```javascript
const string = "Example@Email.COM";
const checkWithFlag = new RegexBuilder()
  .source(string)
  .start()
  .exact("example")
  .character("@")
  .exact("email.com")
  .end()
  .asCaseInsensitive()
  .check();

// With the case-insensitive flag, the match succeeds.
console.log(checkWithFlag); // true
```

### Multiline Matching

The multiline flag allows the start (^) and end ($) anchors to match the start and end of lines within a string, rather than the entire string.

**Example: Matching Dates Across Multiple Lines using `check()` method**

```javascript
const string = "2024-01-30\n2024-02-15\n2024-11-30";
const matches = new RegexBuilder()
  .source(string)
  .start()
  .digits(4)
  .dash()
  .digits(2)
  .dash()
  .digits(2)
  .end()
  .asMultiline()
  .check();

console.log(matches); // true
```

_Note: if you need to check if a string contains a date, using the `checkString()` method is enough. In this example, we are checking that every line is exactly the date._

### Single-Line Mode

In single-line mode, the dot (.) matches every character, including newline characters, allowing patterns to match across lines.

**Example: Matching Text Across Lines as a Single Line String using `check()` method**

```javascript
const string = "Check out\n this site:";
const check = new RegexBuilder()
  .source(string)
  .start()
  .anyChars()
  .character(":")
  .end()
  .asSingleline()
  .check();

console.log(check); // true
```

### Unicode Character Matching

When working with texts containing Unicode characters, the Unicode flag ensures that character classes such as `\w` (word characters - `wordChars` method) and `\d` (digits - `digits` method) correctly match Unicode characters.

**Example: Matching Text with Unicode Characters**

```javascript
const string = "მზადაა #1 ✔️ და #2 ✔️";
const matches = new RegexBuilder()
  .source(string)
  .start()
  .wordCharsRange(0, 2)
  .end()
  .asUnicode()
  .get();

console.log(matches); // ['და']
```

## Character Sets

In regular expressions, character sets are a fundamental concept that allows you to define a set of characters to match within a single position in the input string. SimplifiedRegex provides an intuitive way to work with both positive and negative character sets, enhancing the versatility of your patterns.

<!-- No quantifiers allowed inside set, cause it is parsed as symbols, so 0 (int) should be used where quantifier is enabled -->

#### Positive set (only these characters)

A positive character set matches any one of the characters included within the set. It's specified by enclosing the characters in square brackets `[...]`.

**Example: Matching a Specific Number of Character Sets**

```javascript
// Matches exactly 3 occurrences of periods or colons
const result = new RegexBuilder()
  .start(".:.")
  .charSet((pattern) => {
    pattern.period().colon();
  }, "3")
  .check();
// Expected to be true as it matches three instances of either a period or a colon
```

In this example, the character set `[\.\:]` is created to match either a period `.` or a colon `:` (In charSet **order** of characters **not matter**). The quantifier '3' is applied outside the set to match exactly three occurrences of **any** of these characters.

#### Negative set (all but not these characters)

A negative character set, denoted by `[^...]`, matches any character that is not listed within the brackets.

**Example: Matching a Specific Number of Negative Character Sets**

```javascript
// Matches a string containing 2 to 4 characters that are not digits
const result = new RegexBuilder()
  .start("abcd")
  .negativeCharSet((pattern) => {
    pattern.digits();
  }, "2,4")
  .check();
// Expected to be true as it matches between 2 to 4 non-digit characters
```

## Groups

SimplifiedRegex simplifies the process of creating both capturing and non-capturing groups, allowing you to organize your regex patterns into logical sections and apply quantifiers or assertions to these groups as a whole.

### Capturing Groups

Capturing groups are used to group part of a pattern together and capture the matching text for later use. Note that it returns an array with a different structure when using `get`:

```javascript
// Matching a date format with capturing the parts as separated groups
const result = new RegexBuilder()
  .start("2024-01-30, 2023-02-20")
  .group((pattern) => {
    pattern.digits(4); // Year
  })
  .dash()
  .group((pattern) => {
    pattern.digits(2); // Month
  })
  .dash()
  .group((pattern) => {
    pattern.digits(2); // Day
  })
  .end({ excludeChars: ["4"] })
  .get();

/**
 * After excluding the "4" character, it filters out
 * the "2024-01-30" match and returns only "2023-02-20"
 * with its capture groups, so you get this array:
 * [
 *     {
 *          "result": "2023-02-20",
 *          "groups": [
 *              "2023",
 *              "02",
 *              "20"
 *          ],
 *     }
 * ]
 */
```

### Named Capturing Groups

It is the same as a capturing group but named and is used to group part of a pattern together and capture the matching text for later use with its name. Note that it returns an array with a different structure when using retrieval methods like `get`:

```javascript
// Matching a date format with capturing the parts as separated groups
const result = new RegexBuilder()
  .start("RI-2142, PO-2555")
  .namedGroup(
    (pattern) => {
      return pattern.textUppercase(2);
    },
    "project",
    1
  )
  .dash()
  .namedGroup(
    (pattern) => {
      return pattern.digitsRange(2, 4);
    },
    "issue",
    1
  )
  .get();

/* Returns:
[
    {
        "result": "RI-2142",
        "groups": {
            "project": "RI",
            "issue": "2142",
        }
    },
    {
        "result": "PO-2555",
        "groups": {
            "project": "PO",
            "issue": "2555",
        }
    }
]
 */
```

### Non-Capturing Groups

Non-capturing groups organize patterns logically without capturing the matched text separately.

```javascript
// Reproduces an 'alt' html property pattern
const regex = new RegexBuilder()
  .start('alt="something"')
  .exact("alt=")
  .nonCapturingGroup((pattern) => {
    pattern.doubleQuote().orPattern((pattern) => {
      pattern.singleQuote();
    });
  })
  .check(); // True; Regex: alt\=(?:\"|')
```

### Groups with Quantifier

Both group methods support quantifiers as the second argument. Quantifiers can be applied with the exact same logic as described in the [Applying Quantifiers](#applying-quantifiers) section.

```javascript
const result = new RegexBuilder()
  .start("345-45, 125-787, 344643")
  .nonCapturingGroup((pattern) => {
    pattern.digits().dash().digits();
  }, "+") // Using "+" to match One Or More of this group
  .get();
// It returns array: ["345-45", "125-787"]
```

## Conditional matching

Assertion groups allow for conditional matching based on the presence (positive) or absence (negative) of patterns ahead or behind the current match point, without consuming characters from the string, so that anything inside the assertion group will not be added in matches. See examples below:

#### Positive Lookahead and Lookbehind Assertions

_Example: Using lookAhead Assertions_

Matches digits only if they are followed by a 'D'

```javascript
// Expected to be true as '3' is followed by 'D'
const result = new RegexBuilder()
  .start("3D")
  .digits()
  .lookAhead((pattern) => {
    pattern.character("D");
  })
  .check();
// While using "get()" method, 'D' doesn't appear in matches
```

_Example: Using lookBehind Assertions_

Matches digits only if they are preceded by a 'P'

```javascript
// Expected to be true as '3' is preceded by 'P'
const result = new RegexBuilder()
  .start("P3")
  .lookBehind((pattern) => {
    pattern.character("P");
  })
  .digits()
  .check();
// While using "get()" method, 'P' doesn't appear in matches
```

#### Negative LookAhead and LookBehind Assertions

Matches digits only if they aren't followed by a '-'

```javascript
// "3A" returns True
let string = "3A";
// "3-" returns False
string = "3-";
const result = new RegexBuilder()
  .start(string)
  .digits()
  .negativeLookAhead((pattern) => {
    pattern.character("-");
  })
  .check();
// While using "get()" method, '-' doesn't appear in matches
```

_Example: Using negativeLookBehind Assertions_

Matches digits only if they aren't preceded by a '-'

```javascript
// "A3" returns True
let string = "A3";
// "-3" returns False
string = "-3";
const result = new RegexBuilder()
  .start(string)
  .negativeLookBehind((pattern) => {
    pattern.character("-");
  })
  .digits()
  .check();
// While using "get()" method, '-' doesn't appear in matches
```

## Pattern alternation (orPattern)

Sometimes, you might encounter situations where either one pattern or another is acceptable. For instance, when developing SimplifiedRegex, a key objective was to enable the reproduction of patterns commonly used in [HSA](https://github.com/MaestroError/html-strings-affixer). Consider the `alt` attribute within an HTML tag, which can be followed by either a double " or a single ' quote. This requirement translates into a regex pattern like `alt\=(\"|')`, indicating an exact match for "alt=" followed by either type of quotation mark.

To achieve this with SimplifiedRegex, you can utilize the `orPattern` method:

```javascript
const regex = new RegexBuilder()
  .start()
  .exact("alt=")
  .group((pattern) => {
    pattern.doubleQuote().orPattern((pattern) => {
      pattern.singleQuote();
    });
  })
  .toRegex(); // alt\=(\"|')
```

In this example, we precisely match "alt=" using the `exact` method. We then create a group with the `group` method and include `doubleQuote` in the group and then `singleQuote` within the orPattern method's callback. This approach ensures the pattern matches either " or '.

The `orPattern` method also accepts a quantifier as its **second argument** (after callback), applying the same quantifier logic as elsewhere in SimplifiedRegex. This feature adds another layer of flexibility, allowing you to specify how many times either pattern should be present.

## Raw Methods

When working with regular expressions, there are times you'll need to insert a segment of raw regex directly into your pattern. This might be due to the complexity of the pattern or simply because you're integrating an existing regex snippet. SimplifiedRegex accommodates this need with specific methods designed to seamlessly integrate raw regex patterns into your larger expressions.

#### Adding Raw Regex Patterns

The `addRawRegex` method allows you to insert any raw regex directly into your pattern. This is particularly useful for incorporating standard regex snippets without modification.

**_Example: Matching a Social Security Number (SSN)_**

```javascript
// Directly adds a raw regex pattern for an SSN
const result = new RegexBuilder()
  .start("123-45-6789")
  .addRawRegex("\\d{3}-\\d{2}-\\d{4}")
  .check();
// Expected to match an SSN format '123-45-6789', but not '123456789'
```

This method is straightforward and ensures that your SimplifiedRegex pattern can accommodate complex requirements with ease.

#### Wrapping Raw Regex in a Non-Capturing Group

Sometimes, you may want to include a raw regex snippet as part of a larger pattern without capturing its match. The `addRawNonCapturingGroup` method wraps the provided raw regex in a non-capturing group, allowing it to participate in the match without affecting the captured groups.

**_Example: Adding Digits Followed by a Specific Letter_**

```javascript
// Wraps digits in a non-capturing group and expects an 'A' immediately after
const result = new RegexBuilder()
  .source("123A")
  .addRawNonCapturingGroup("\\d", "oneOrMore")
  .exact("A")
  .check();
// Expected to match '123A' but not 'A123'
```

## The Lazy Quantifier Method

In the world of regular expressions, greediness refers to the tendency of quantifiers to match as much of the input as possible. However, there are scenarios where you want your pattern to match the smallest possible part of the input that satisfies the pattern, a behavior known as "laziness" or "non-greediness". SimplifiedRegex introduces a straightforward way to apply this concept through the `asLazy()` method.

#### How the Lazy Method Works

The `asLazy()` method modifies the behavior of quantifiers that follow it in the pattern, making them match as few characters as possible. This is particularly useful when you want to extract specific segments from a larger block of text without capturing unnecessary parts.

**_Example: Extracting "Secret Coded" Messages from Text_**

Consider a situation where you need to extract coded messages enclosed in curly braces and preceded by a specific keyword within a larger text. Using the greedy approach might lead to capturing more text than intended, including text between messages. The `asLazy()` method ensures that only the content directly within the braces, following the keyword, is matched.

```javascript
const text =
  "Normal text {secret: message one} more text {secret: another hidden text} end";
const matches = new RegexBuilder()
  .source(text)
  .lookBehind((pattern) => {
    pattern.openCurlyBrace().exact("secret: ");
  })
  .asLazy()
  .anyChars()
  .lookAhead((pattern) => {
    pattern.closeCurlyBrace();
  })
  .get();

// Extracts ['message one', 'another hidden text'] as separate matches
```

In this example, without the `asLazy()` method, the pattern might greedily match from the first `{secret: ` to the last `}`, including everything in between as a single match (`message one} more text {secret: another hidden text`). By applying `asLazy()`, the pattern instead matches the smallest possible string that satisfies the pattern within each set of curly braces, effectively separating the messages.

#### When to Use the Lazy Method

The `asLazy()` method is invaluable when dealing with patterns that include variable-length content, such as strings or blocks of text, where you aim to extract specific, bounded segments. It's especially useful in parsing structured formats embedded within free text, extracting data from templated content, or any scenario where precision is key to separating multiple matches in a larger string.

By making quantifiers lazy, SimplifiedRegex empowers you to write more precise and effective patterns, ensuring that your matches are exactly as intended, no more and no less.

# Contributing

Contributions are welcome! Whether it's adding new patterns, improving the documentation, or reporting bugs, your help is appreciated.

# Support

Support Our Work? 🌟 You can help us keep the code flowing by making a small donation. Every bit of support goes a long way in maintaining and improving our open-source contributions. Click the button below to contribute. Thank you for your generosity!

[<img src="https://github.com/MaestroError/resources/blob/maestro/buymeamilk/green-2.png" width="300px">](https://www.buymeacoffee.com/maestroerror)

Or use QR code:

[<img src="https://github.com/MaestroError/resources/blob/maestro/buymeamilk/qr-code.png" width="135px">](https://www.buymeacoffee.com/maestroerror)

# Credits

A project SimplifiedRegex is the result of inspiration, assistance, and support from various tools and communities. We would like to extend our heartfelt thanks to the following:

- **[Regexr:](https://regexr.com/)** For being an invaluable tool in the creation and debugging of regex patterns. Its intuitive interface and detailed explanations have made it possible to refine and perfect our regex expressions.

- **[ChatGPT:](https://chat.openai.com/)** For its assistance in covering the full codebase with tests. [ChatGPT's](https://openai.com/) guidance and suggestions have also been important in creation of this documentation and rewriting project code from [EloquentRegex](https://github.com/MaestroError/eloquent-regex) PHP package.

A special thank you goes out to everyone who has contributed to these tools and resources. Your work has not only aided in the development of SimplifiedRegex but has also contributed to the broader developer community by providing tools and knowledge that empower us all.

# Frequently Asked Questions (FAQ)

### What is SimplifiedRegex?

SimplifiedRegex is a JavaScript package that aims to simplify the process of constructing and managing regular expressions. It provides a fluent API that makes regex patterns more readable and easier to compose, along with ready-to-use patterns for common validation tasks such as email, URL, and credit card number validation.

### How do I install SimplifiedRegex?

You can install SimplifiedRegex using npm or yarn. Here's how you can add it to your project using npm:

```bash

npm install simplified-regex
```

### Can I use SimplifiedRegex on the client-side?

Absolutely! SimplifiedRegex is designed to work both in Node.js environments and in browsers. You can include it in your frontend projects to leverage its regex capabilities for form validation, input parsing, and more.

### How do I use ready-to-use patterns?

Ready-to-use patterns are available as methods on the `RegexBuilder` class. For instance, to validate an email address, you could do the following:

```javascript
const { RegexBuilder } = require("simplified-regex");
const simpleRegex = new RegexBuilder();
simpleRegex.source("test@example.com").email().check();
```

### How do I create custom patterns?

Custom patterns can be built by chaining together [methods](https://github.com/MaestroError/simplified-regex/tree/maestro/src/Builder/BuilderMethods) provided by the `RegexBuilder` class. Here's an example of constructing a custom pattern:

```javascript
const result = new RegexBuilder()
  .start("Here is my username: User_245")
  .text()
  .underscore()
  .digits()
  .get(); // ["User_245"]
```

### Can I apply options to any pattern?

Yes, options can be applied to enhance or refine any pattern. This is accomplished using either direct method chaining or the `options` method for more complex configurations.

### How do I debug my regex patterns?

The `toRegex` method of `RegexBuilder` allows you to obtain the compiled regex pattern as a string. This string can then be tested with tools such as **[Regexr:](https://regexr.com/)** to debug and further refine your pattern.

### How can I contribute to SimplifiedRegex?

Contributions are always welcome! You can contribute by reporting issues, suggesting features, or submitting pull requests through the GitHub repository. Please follow the project's contribution guidelines when submitting your contributions.

### Where can I report issues or request features?

For issues or feature requests, please use the Issues section of the GitHub repository. Provide clear and detailed information to help us understand and address your concern effectively.

### How do I stay updated on SimplifiedRegex developments?

To stay informed about the latest updates and developments, you can star or watch the GitHub repository or follow the [author's page](https://www.linkedin.com/in/maestroerror/). This will keep you in the loop for new releases, features, and discussions related to SimplifiedRegex.

# License

SimplifiedRegex is licensed under the MIT License. See the LICENSE file for more details.

---

#### Future plans

- Extend String's prototype and add `simpleRegex()` method that will return `regexBuilder` and take the String as source.

#### To Do

- Implement BuilderPattern methods in builderMethodsMixin +
- Add tests for builderMethodsMixin methods +
- source setting feature directly from action methods (`.check(source)`) +
- Implement options and register in OptionsBuilder +
- Implement patterns using builderMethodsMixin's methods +
- Add github actions for automated tests +
- Write the Docs in Readme.md file +
- Extend docs +
- Add Character classess and groups in Docs.+
- Add in Basic Usage topic the "Features" docs with both pattern examples+

##### GPT rewriting tips

- Use short messages (rewrite 10-15 methods per prompt).
- Ask it to write tests and check tests logic manually.
- If it goes wrong way, just stop it and tell the correct one.
- Giving some starting point (even empty methods) or an example (Even the previously generated code) makes it to generate more precise code and keep consistancy.
- Often GPT does everything correct and the process becomes boring at some moment.
- After extensive use it starts hallucination
