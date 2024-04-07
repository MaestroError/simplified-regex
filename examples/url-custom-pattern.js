import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

regex
  // Protocol part:
  .exact("http")
  .exact("s", true, "?")
  .colon()
  .forwardSlash()
  .forwardSlash()
  // Domain part:
  .charSet((reg) => {
    reg.alphanumeric().dot().minus();
  }, "1+")
  .dot()
  .charSet((reg) => {
    reg.text();
  }, "2,6")
  // URI part:
  .nonCapturingGroup((reg) => {
    reg.forwardSlash().charSet((reg) => {
      reg.alphanumeric().hyphen().underscore().forwardSlash();
    }, "*");
  }, "?");

const checkUrl = regex
  .source("https://github.com/MaestroError/hsa-js/tree/maestro")
  .check();

console.log(checkUrl);
console.log(regex.toRegex());
