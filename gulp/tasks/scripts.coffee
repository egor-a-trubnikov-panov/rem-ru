gulp = require 'gulp'
plumber = require 'gulp-plumber'
gutil = require 'gulp-util'
gulpif = require 'gulp-if'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
errorHandler = require '../utils/errorHandler'
paths = require '../paths'

gulp.task 'scripts', ->
	gulp.src [
		'node_modules/angular/angular.min.js'
		'node_modules/angular-gridster/dist/angular-gridster.min.js'
		'app/scripts/*.js'
	]
	.pipe plumber errorHandler: errorHandler
	.pipe concat 'app.min.js'
	.pipe gulpif !gutil.env.debug, uglify()
	.pipe gulp.dest paths.scripts
