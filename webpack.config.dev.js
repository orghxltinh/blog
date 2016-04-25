var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var environment = require('./environment.json');

module.exports = (port, envChar) => {
  const env = environment[envChar];

  return {
    cache: true,
    debug: true,
    devtool: 'cheap-module-eval-source-map',

    entry: {
      main: [
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server',
        "babel-polyfill",
        "./src/js/main.js"
      ]
    },

    output: {
      path: path.resolve(__dirname, "/client/js"),
      filename: "bundle.js",
      publicPath: "/assets/"
    },

    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules'],
      root: path.resolve('./src')
    },

    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: [ 'react', 'es2015' ] } },
        { test: /\.html$/, loader: 'raw' },
        { test: /\.scss$/, loaders: [ "style", "css?sourceMap", "sass?sourceMap" ]},
        { test: /\.css$/, loaders: [ "style", "css?sourceMap" ] },
        { test: /.(gif|jpg|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader' },
        { test: /\.tpl$/, loader: 'html' }
      ]
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        '__apiHostName__': JSON.stringify( env.api.host ),
        '__apiPort__': JSON.stringify( env.api.port )
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        moment: "moment",
        "window.moment": "moment"
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
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
  }
}

// module.exports = {
