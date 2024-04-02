// OptionsBuilder.js
import LengthOption from "./../Options/LengthOption.js";
// ... import other option classes

class OptionsBuilder {
  constructor() {
    this.options = {
      length: new LengthOption(),
      // ... initialize other option classes
    };
  }

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

// const builder = new OptionsBuilder();

// // Set options using individual methods
// builder.minLength(3).maxLength(5).exactLength(4);

// // Set options using an object
// builder.setOptions({ minLength: 2, maxLength: 6 });

// const isValid = builder.validate("test"); // Use the validate method to check input

// console.log(isValid);
