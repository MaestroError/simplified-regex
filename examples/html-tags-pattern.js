import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const path = "<div>example</div>";
const check = regex.start(path).htmlTag().check();

console.log(check);
console.log(regex.toRegex());
