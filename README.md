# SimplifiedRegex

### simplified-regex

SimplifiedRegex is a JavaScript package designed to facilitate the construction and manipulation of regular expressions in a fluent and intuitive manner. Drawing inspiration from the [EloquentRegex](https://github.com/MaestroError/eloquent-regex) PHP package, SimplifiedRegex adapts its principles to the JavaScript ecosystem, offering a similar builder pattern and feature set optimized for both Node.js and browser environments.

#### What it does?

You can use all regex features without writing actual regex pattern. Let me show you how:

```javascript
const regex = new RegexBuilder();

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
  - [Building a Regex](#building-a-regex)
  - [Using Predefined Patterns](#using-predefined-patterns)
  - [Options](#options)
  - [Options List](#options-list)
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

A special thank you goes out to everyone who has contributed to these tools and resources. Your work has not only aided in the development of EloquentRegex but has also contributed to the broader developer community by providing tools and knowledge that empower us all.

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

##### GPT rewriting tips

- Use short messages (rewrite 10-15 methods per prompt).
- Ask it to write tests and check tests logic manually.
- If it goes wrong way, just stop it and tell the correct one.
- Giving some starting point (even empty methods) or an example (Even the previously generated code) makes it to generate more precise code and keep consistancy.
- Often GPT does everything correct and the process becomes boring at some moment.
- After extensive use it starts hallucination
