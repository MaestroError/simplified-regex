import RegexBuilder from "./RegexBuilder.js";
import builderMethodsMixin from "./Builder/builderMethodsMixin.js";

function applyMixin(targetClass, mixin) {
  Object.assign(targetClass.prototype, mixin);
}

applyMixin(RegexBuilder, builderMethodsMixin);

export { RegexBuilder };
