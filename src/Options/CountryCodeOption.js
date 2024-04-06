class CountryCodeOption {
  constructor() {
    this.countryCode = "";
  }

  validate(input) {
    // Pass validation by default if no country code is set
    if (this.countryCode === "") {
      return true;
    }

    // Check if input starts with the country code (with or without +)
    return (
      input.startsWith("+" + this.countryCode) ||
      input.startsWith(this.countryCode)
    );
  }

  setCountryCode(code) {
    this.countryCode = code;
    return this;
  }
}

export default CountryCodeOption;
