import { RegexBuilder } from "../src/index.js";

const regex = new RegexBuilder();

const numbers = regex
  .creditCardNumber()
  .source(
    "Visa: 4111 1111 1111 1111, MasterCard: 5500 0000 0000 0004, Amex: 3400 000000 00009"
  )
  .get();

console.log(numbers);
console.log(regex.toRegex());
