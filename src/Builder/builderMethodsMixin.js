// Import methods
import SpecificChars from "./BuilderMethods/SpecificChars.js";
import CharacterClasses from "./BuilderMethods/CharacterClasses.js";
import Groups from "./BuilderMethods/Groups.js";
import Anchors from "./BuilderMethods/Anchors.js";

// Mixin with builder methods
const builderMethodsMixin = {
  ...Anchors,
  ...Groups,
  ...CharacterClasses,
  ...SpecificChars,
};

export default builderMethodsMixin;
