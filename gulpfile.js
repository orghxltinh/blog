"use strict"
var gulp = require("gulp");
var watch = require("gulp-watch");
var webpack = require("webpack");
var gutil = require("gulp-util");
var inject = require("gulp-inject");
var exec = require("gulp-exec");
var spawn = require('child_process').spawn;
var WebpackDevServer = require("webpack-dev-server");
var browserSync = require("browser-sync").create();
var history = require('connect-history-api-fallback');
var jade = require("gulp-jade");
var path = require("path");
var devConfig = require("./webpack.config.dev");
var prodConfig = require("./webpack.config.prod");

var config = {
  port: 7000
}

config.prod = prodConfig;

let x = 0;

gulp.task("test", () => {
  console.log("this is port:",config.dev);
})

gulp.task("serve", (req,res) => {
  const env = "development";
  process.env.NODE_ENV = env;
  const _devConfig = devConfig(config.port, env);

  var compiler = webpack(_devConfig);

  new WebpackDevServer(compiler, {
      noInfo: true,
      contentBase: "./src",
      publicPath: _devConfig.output.publicPath,
      host: 'localhost',
      port: config.port,
      historyApiFallback: true,
      proxy: {
        "/api/*": "http://0.0.0.0:3000/"
      }
      // watchDelay: 300
  }).listen(config.port, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log("[webpack-dev-server]", `http://localhost:${config.port}`);

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

gulp.task( "prodTranspile", ( cb) => {
  webpack( config.prod, ( err, stat) => {
    if(err) throw new gutil.PluginError("webpack", err);
    process.env.NODE_ENV = "production";
    startLoopback();
    browserSync.init({
      server: {
        baseDir: "./client",
        middleware: [ history() ]
      },
      port: 3333
    })
    return cb();
  });
});

gulp.task("copyLib", done => {
  gulp.src(["src/lib/**/*"]).pipe(gulp.dest("client/lib"))
  done();
})

gulp.task("production",gulp.parallel("copyLib","prodTranspile"));

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
