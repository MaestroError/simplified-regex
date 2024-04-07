import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const check = regex.source("2023-01-01").date().check();

console.log(check);
console.log(regex.toRegex());
