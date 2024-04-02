class RegexBuilder {
  constructor() {
    this.pattern = "";
  }

  add(text) {
    this.pattern += text;
    return this;
  }

  build() {
    return new RegExp(this.pattern);
  }
}

export default RegexBuilder;
