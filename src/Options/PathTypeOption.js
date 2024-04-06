class PathTypeOption {
  constructor() {
    this.relativePath = false;
    this.absolutePath = false;
  }

  validate(input) {
    if (this.relativePath) {
      return this.isRelativePath(input);
    }

    if (this.absolutePath) {
      return this.isAbsolutePath(input);
    }

    // Default validation passes if no specific path type is set
    return true;
  }

  build() {
    // Not applicable as validation logic is specific to JavaScript in this case
    return "";
  }

  isRelativePath(path) {
    // Simple check for relative paths (not starting with "/" or a drive letter)
    return !/^(?:\/|[a-zA-Z]:\\)/.test(path);
  }

  isAbsolutePath(path) {
    // Simple check for absolute paths (starting with "/" or a drive letter)
    return /^(?:\/|[a-zA-Z]:\\)/.test(path);
  }

  setPathType(value = 0) {
    if (value === 1 || value === "absolute") {
      this.absolutePath = true;
      this.relativePath = false;
    } else if (value === 2 || value === "relative") {
      this.relativePath = true;
      this.absolutePath = false;
    }
    return this;
  }
}

export default PathTypeOption;
