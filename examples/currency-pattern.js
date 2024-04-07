import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const numbers = regex.source("The price is $240").currency().get();

console.log(numbers);
console.log(regex.toRegex());
