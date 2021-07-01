const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const config = require("../package.json").cnbc;

module.exports = function(env) {
  return [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "string-replace-loader",
          options: {
            search: /http:\/\/localhost:8080\//g,
            replace: `${config.env[env.enviroment].aws_root}/${
              config.projectName
            }/`
          }
        },
        {
          loader: "babel-loader"
        }
      ]
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
        {
          loader: "string-replace-loader",
          options: {
            search: /http:\/\/localhost:8080\//g,
            replace: `${config.env[env.enviroment].aws_root}/${
              config.projectName
            }/`
          }
        },
        // Compiles Sass to CSS
        {
          loader: "sass-loader",
          options: { sassOptions: { includePath: ["node_modules/"] } }
        }
      ]
    }
  ];
};
