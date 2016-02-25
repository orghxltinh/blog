"use strict"
var gulp = require("gulp");
var watch = require("gulp-watch");
var webpack = require("webpack");
var gutil = require("gulp-util");
var inject = require("gulp-inject");
var exec = require("gulp-exec");
var spawn = require('child_process').spawn;
var WebpackDevServer = require("webpack-dev-server");
var jade = require("gulp-jade");
var path = require("path");

let x = 0;

var config = {
  entry: ["jquery","lodash","babel-polyfill",
    "webpack/hot/dev-server",
    "./client/src/js/main.js"
  ],
  output: {
    path: path.resolve(__dirname, "/client/dist/js"),
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
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  proxy: {
    '/api*': {
      target: 'http://0.0.0.0:3000/api',
      secure: false,
    }
  }
  // watch: true
};

gulp.task("test", ( req, res) => {
  process.env.NODE_ENV = "development";

})

gulp.task("serve", (req,res) => {

  var compiler = webpack(config);
  process.env.NODE_ENV = "development";

  new WebpackDevServer(compiler, {
      noInfo: true,
      contentBase: path.resolve(__dirname, "client"),
      publicPath: config.output.publicPath,
      host: 'localhost',
      port: 8080,
      hot: true,
      historyApiFallback: {
        index: 'index.html'
      },
      proxy: {
        "/api/*": "http://0.0.0.0:3000/"
      }
      // watchDelay: 300
  }).listen(8080, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log("[webpack-dev-server]", "http://localhost:8080");

      startLoopback();
      //
      // gulp.src("./server/views/home.jade")
      //   .pipe ( jade( {
      //     pretty: true
      //   }))
      //   .pipe( gulp.dest( "./dist/" ) )
      // keep the server alive or continue?
      // callback();
  });


})

gulp.task("production", ( req, res) => {
  process.env.NODE_ENV = "production";
  injectDevelopmentJavascript( () => {
    console.log( "========== running server ==========" );
    startLoopback();
  });

  transpile( config, () => {
    console.log("========== initial transpile es6 to es5 done ==========");
    injectProductionJavascript( () => {
      console.log( "========== running server ==========" );
      startLoopback();
    });
  });

  // watch("./client/src/js/**/*.js", () => {
  //   transpile( config, () => {
  //     console.log(`========== transpile done - ${x += 1} ==========`);
  //   });
  // });

})

function startLoopback(){
  var cmd = spawn('node', ['.'], {stdio: 'inherit'});
}

function injectProductionJavascript(cb){
  let target = gulp.src("./server/views/home-prod.jade");
  let sources = gulp.src([ "./dist/js/**/*.js" ], { read: false, cwd: "./client" });

  target.pipe(inject(sources))
    .pipe(gulp.dest("./server/views"))
    .on("end", () => {
      typeof(cb) === "function" && cb();
    });
}

function transpile( config, callback) {
  webpack( config, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
          // output options
      }));
      if( typeof(callback) === "function" ) { callback() };
  });
}
