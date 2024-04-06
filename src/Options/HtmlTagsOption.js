class HtmlTagsOption {
  constructor() {
    this.allowedTags = [];
    this.restrictedTags = [];
  }

  validate(input) {
    // Check restricted tags
    for (const tag of this.restrictedTags) {
      if (input.includes(`<${tag}`)) {
        return false;
      }
    }

    // Check allowed tags if specified
    if (this.allowedTags.length > 0) {
      const tagsInInput = [...input.matchAll(/<([a-z]+)[\s>]/gi)].map((match) =>
        match[1].toLowerCase()
      );
      for (const tag of tagsInInput) {
        if (!this.allowedTags.includes(tag)) {
          return false;
        }
      }
    }

    return true;
  }

  allowTags(tags) {
    if (typeof tags === "string") {
      tags = tags.split(",");
    }
    this.allowedTags = tags.map((tag) => tag.trim().toLowerCase());
    return this;
  }

  restrictTags(tags) {
    if (typeof tags === "string") {
      tags = tags.split(",");
    }
    this.restrictedTags = tags.map((tag) => tag.trim().toLowerCase());
    return this;
  }
}

export default HtmlTagsOption;
