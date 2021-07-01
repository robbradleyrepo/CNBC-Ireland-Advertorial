const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Translates CSS into CommonJS

          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({ overrideBrowserslist: ["last 12 versions"] })
              ]
            }
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: { sassOptions: { includePath: ["node_modules/"] } }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./public/",
    compress: true,
    port: 8080,
    overlay: true
  },
  // externals: {
  //   gsap: "TweenMax" // Case matters here
  // },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin()
  ]
};
