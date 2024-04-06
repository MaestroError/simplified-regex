// OptionsBuilder.js
import LengthOption from "./../Options/LengthOption.js";
import CardTypeOption from "./../Options/CardTypeOption.js";
import CharacterOption from "./../Options/CharacterOption.js";
import CharOption from "./../Options/CharOption.js";
import ContainSpacesOption from "./../Options/ContainSpacesOption.js";
import CountryCodeOption from "./../Options/CountryCodeOption.js";
import DomainSpecificOption from "./../Options/DomainSpecificOption.js";

class OptionsBuilder {
  constructor() {
    this.options = {
      length: new LengthOption(),
      cardType: new CardTypeOption(),
      character: new CharacterOption(),
      char: new CharOption(),
      containSpaces: new ContainSpacesOption(),
      countryCode: new CountryCodeOption(),
      domainSpecific: new DomainSpecificOption(),
      // ... initialize other option classes
    };
  }

  // Options:

  // length

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

  // cardType

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

  // character

  allow(characters) {
    this.options.character.allow(characters);
    return this;
  }

  exclude(characters) {
    this.options.character.exclude(characters);
    return this;
  }

  minUppercase(count) {
    this.options.character.setMinUppercase(count);
    return this;
  }

  minLowercase(count) {
    this.options.character.setMinLowercase(count);
    return this;
  }

  // char

  // Implementing methods for CharOption
  minSpecialChars(count) {
    this.options.charOption.minSpecialCharacters(count);
    return this;
  }

  maxSpecialChars(count) {
    this.options.charOption.maxSpecialCharacters(count);
    return this;
  }

  onlyLowercase(only = true) {
    this.options.charOption.onlyLowercase(only);
    return this;
  }

  onlyUppercase(only = true) {
    this.options.charOption.onlyUppercase(only);
    return this;
  }

  noSpecialChars(disable = true) {
    this.options.charOption.noSpecialCharacters(disable);
    return this;
  }

  // containSpaces

  // Adding methods for ContainSpacesOption configuration
  noSpaces(disallow = true) {
    this.options.containSpaces.noSpaces(disallow);
    return this;
  }

  noDoubleSpaces(disallow = true) {
    this.options.containSpaces.setNoDoubleSpaces(disallow);
    return this;
  }

  maxSpaces(max) {
    this.options.containSpaces.setMaxSpaces(max);
    return this;
  }

  // countryCode

  setCountryCode(code) {
    this.options.countryCode.setCountryCode(code);
    return this;
  }

  // domainSpecific

  // Methods to set allowed domains and extensions
  setAllowedDomains(domains) {
    this.options.domainSpecific.setAllowedDomains(domains);
    return this;
  }

  setAllowedExtensions(extensions) {
    this.options.domainSpecific.setAllowedExtensions(extensions);
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
