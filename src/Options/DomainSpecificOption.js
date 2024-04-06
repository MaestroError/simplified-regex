class DomainSpecificOption {
  constructor() {
    this.allowedDomains = [];
    this.allowedExtensions = [];
  }

  validate(input) {
    if (
      this.allowedDomains.length === 0 &&
      this.allowedExtensions.length === 0
    ) {
      return true; // Pass validation by default if no restrictions are set
    }

    for (const domain of this.allowedDomains) {
      if (new RegExp(`${domain}$`).test(input)) {
        return true;
      }
    }

    for (const extension of this.allowedExtensions) {
      if (new RegExp(`.${extension}$`).test(input)) {
        return true;
      }
    }

    return false;
  }

  setAllowedDomains(domains) {
    if (typeof domains === "string") {
      domains = domains.split(",");
    }
    this.allowedDomains = domains;
    return this;
  }

  setAllowedExtensions(extensions) {
    if (typeof extensions === "string") {
      extensions = extensions.split(",");
    }
    this.allowedExtensions = extensions;
    return this;
  }
}

export default DomainSpecificOption;
