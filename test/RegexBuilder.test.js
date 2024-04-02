// tests/RegexBuilder.test.js
import { RegexBuilder } from "../src";

test("RegexBuilder builds correct regex", () => {
  const builder = new RegexBuilder();
  const regex = builder.add("abc").build();
  expect(regex.test("abc")).toBe(true);
});
