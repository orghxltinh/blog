var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var bodyParser = require('body-parser');

var app = module.exports = loopback();
app.set( 'view engine', 'jade');
app.set( 'views', path.join( __dirname, 'views' ) );
app.use( bodyParser.urlencoded( { extended : true } ) );
app.use( loopback.token() );


console.log('environment:', process.env.NODE_ENV);
app.use( loopback.static( './client' ) );

//
// var config = {
//   entry: ['jquery','lodash','babel-polyfill','./client/src/js/main.js'],
//   output: {
//     //  path: './client/dist/js',
//     path: require('path').resolve('/client/dist/js'),
//     // path: __dirname + '/client/dist/js',
//     filename: 'bundle.js',
//     publicPath: '/static/'
//   },
//   debug: true,
//   devtool: 'source-map',
//   module: {
//     loaders: [
//       {
//         test: /.js?$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         query: {
//           presets: ['es2015', 'react']
//         }
//       }
//     ]
//   },
//   plugins: [
//     new LoopbackBootPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin()
//     // new webpack.optimize.UglifyJsPlugin({minimize: true})
//   ]
// };
//
// compiler = webpack(config);
//
// app.use(webpackDevMiddleware(compiler),{ noInfo: true, publicPath: config.output.publicPath });
// app.use(webpackHotMiddleware(compiler));
//
// app.get('/', (req,res) => {
//   res.render('home')
// })

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
