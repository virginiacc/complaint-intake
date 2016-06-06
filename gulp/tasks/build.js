'use strict';

var gulp = require( 'gulp' );

gulp.task( 'build',
  [
    'clean',
    'styles',
    'scripts',
    'images',
    'copy'
  ]
);
