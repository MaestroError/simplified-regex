import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const path = "/user/directory/file.txt";
const check = regex.start(path).filePath().check();

console.log(check);
console.log(regex.toRegex());
