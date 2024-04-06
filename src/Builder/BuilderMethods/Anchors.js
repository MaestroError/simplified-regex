const Anchors = {
  wordBoundary() {
    this.pattern += "\\b";
    return this;
  },

  wordBorder() {
    return this.wordBoundary(); // Leverage the `wordBoundary` method for consistency
  },

  asWord() {
    // Encapsulates the existing pattern within word boundaries to match a complete word
    this.pattern = "\\b" + this.pattern + "\\b";
    return this;
  },
};

export default Anchors;