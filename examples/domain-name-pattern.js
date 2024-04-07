import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const check = regex.source("example.com").domainName().check();
const checkSubDomain = regex
  .source("sub.domain.example.com")
  .domainName()
  .check();

console.log(check);
console.log(checkSubDomain);
console.log(regex.toRegex());
