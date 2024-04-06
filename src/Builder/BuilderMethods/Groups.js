const Groups = {
  charSet(callback, q = null) {
    const subPattern = new this.constructor();
    subPattern.isInCharSet();
    callback(subPattern);
    let p = "[" + subPattern.pattern + "]";
    this.pattern += q ? this.applyQuantifier(p, q) : p;
    return this;
  },

  negativeCharSet(callback, q = null) {
    const subPattern = new this.constructor();
    subPattern.isInCharSet();
    callback(subPattern);
    let p = "[^" + subPattern.pattern + "]";
    this.pattern += q ? this.applyQuantifier(p, q) : p;
    return this;
  },

  group(callback, q = null) {
    const subPattern = new this.constructor();
    callback(subPattern);
    let p = "(" + subPattern.pattern + ")";
    this.pattern += q ? this.applyQuantifier(p, q) : p;
    return this;
  },

  nonCapturingGroup(callback, q = null) {
    const subPattern = new this.constructor();
    callback(subPattern);
    let p = "(?:" + subPattern.pattern + ")";
    this.pattern += q ? this.applyQuantifier(p, q) : p;
    return this;
  },

  orPattern(callback, q = null) {
    const builder = new this.constructor();
    callback(builder);
    let p = builder.pattern;
    this.pattern +=
      (this.pattern ? "|" : "") + (q ? this.applyQuantifier(p, q) : p);
    return this;
  },

  lookAhead(callback) {
    const builder = new this.constructor();
    callback(builder);
    this.pattern += "(?=" + builder.pattern + ")";
    return this;
  },

  lookBehind(callback) {
    const builder = new this.constructor();
    callback(builder);
    this.pattern += "(?<=" + builder.pattern + ")";
    return this;
  },

  negativeLookAhead(callback) {
    const builder = new this.constructor();
    callback(builder);
    this.pattern += "(?!" + builder.pattern + ")";
    return this;
  },

  negativeLookBehind(callback) {
    const builder = new this.constructor();
    callback(builder);
    this.pattern += "(?<!" + builder.pattern + ")";
    return this;
  },

  addRawRegex(regex) {
    this.pattern += regex;
    return this;
  },

  addRawNonCapturingGroup(regex, q = null) {
    let p = "(?:" + regex + ")";
    this.pattern += q ? this.applyQuantifier(p, q) : p;
    return this;
  },
};

export default Groups;
