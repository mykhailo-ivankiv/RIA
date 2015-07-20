const ELEMENT_SEPARATOR = "__",
      MODIFIER_SEPARATOR = "--";

function getBEMPAth(blockData) {
  var base = typeof (blockData.e) === "string"
              ? blockData.b + ELEMENT_SEPARATOR + blockData.e
              : blockData.b;

  return base + " " + blockData.m.map(modifier => base + MODIFIER_SEPARATOR + modifier).join(" ");
}

var BEM = {
  b(b) {
    return (elementName, modifiers = {}) => {
      let e, m;

      if (typeof elementName === "string") {
        e = elementName;
      } else {
        modifiers = elementName || {};
      }

      m = Object.keys(modifiers).filter((modifier) => modifiers[modifier]) || [];

      return getBEMPAth({b, e, m});
    };
  },

  bR (b) {
    var b = this.b(b);
    return (elementName, modifiers = {}) => {
      return { className: b(elementName, modifiers) };
    };
  }
};

export default BEM;