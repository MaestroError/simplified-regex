import CardTypeOption from "../../src/Options/CardTypeOption"; // Update the path accordingly

describe("CardTypeOption", () => {
  let cardTypeOption;

  beforeEach(() => {
    cardTypeOption = new CardTypeOption();
  });

  test("validates Visa card numbers correctly", () => {
    cardTypeOption.useOnlyVisa();
    // Valid Visa number
    expect(cardTypeOption.validate("4111111111111111")).toBeTruthy();
    // Invalid Visa number
    expect(cardTypeOption.validate("5111111111111111")).toBeFalsy();
  });

  test("validates MasterCard numbers correctly", () => {
    cardTypeOption.useOnlyMasterCard();
    // Valid MasterCard number
    expect(cardTypeOption.validate("5105105105105100")).toBeTruthy();
    // Invalid MasterCard number
    expect(cardTypeOption.validate("4111111111111111")).toBeFalsy();
  });

  test("validates American Express card numbers correctly", () => {
    cardTypeOption.useOnlyAmex();
    // Valid Amex number
    expect(cardTypeOption.validate("378282246310005")).toBeTruthy();
    // Invalid Amex number
    expect(cardTypeOption.validate("4111111111111111")).toBeFalsy();
  });

  test("builds correct regex pattern for Visa cards", () => {
    cardTypeOption.useOnlyVisa();
    expect(cardTypeOption.build().toString()).toEqual(
      "/4[0-9]{12}(?:[0-9]{3})?/"
    );
  });

  test("builds correct regex pattern for MasterCard cards", () => {
    cardTypeOption.useOnlyMasterCard();
    expect(cardTypeOption.build().toString()).toEqual("/5[1-5][0-9]{14}/");
  });

  test("builds correct regex pattern for American Express cards", () => {
    cardTypeOption.useOnlyAmex();
    expect(cardTypeOption.build().toString()).toEqual("/^3[47][0-9]{13}$/");
  });

  test("allowCardTypes method correctly sets multiple card types", () => {
    cardTypeOption.allowCardTypes("visa,mastercard");
    expect(cardTypeOption.validate("4111111111111111")).toBeTruthy(); // Visa
    expect(cardTypeOption.validate("5105105105105100")).toBeTruthy(); // MasterCard
    expect(cardTypeOption.validate("378282246310005")).toBeFalsy(); // Amex should fail
  });
});
