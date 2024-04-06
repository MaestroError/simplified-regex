// OptionsBuilder.js
import LengthOption from "./../Options/LengthOption.js";
import CardTypeOption from "./../Options/CardTypeOption.js";
import CharacterOption from "./../Options/CharacterOption.js";
import CharOption from "./../Options/CharOption.js";
import ContainSpacesOption from "./../Options/ContainSpacesOption.js";
import CountryCodeOption from "./../Options/CountryCodeOption.js";
import DomainSpecificOption from "./../Options/DomainSpecificOption.js";
import FileOption from "./../Options/FileOption.js";
import HtmlTagsOption from "./../Options/HtmlTagsOption.js";
import NumberOption from "./../Options/NumberOption.js";
import OnlyAlphanumericOption from "./../Options/OnlyAlphanumericOption.js";
import PathTypeOption from "./../Options/PathTypeOption.js";
import ProtocolOption from "./../Options/ProtocolOption.js";
import SpecificCurrenciesOption from "./../Options/SpecificCurrenciesOption.js";

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
      file: new FileOption(),
      htmlTags: new HtmlTagsOption(),
      number: new NumberOption(),
      onlyAlphanumeric: new OnlyAlphanumericOption(),
      pathType: new PathTypeOption(),
      protocol: new ProtocolOption(),
      specificCurrencies: new SpecificCurrenciesOption(),
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
  onlyDomains(domains) {
    this.options.domainSpecific.setAllowedDomains(domains);
    return this;
  }

  onlyExtensions(extensions) {
    this.options.domainSpecific.setAllowedExtensions(extensions);
    return this;
  }

  // file

  isFile(extension = null) {
    this.options.file.isFile(extension);
    return this;
  }

  isDirectory(check = true) {
    this.options.file.isDirectory(check);
    return this;
  }

  // htmlTags

  allowTags(tags) {
    this.options.htmlTags.allowTags(tags);
    return this;
  }

  restrictTags(tags) {
    this.options.htmlTags.restrictTags(tags);
    return this;
  }

  // number

  setMinValue(value) {
    this.options.number.setMinValue(value);
    return this;
  }

  setMaxValue(value) {
    this.options.number.setMaxValue(value);
    return this;
  }

  setExactValue(value) {
    this.options.number.setExactValue(value);
    return this;
  }

  // onlyAlphanumeric

  onlyAlphanumeric(value) {
    this.options.onlyAlphanumeric.onlyAlphanumeric(value);
    return this;
  }

  // pathType

  setPathType(value) {
    this.options.pathType.setPathType(value);
    return this;
  }

  // protocol

  onlyProtocol(protocol) {
    this.options.protocol.onlyProtocol(protocol);
    return this;
  }

  onlyHttp(only = true) {
    this.options.protocol.onlyHttp(only);
    return this;
  }

  onlyHttps(only = true) {
    this.options.protocol.onlyHttps(only);
    return this;
  }

  // specificCurrencies

  setSpecificCurrencies(currencies) {
    this.options.specificCurrencies.setSpecificCurrencies(currencies);
    return this;
  }

  onlyUSD() {
    this.options.specificCurrencies.onlyUSD();
    return this;
  }

  onlyEUR() {
    this.options.specificCurrencies.onlyEUR();
    return this;
  }

  onlyGBP() {
    this.options.specificCurrencies.onlyGBP();
    return this;
  }

  onlyGEL() {
    this.options.specificCurrencies.onlyGEL();
    return this;
  }

  //
  // End option methods
  //
  //
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
