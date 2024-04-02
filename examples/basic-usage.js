// examples/basic-usage.js
import { RegexBuilder } from "../src";

const builder = new RegexBuilder();
const regex = builder.add("abc").build();

console.log('Test "abc":', regex.test("abc")); // Should log: Test "abc": true
