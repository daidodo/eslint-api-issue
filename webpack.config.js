const path = require("path");

module.exports = {
  mode: "development",
  target: "node",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "eslint_config.js",
  },
};
