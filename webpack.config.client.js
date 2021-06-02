const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  name: "client",
  entry: {
    client: path.resolve(__dirname, "src/client/index.tsx")
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/static"),
    filename: "[name].[contenthash].js",
    publicPath: ""
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.client.json"
        }
      }
    ]
  },
  plugins: [
      new CleanWebpackPlugin(),
      new WebpackManifestPlugin(),
      new CopyPlugin({
        patterns: [{ context: "src/server", from: "views", to: "views" }],
      })
    ]
};