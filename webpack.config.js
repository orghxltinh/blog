var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: [
    "babel-polyfill",
    "webpack/hot/dev-server",
    "./src/js/main.js"
  ],
  output: {
    path: path.resolve(__dirname, "/client/js"),
    filename: "bundle.js",
    publicPath: "/assets/"
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
          presets: [ 'react', 'es2015' ]
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
        test: /.(gif|jpg|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.tpl$/,
        loader: 'html'
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      moment: "moment",
      "window.moment": "moment"
    })
  ]
};
