const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//only for prod
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (options) => {
  const dotenv = require("dotenv").config({
    path: path.join(__dirname, options.env),
  }).parsed;

  return ({
    mode: "production",
    entry: ["@babel/polyfill", "./src/"],
    devtool: false,
    output: {
      path: path.resolve(__dirname, "../dist/"),
      publicPath: process.env.APP_URL + "/",
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

        //For prod
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: false,
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),

      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv),
      }),

      // Extracts CSS into separate files
      // Note: style-loader is for development, MiniCssExtractPlugin is for production
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].css",
      }),

      new HtmlWebpackPlugin({
        template: "public/index.html",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
        meta: {
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        },
        inject: true,
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  })
};
