class OnlyAlphanumericOption {
  constructor() {
    this.allowOnlyAlphanumeric = false;
  }

  validate(input) {
    if (this.allowOnlyAlphanumeric) {
      return /^[a-zA-Z0-9]+$/.test(input);
    }
    return true;
  }

  build() {
    return this.allowOnlyAlphanumeric ? "[a-zA-Z0-9]+" : ".+";
  }

  onlyAlphanumeric(only = true) {
    this.allowOnlyAlphanumeric = only;
    return this;
  }
}

export default OnlyAlphanumericOption;
