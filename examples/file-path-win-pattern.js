import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const path = "C:\\Program Files\\app\\config.ini";
const check = regex.start(path).filePathWin().check();

console.log(check);
console.log(regex.toRegex());
