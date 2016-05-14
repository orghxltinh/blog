var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');


module.exports = {
  cache: true,
  debug: true,
  devtool: 'source-map',
  // entry: [
  //   'babel-polyfill',
  //   './src/js/index.js'
  // ],

  entry: {
    main: './src/js/main.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'babel-polyfill',
      'react-redux',
      'redux'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./client'),
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: [ 'react', 'es2015' ] } },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /.(gif|jpg|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader' },
      { test: /\.tpl$/, loader: 'html' },
      { test: /\.jade$/, loader: 'jade' }
    ]
  },

  sassLoader: {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__apiHostName__': JSON.stringify('https://tinhha-blog.herokuapp.com:8080'),
      '__apiPort__': JSON.stringify(80)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        screw_ie8: true,
        unused: true,
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({

      hash: true,
      inject: 'body',
      template: './template/index.html' // Load a custom template
    })
  ],

  stats: {
    cached: true,
    cachedAssets: true,
    chunks: true,
    chunkModules: false,
    colors: true,
    hash: false,
    reasons: true,
    timings: true,
    version: false
  }
};
