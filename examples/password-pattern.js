import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const strongPassword = "StrongP@ssw0rd";
const weakPassword = "password123";
const checkStrong = regex.start(strongPassword).password(8, 1, 1, 1).check();
const checkWeak = regex.start(weakPassword).password(8, 1, 1, 1).check();

console.log(checkStrong);
console.log(checkWeak);
console.log(regex.toRegex());
