const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require ('gulp-sass');


//Compile sass & Inject into the browser
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

//Move JS files to src/js
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js','node_module/popper.js/dist/umd/popper.min.js'])
     .pipe(gulp.dest("src/js"))
     .pipe(browserSync.stream());
});

//Watch Sass & Serve
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: "./src"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);

});

//Move font awesome folder to source
gulp.task('fonts', function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
});


//Move font awesome css to source
gulp.task('fa', function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

gulp.task('default',['js','serve','fa','fonts']);
