class NumberOption {
  constructor() {
    this.minValue = null;
    this.maxValue = null;
    this.exactValue = null;
  }

  validate(input) {
    const numericCount = (input.match(/\d/g) || []).length;

    if (this.exactValue !== null && numericCount !== this.exactValue) {
      return false;
    }

    if (this.minValue !== null && numericCount < this.minValue) {
      return false;
    }

    if (this.maxValue !== null && numericCount > this.maxValue) {
      return false;
    }

    return true;
  }

  build() {
    if (this.exactValue !== null) {
      return `\\d{${this.exactValue}}`;
    }

    const min = this.minValue ?? "";
    const max = this.maxValue ?? "";

    if (min === "" && max !== "") {
      return `\\d{0,${max}}`;
    } else {
      return `\\d{${min},${max}}`;
    }
  }

  setMinValue(minValue) {
    this.minValue = minValue;
    this.exactValue = null;
    return this;
  }

  setMaxValue(maxValue) {
    this.maxValue = maxValue;
    this.exactValue = null;
    return this;
  }

  setExactValue(exactValue) {
    this.exactValue = exactValue;
    this.minValue = null;
    this.maxValue = null;
    return this;
  }
}

export default NumberOption;
