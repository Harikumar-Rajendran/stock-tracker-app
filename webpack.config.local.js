const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (options) => {
  const dotenv = require("dotenv").config({
    path: path.join(__dirname, options.env),
  }).parsed;

  const PORT = 3000;
  return ({
    mode: "development",
    entry: ["@babel/polyfill", "./src/"],
    devtool: "inline-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "../public/"),
      historyApiFallback: true,
      open: true,
      hot: true,
      port: PORT,
    },
    output: {
      path: path.resolve(__dirname, "../dist/"),
      publicPath:  "/",
      filename: "app/[name].bundle.js",
      chunkFilename: 'app/[id].chunk.js'
    },
    target: "web",
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(js|jsx|mjs)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.eot(\?v=\d+.\d+.\d+)?$/,
          use: ["file-loader"],
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                mimetype: "application/font-woff",
              },
            },
          ],
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                mimetype: "application/octet-stream",
              },
            },
          ],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
                mimetype: "image/svg+xml",
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|ico)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
          ],
        },

        //For Dev/local
        //Styles: Inject CSS into the head with source maps
        {
          test: /\.(scss|css)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: true, importLoaders: 1 },
            },
            { loader: "postcss-loader", options: { sourceMap: true } },
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      
      //only for local
      //new webpack.HotModuleReplacementPlugin(),

      // new CopyWebpackPlugin({
      //   patterns: [{ from: "public/json", to: "json" }],
      // }),

      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv),
      }),

      new HtmlWebpackPlugin({
        template: "public/index.html",
        // minify: {
        //   removeComments: true,
        //   collapseWhitespace: true,
        // },
        meta: {
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        },
        inject: true,
      }),
    ],
  })
};
