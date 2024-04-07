import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const checkUrl = regex
  .url()
  .source("https://github.com/MaestroError/hsa-js/tree/maestro")
  .check();

console.log(checkUrl);
console.log(regex.toRegex());
