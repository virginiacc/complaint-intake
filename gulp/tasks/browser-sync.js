'use strict';

var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var browserSync = require( 'browser-sync' );

gulp.task( 'browsersync', function() {
  var port = '3000';
  browserSync.init( {
    proxy: 'localhost:' + port + '/dist'
  } );
} );
