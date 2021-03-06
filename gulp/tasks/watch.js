'use strict';

/* Notes:
   - this task watches the source files for changes, then fires off the relevant task
   - gulp/tasks/browserSync.js reloads the browser with the compiled files
*/

var gulp = require( 'gulp' );
var config = require( '../config' );

gulp.task( 'watch', [ 'browsersync' ], function() {
  gulp.watch( config.scripts.src, [ 'scripts' ] );
  gulp.watch( config.styles.cwd + '/**/*.less', [ 'styles' ] );
  gulp.watch( config.images.src, [ 'images' ] );
  gulp.watch( config.copy.files.src, [ 'copy:files' ] );
  gulp.watch( config.copy.oldFiles.src, [ 'copy:oldfiles' ] );
} );
