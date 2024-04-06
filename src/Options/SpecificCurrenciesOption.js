class SpecificCurrenciesOption {
  constructor() {
    this.specificCurrencies = [];
  }

  validate(input) {
    if (this.specificCurrencies.length === 0) {
      return true; // Pass by default if no specific currencies are specified
    }
    const pattern = new RegExp(
      this.specificCurrencies.map((currency) => `\\${currency}`).join("|")
    );
    return pattern.test(input);
  }

  setSpecificCurrencies(currencies) {
    if (typeof currencies === "string") {
      currencies = currencies.split(",");
    }
    this.specificCurrencies = currencies;
    return this;
  }

  onlyUSD(only = true) {
    if (only) {
      this.specificCurrencies = ["$"];
    }
    return this;
  }

  onlyEUR(only = true) {
    if (only) {
      this.specificCurrencies = ["€"];
    }
    return this;
  }

  onlyGBP(only = true) {
    if (only) {
      this.specificCurrencies = ["£"];
    }
    return this;
  }

  onlyGEL(only = true) {
    if (only) {
      this.specificCurrencies = ["₾"];
    }
    return this;
  }
}

export default SpecificCurrenciesOption;
