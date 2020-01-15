const { override, addLessLoader } = require("customize-cra");

module.exports = override(
    addLessLoader({
    // less loader config
      devServer: {
        proxy: {
          '/api': 'http://localhost:8080/api/spion'
        }
      }
  })
);
