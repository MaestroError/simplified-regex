// CommonJS
(async () => {
  const { RegexBuilder } = await import("simplified-regex");

  const email = "test@example.com";
  const regexBuilder = new RegexBuilder();
  const isValid = regexBuilder.start(email).email().check(); // True

  console.log(isValid);
})();

// "type": "module"
import { RegexBuilder } from "simplified-regex";

const email = "test@example.com";
const regexBuilder = new RegexBuilder();
const isValid = regexBuilder.start(email).email().check(); // True

console.log(isValid);
