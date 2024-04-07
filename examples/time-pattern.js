import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const time = "23:59";
const check = regex.start(time).time().check();

console.log(check);
console.log(regex.toRegex());
