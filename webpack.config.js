const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    mainStyles: path.join(__dirname, "src/index.scss"),
    jouer: path.join(__dirname, "./src/jouer/jouer.js"),
    jouerStyles: path.join(__dirname, "./src/jouer/jouer.scss"),
    form: path.join(__dirname, "src/form/form.js"),
    formStyles: path.join(__dirname, "src/form/form.scss"),
    topbar: path.join(__dirname, "src/assets/javascripts/topbar.js"),
    topbarStyles: path.join(__dirname, "src/assets/styles/styles.scss"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/images/dice/*",
          to: "assets/images/dice/[name][ext]",
        },
        {
          from: "./src/assets/images/*",
          to: "assets/images/[name][ext]",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/index.html"),
      chunks: ["main", "topbar", "mainStyles"],
    }),
    new HtmlWebpackPlugin({
      filename: "jouer.html",
      template: path.join(__dirname, "./src/jouer/jouer.html"),
      chunks: ["jouer", "topbar", "jouerStyles"],
    }),
    new HtmlWebpackPlugin({
      filename: "form.html",
      template: path.join(__dirname, "./src/form/form.html"),
      chunks: ["form", "topbar", "formStyles"],
    }),
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: false,
    static: path.resolve(__dirname, "./dist"),
    watchFiles: ["./src/**"],
    port: 4000,
    hot: true,
  },
};
