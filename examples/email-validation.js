import { RegexBuilder } from "../src/index.js";

// Options as argument
const regexBuilder = new RegexBuilder();
const email = regexBuilder.email(25, [], ["ge", "com"]);

console.log(email.source("test@example.com").check()); // true
console.log(email.source("test@exa@mple.com").check()); // false
console.log(email.source("test_EmaiL@example.ge").check()); // true
console.log(email.source("test_looooooong-email@example.ge").check()); // false (more then 25 chars)
console.log(email.source("test@example.fj").check()); // false (Unallowed extension "fj")

// Options via method
const emailWithOptions = regexBuilder.email().options({
  maxLength: 25,
  onlyExtensions: ["ge", "com"],
});

console.log("Using Options:");

console.log(
  emailWithOptions.source("test_looooooong-email@example.ge").check()
); // false (more then 25 chars)
console.log(email.source("test@example.fj").check()); // false (Unallowed extension "fj")
