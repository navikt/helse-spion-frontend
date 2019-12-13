const { override, addLessLoader } = require("customize-cra");

module.exports = override(
  addLessLoader({
    // less loader config
  })
);
