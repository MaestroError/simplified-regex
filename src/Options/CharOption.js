// CharOption.js
class CharOption {
  constructor() {
    this._minSpecialCharacters = 0;
    this._maxSpecialCharacters = null;
    this._onlyLowercase = false;
    this._onlyUppercase = false;
  }

  validate(input) {
    const uppercaseCount = (input.match(/[A-Z]/g) || []).length;
    const lowercaseCount = (input.match(/[a-z]/g) || []).length;
    const specialCharsCount = (input.match(/[^\w\s]/g) || []).length;
    const inputCount = input.length;

    if (this._onlyLowercase && lowercaseCount !== inputCount) {
      return false;
    }

    if (this._onlyUppercase && uppercaseCount !== inputCount) {
      return false;
    }

    if (
      this._minSpecialCharacters > 0 &&
      specialCharsCount < this._minSpecialCharacters
    ) {
      return false; // Not enough special characters
    }

    if (
      this._maxSpecialCharacters !== null &&
      specialCharsCount > this._maxSpecialCharacters
    ) {
      return false; // Too many special characters
    }

    return true;
  }

  minSpecialCharacters(count) {
    this._minSpecialCharacters = count;
    return this;
  }

  maxSpecialCharacters(count) {
    this._maxSpecialCharacters = count;
    return this;
  }

  noSpecialCharacters(disable = true) {
    if (disable) {
      this._maxSpecialCharacters = 0;
    }
    return this;
  }

  onlyLowercase(only = true) {
    this._onlyLowercase = only;
    return this;
  }

  onlyUppercase(only = true) {
    this._onlyUppercase = only;
    return this;
  }
}

export default CharOption;
