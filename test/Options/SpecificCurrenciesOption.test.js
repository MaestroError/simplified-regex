import SpecificCurrenciesOption from "../../src/Options/SpecificCurrenciesOption";

describe("SpecificCurrenciesOption", () => {
  let specificCurrenciesOption;

  beforeEach(() => {
    specificCurrenciesOption = new SpecificCurrenciesOption();
  });

  test("validates currency symbols correctly", () => {
    specificCurrenciesOption.setSpecificCurrencies(["$", "€", "£", "₾"]);
    expect(specificCurrenciesOption.validate("$100")).toBeTruthy();
    expect(specificCurrenciesOption.validate("€100")).toBeTruthy();
    expect(specificCurrenciesOption.validate("£100")).toBeTruthy();
    expect(specificCurrenciesOption.validate("₾100")).toBeTruthy();
    expect(specificCurrenciesOption.validate("Y100")).toBeFalsy();
  });

  test("onlyUSD restricts validation to USD currency symbol", () => {
    specificCurrenciesOption.onlyUSD();
    expect(specificCurrenciesOption.validate("$100")).toBeTruthy();
    expect(specificCurrenciesOption.validate("€100")).toBeFalsy();
  });
});
