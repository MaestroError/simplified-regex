// examples/basic-usage.js
import { RegexBuilder } from "../src/index.js";

const regexBuilder = new RegexBuilder();
const count = regexBuilder
  .setPattern("\\d+") // For example, a pattern to match one or more digits
  .source("There are 123 apples and 456 oranges.")
  .count(); // This will return 2, because there are two matches of the pattern

console.log(count);
