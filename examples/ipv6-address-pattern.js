import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const ip = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
const check = regex.start(ip).ipv6Address().check();

console.log(check);
console.log(regex.toRegex());
