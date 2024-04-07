import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const ip = "192.168.1.1";
const check = regex.start(ip).ipAddress().check();

console.log(check);
console.log(regex.toRegex());
