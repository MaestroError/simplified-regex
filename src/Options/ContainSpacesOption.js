class ContainSpacesOption {
  constructor() {
    this.allowSpaces = true;
    this.noDoubleSpaces = false;
    this.maxSpaces = null;
  }

  validate(input) {
    if (!this.allowSpaces && input.includes(" ")) {
      return false;
    }

    if (this.noDoubleSpaces && /\s{2,}/.test(input)) {
      return false;
    }

    if (
      this.maxSpaces !== null &&
      (input.match(/ /g) || []).length > this.maxSpaces
    ) {
      return false;
    }

    return true;
  }

  noSpaces(disallow = true) {
    this.allowSpaces = !disallow;
    return this;
  }

  setNoDoubleSpaces(disallow = true) {
    this.noDoubleSpaces = disallow;
    return this;
  }

  setMaxSpaces(max) {
    this.maxSpaces = max;
    return this;
  }
}

export default ContainSpacesOption;
