// 引入 gulp及组件
var gulp=require('gulp'),  //gulp基础库
    cssmin = require('gulp-clean-css');//压缩css
    concat=require('gulp-concat'),   //合并文件
    uglify=require('gulp-uglify'),   //js压缩
    rename=require('gulp-rename'),   //文件重命名
    jshint=require('gulp-jshint'),   //js检查
    notify=require('gulp-notify');   //提示

gulp.task('default', function() {
     gulp.start('minifycss','minifyjs');
});

//css处理
gulp.task('minifycss',function(){
   return gulp.src('./css/*.css')      //设置css
       .pipe(concat('./all.css'))      //合并css文件
       .pipe(gulp.dest('./dist/css'))           //设置输出路径
       .pipe(rename({suffix:'.min'}))         //修改文件名
       .pipe(cssmin({
           advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
           compatibility: 'ie8',//类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
           keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
           keepSpecialComments: '*'
           //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
       }))                    //压缩文件
       .pipe(gulp.dest('./dist/css'))            //输出文件目录
       .pipe(notify({message:'css task ok'}));   //提示成功
});

//JS处理
gulp.task('minifyjs',function(){
   return gulp.src([
       './js/jquery.js',
       './js/jquery.form.js',
       './js/jquery.easyui.min.js',
       './js/easyui-lang-zh_CN.js',
       './js/cos.js',
       './js/bootstrap.min.js',
       './js/bootstrap-table.js',
       './js/bootstrapValidator.min.js',
       './js/respond.min.js',
   ])  //选择合并的JS
       .pipe(concat('./all.js'))   //合并js
       .pipe(gulp.dest('./dist/js'))         //输出
       .pipe(rename({suffix:'.min'}))     //重命名
       .pipe(uglify({
           ie8:true
       }))                    //压缩
       .pipe(gulp.dest('./dist/js'))            //输出
       .pipe(notify({message:"js task ok"}));    //提示
});