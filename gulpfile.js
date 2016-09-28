// including plugins
var gulp = require('gulp');
var Server = require('karma').Server;
// task
gulp.task('default', function () {
   console.log("gulping")
});



/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/test/karma/karma.conf.js',
        singleRun: true
    }, done).start();
});