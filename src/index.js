import RegexBuilder from "./RegexBuilder.js";
import builderMethodsMixin from "./Builder/builderMethodsMixin.js";
import patternsMixin from "./patternsMixin.js";

function applyMixin(targetClass, mixin) {
  Object.assign(targetClass.prototype, mixin);
}

applyMixin(RegexBuilder, builderMethodsMixin);
applyMixin(RegexBuilder, patternsMixin);

export { RegexBuilder };
