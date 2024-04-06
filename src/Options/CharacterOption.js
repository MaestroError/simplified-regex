// CharacterOption.js
class CharacterOption {
  constructor() {
    this.allowedCharacters = [];
    this.excludedCharacters = [];
    this.minUppercase = 0;
    this.minLowercase = 0;
  }

  validate(input) {
    const uppercaseCount = (input.match(/[A-Z]/g) || []).length;
    const lowercaseCount = (input.match(/[a-z]/g) || []).length;

    if (this.minUppercase > 0 && uppercaseCount < this.minUppercase) {
      return false;
    }

    if (this.minLowercase > 0 && lowercaseCount < this.minLowercase) {
      return false;
    }

    for (const char of input) {
      if (
        this.allowedCharacters.length > 0 &&
        !this.allowedCharacters.includes(char)
      ) {
        return false; // Character not in the allowed list
      }

      if (this.excludedCharacters.includes(char)) {
        return false; // Character is in the excluded list
      }
    }

    return true;
  }

  build() {
    let pattern = "";

    if (this.minUppercase > 0) {
      pattern += `(?=(?:.*[A-Z]){${this.minUppercase},})`;
    }

    if (this.minLowercase > 0) {
      pattern += `(?=(?:.*[a-z]){${this.minLowercase},})`;
    }

    const allowedPattern =
      this.allowedCharacters.length > 0
        ? `[${this.allowedCharacters.map((char) => `\\${char}`).join("")}]`
        : ".*";

    const excludedPattern =
      this.excludedCharacters.length > 0
        ? `(?!.*[${this.excludedCharacters
            .map((char) => `\\${char}`)
            .join("")}])`
        : "";

    pattern += `${excludedPattern}${allowedPattern}`;

    return new RegExp(pattern);
  }

  allow(characters) {
    this.allowedCharacters = characters;
    return this;
  }

  exclude(characters) {
    this.excludedCharacters = characters;
    return this;
  }

  setMinUppercase(count) {
    this.minUppercase = count;
    return this;
  }

  setMinLowercase(count) {
    this.minLowercase = count;
    return this;
  }
}

export default CharacterOption;
