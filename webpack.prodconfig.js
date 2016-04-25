var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    "babel-polyfill",
    "./src/js/index.js"
  ],
  output: {
    path: "dist",
    filename: "bundle.min.js"
  },
  debug: true,
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: [ "style", "css?sourceMap", "sass?sourceMap" ]
      },
      {
        test: /\.css$/,
        loaders: [ "style", "css?sourceMap" ]
      },
      {
        test: /.(jpg|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.tpl$/,
        loader: 'html'
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( { minimize: true} ),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      moment: "moment",
      "window.moment": "moment"
    }),
    new HtmlWebpackPlugin({
    title: 'Angular ES6',
    template: './template/index.html', // Load a custom template
    inject: 'body' // Inject all scripts into the body
  })
  ]
};
