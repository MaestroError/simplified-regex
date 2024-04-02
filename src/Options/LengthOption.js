// LengthOption.js
class LengthOption {
  constructor() {
    this.minLength = null;
    this.maxLength = null;
    this.exactLength = null;
  }

  validate(input) {
    const length = input.length;

    if (this.exactLength !== null && length !== this.exactLength) {
      return false;
    }

    if (this.minLength !== null && length < this.minLength) {
      return false;
    }

    if (this.maxLength !== null && length > this.maxLength) {
      return false;
    }

    return true;
  }

  build() {
    if (this.exactLength !== null) {
      return `{${this.exactLength}}`;
    }

    const min = this.minLength ?? "";
    const max = this.maxLength ?? "";

    if (min === "" && max !== "") {
      return `{0,${max}}`;
    } else {
      return `{${min},${max}}`;
    }
  }

  setMinLength(length) {
    this.minLength = length;
    this.exactLength = null; // Reset exact length if min or max length is set
    return this;
  }

  setMaxLength(length) {
    this.maxLength = length;
    this.exactLength = null; // Reset exact length if min or max length is set
    return this;
  }

  setExactLength(length) {
    this.exactLength = length;
    this.minLength = null;
    this.maxLength = null;
    return this;
  }
}

export default LengthOption;
