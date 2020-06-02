// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');


// File paths
const files = { 
    scssPath: './sass/*.scss',
    jsPath: './js/*.js'
}

// minifies css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sass().on('error',sass.logError))
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(dest('dist/css')
    ); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.min.js
function jsTask(){
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('script.min.js'))
        .pipe(babel({
            presets:["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(dest('dist/js')
    );
}

// Cachebust
function cacheBustTask(){
    var cbString = new Date().getTime();
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

// Watch task: watch css and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    watch([files.scssPath, files.jsPath],
        {interval: 1000, usePolling: true}, //Makes docker work
        series(
            parallel(scssTask, jsTask),
            cacheBustTask
        )
    );    
}

// Export the default Gulp task so it can be run
// Runs the css and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask), 
    cacheBustTask,
    watchTask
);