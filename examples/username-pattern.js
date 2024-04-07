import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const username = "user_123";
const check = regex.start(username).username().check();

console.log(check);
console.log(regex.toRegex());
