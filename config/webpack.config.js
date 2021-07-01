const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const rules = require("./webpack.rules");
module.exports = function(env) {
  console.log(env);
  return {
    entry: "./src/index.js",
    module: {
      rules: rules(env)
    },

    optimization: {
      // We no not want to minimize our code.
      minimize: false
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        SC_DISABLE_SPEEDY: true
      })
    ]
  };
};
