// OptionsBuilder.js
import LengthOption from "./../Options/LengthOption.js";
import CardTypeOption from "./../Options/CardTypeOption.js";

class OptionsBuilder {
  constructor() {
    this.options = {
      length: new LengthOption(),
      cardType: new CardTypeOption(),
      // ... initialize other option classes
    };
  }

  // Options:

  minLength(length) {
    this.options.length.setMinLength(length);
    return this;
  }

  maxLength(length) {
    this.options.length.setMaxLength(length);
    return this;
  }

  exactLength(length) {
    this.options.length.setExactLength(length);
    return this;
  }

  onlyVisa() {
    this.options.cardType.useOnlyVisa();
    return this;
  }

  onlyMasterCard() {
    this.options.cardType.useOnlyMasterCard();
    return this;
  }

  onlyAmex() {
    this.options.cardType.useOnlyAmex();
    return this;
  }

  allowCardTypes(types) {
    this.options.cardType.allowCardTypes(types);
    return this;
  }

  // OptionsBuilder methods:

  // Set options using an object
  setOptions(optionsObject) {
    for (const [option, value] of Object.entries(optionsObject)) {
      if (this[option] && typeof this[option] === "function") {
        this[option](value);
      } else {
        throw new Error(`Option method not found: ${option}`);
      }
    }
    return this;
  }

  // Set options using an object
  setOptionsFromTempBuilder(optionsObject) {
    this.options = optionsObject;
    return this;
  }

  // Set a single option using a name and value
  setOption(name, value) {
    if (this[name] && typeof this[name] === "function") {
      this[name](value);
    } else {
      throw new Error(`Option method not found: ${name}`);
    }
    return this;
  }

  validate(input) {
    // Validate the input for each option
    return Object.values(this.options).every((option) =>
      option.validate(input)
    );
  }

  getOptions() {
    return this.options;
  }
}

export default OptionsBuilder;
