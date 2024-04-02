// Mixin with builder methods
const builderMethodsMixin = {
  dash() {
    this.add("-");
    return this;
  },
  // More builder methods...
};

export default builderMethodsMixin;
