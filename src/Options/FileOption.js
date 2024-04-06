class FileOption {
  constructor() {
    this.isFileFlag = false;
    this.isDirectoryFlag = false;
    this.fileExtension = null;
  }

  validate(input) {
    if (this.isFileFlag) {
      if (this.fileExtension) {
        return new RegExp("." + this.fileExtension + "$").test(input);
      } else {
        return /\.[a-zA-Z0-9]+$/.test(input);
      }
    }

    if (this.isDirectoryFlag) {
      return /\/$/.test(input);
    }

    // Default pass if no specific file or directory check is set
    return true;
  }

  build() {
    if (this.isFileFlag) {
      if (this.fileExtension) {
        return `[A-Za-z0-9/:\.\-\\\\]*\.${this.fileExtension}`;
      } else {
        return "[A-Za-z0-9/:.-\\\\]*.[a-zA-Z0-9]+";
      }
    }

    if (this.isDirectoryFlag) {
      return "(?:[a-zA-Z0-9/:-\\\\]+)+";
    }

    return ".*";
  }

  isFile(extension = null) {
    this.isFileFlag = true;
    this.fileExtension = extension;
    return this;
  }

  isDirectory(check = true) {
    this.isDirectoryFlag = check;
    return this;
  }
}

export default FileOption;
