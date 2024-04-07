import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const number = "+1 (123) 456-7890";
const check = regex.start(number).phone().check();

console.log(check);
console.log(regex.toRegex());
