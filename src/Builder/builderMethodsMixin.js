// Import methods
import SpecificChars from "./BuilderMethods/SpecificChars";
import CharacterClasses from "./BuilderMethods/CharacterClasses";
import Groups from "./BuilderMethods/Groups";
import Anchors from "./BuilderMethods/Anchors";

// Mixin with builder methods
const builderMethodsMixin = {
  ...Anchors,
  ...Groups,
  ...CharacterClasses,
  ...SpecificChars,
};

export default builderMethodsMixin;
