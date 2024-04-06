class ProtocolOption {
  constructor() {
    this.allowedProtocols = [];
  }

  validate(input) {
    if (this.allowedProtocols.length === 0) {
      return true; // Pass by default if no protocols are specified
    }
    return this.allowedProtocols.some((protocol) =>
      input.startsWith(`${protocol}://`)
    );
  }

  build() {
    // Not used in JS context
    return "";
  }

  onlyProtocol(protocol) {
    if (Array.isArray(protocol)) {
      this.allowedProtocols = protocol;
    } else {
      this.allowedProtocols.push(protocol);
    }
    return this;
  }

  onlyHttp(only = true) {
    if (only) {
      this.allowedProtocols.push("http");
    }
    return this;
  }

  onlyHttps(only = true) {
    if (only) {
      this.allowedProtocols.push("https");
    }
    return this;
  }
}

export default ProtocolOption;
