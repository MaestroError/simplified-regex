# SimplifiedRegex

### simplified-regex

SimplifiedRegex is a JavaScript package designed to facilitate the construction and manipulation of regular expressions in a fluent and intuitive manner. Drawing inspiration from the EloquentRegex PHP package, SimplifiedRegex adapts its principles to the JavaScript ecosystem, offering a similar builder pattern and feature set optimized for both Node.js and browser environments.

## Features

- **Fluent Interface**: Build complex regular expressions using a readable and intuitive syntax.
- **Builder Pattern**: Easily define and concatenate patterns with automatic escaping where necessary.
- **Predefined Patterns**: Utilize a collection of commonly used patterns, enhancing development efficiency.
- **Customizable**: Extend or modify predefined patterns to suit your specific needs.
- **Compatible**: Works seamlessly across major JavaScript environments, including browsers and Node.js.

## Installation

You can install the SimplifiedRegex package via npm or include it directly in your browser through a CDN.

### NPM

```bash
npm install simplified-regex
```

### CDN

For browser usage, you can include SimplifiedRegex directly from a CDN:

```html
<script src="https://cdn.example.com/simplified-regex.min.js"></script>
```

## Usage

### Importing

In a Node.js environment, import SimplifiedRegex as follows:

```javascript
`const { RegexBuilder } = require('simplified-regex');`;
```

For ES modules or TypeScript, use:

```javascript
`import { RegexBuilder } from 'simplified-regex';`;
```

### Building a Regex

The core of SimplifiedRegex is the `RegexBuilder` class, which you use to construct your regular expressions.

Example - Matching an email address:

```javascript
const builder = new RegexBuilder();
const regex = builder
  .start() // Indicates the start of the expression
  .wordChars() // Adds a word character pattern
  .then("@") // Explicitly adds the "@" character
  .wordChars() // Adds another word character pattern
  .then(".") // Adds a period
  .wordChars(2, 6) // Adds a word character pattern with a length range
  .end() // Indicates the end of the expression
  .build(); // Compiles and returns the final Regex pattern

console.log(regex.test("example@email.com")); // Outputs: true
```

### Using Predefined Patterns

SimplifiedRegex comes with a set of commonly used predefined patterns, such as `email`, `url`, `ipAddress`, and more.

```javascript
const emailRegex = builder.email().build();
console.log(emailRegex.test("user@example.com")); // Outputs: true
```

## Contributing

Contributions are welcome! Whether it's adding new patterns, improving the documentation, or reporting bugs, your help is appreciated.

## License

SimplifiedRegex is licensed under the MIT License. See the LICENSE file for more details.

#### To Do

- Implement BuilderPattern methods in builderMethodsMixin +
- Add tests for builderMethodsMixin methods +
- source setting feature directly from action methods (`.check(source)`) +
- Implement options and register in OptionsBuilder +
- Implement patterns using builderMethodsMixin's methods +
- Add github actions for automated tests +
- Write the Docs in Readme.md file +
- Extend docs

##### GPT rewriting tips

- Use short messages (rewrite 10-15 methods per prompt).
- Ask it to write tests and check tests logic manually.
- If it goes wrong way, just stop it and tell the correct one.
- Giving some starting point (even empty methods) or an example (Even the previously generated code) makes it to generate more precise code and keep consistancy.
- Often GPT does everything correct and the process becomes boring at some moment.
- After extensive use it starts hallucination
