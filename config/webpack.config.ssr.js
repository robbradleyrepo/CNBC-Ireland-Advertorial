const rules = require("./webpack.rules");
const webpack = require("webpack");

module.exports = function(env) {
  return {
    entry: "./src/ssr.js",
    module: {
      rules: rules(env)
    },
    output: {
      filename: "ssr.js",
      library: "module", //this will define the import
      libraryTarget: "commonjs"
    },
    plugins: [
      new webpack.DefinePlugin({
        SC_DISABLE_SPEEDY: true
      }),
      new webpack.DefinePlugin({
        SC_DISABLE_SPEEDY: true
      })
    ]
  };
};
