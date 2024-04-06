class CardTypeOption {
  constructor() {
    this.onlyVisa = false;
    this.onlyMasterCard = false;
    this.onlyAmex = false;
  }

  validate(input) {
    const cleanedInput = input.replace(/ |-/g, "");
    return this.build().test(cleanedInput);
  }

  build() {
    let patterns = [];

    if (this.onlyVisa) {
      patterns.push("4[0-9]{12}(?:[0-9]{3})?"); // Visa
    }

    if (this.onlyMasterCard) {
      patterns.push("5[1-5][0-9]{14}"); // MasterCard
    }

    if (this.onlyAmex) {
      patterns.push("^3[47][0-9]{13}$"); // American Express
    }

    // Combine patterns with OR and create a RegExp
    return new RegExp(patterns.join("|"));
  }

  useOnlyVisa(only = true) {
    this.onlyVisa = only;
    return this;
  }

  useOnlyMasterCard(only = true) {
    this.onlyMasterCard = only;
    return this;
  }

  useOnlyAmex(only = true) {
    this.onlyAmex = only;
    return this;
  }

  allowCardTypes(cardTypes) {
    const types = cardTypes.split(",");

    types.forEach((type) => {
      switch (type.trim().toLowerCase()) {
        case "visa":
          this.onlyVisa = true;
          break;
        case "mastercard":
          this.onlyMasterCard = true;
          break;
        case "amex":
          this.onlyAmex = true;
          break;
        // Additional card types can be added here
      }
    });

    return this;
  }
}

export default CardTypeOption;
