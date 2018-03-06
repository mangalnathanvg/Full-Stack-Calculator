/** 
 * Importing all packages for task automation.
 * Gulp is used for automating tasks every time server is run.
 * Here gulp-live-server is used as the server which undertakes task automation.
*/

var gulp = require('gulp');
var LiveServer = require('gulp-live-server');

/** 
 * BrowserSync is a package used for website testing. Has not been used much in this application. 
 * Can alternatively be used for setting up proxy servers.
*/
var browserSync =  require('browser-sync');

/**
 * Browserify is a package which helps to bundle multiple interdependent modules into a single module.
 * Reactify is used to transform JSX into corresponding JS.
 */

var browserify = require('browserify');
var reactify = require('reactify');

/** 
 * Vinyl-source-stream is a package used for creating gulp pipelines.
*/
var source =  require('vinyl-source-stream');

/**
 * Gulp task to create and start a server whose defintions are in server/main.js.
 */

gulp.task('live-server',function(){
    var server = new LiveServer('server/main.js');
    server.start();
});

/**
 * Gulp task named bundle uses browserify to first set entry point of bundling as main.jsx.
 * The task is piped consecutively with multiple tasks in the following order.
 *  1) Set bundle entry point as main.jsx
 *  2) Transform JSX into JS
 *  3) Bundle all the transformed file together.
 *  4) Store the above bundle into a separate file called app.js
 *  5) Store app.js in a temporary folder caled .tmp
 */
gulp.task('bundle', function(){
    return browserify({
        entries:'app/main.jsx',
        debug:true,
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.tmp'));
});

/**
 * Gulp Task which creates a alias of the server to run at specified port
 */
gulp.task('serve', ['bundle','live-server'], function(){
    browserSync.init(null,{
        proxy:"http://localhost:7777",
        port:7777
    })
});