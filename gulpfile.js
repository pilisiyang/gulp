// ���� gulp�����
var gulp=require('gulp'),  //gulp������
    cssmin = require('gulp-clean-css');//ѹ��css
    concat=require('gulp-concat'),   //�ϲ��ļ�
    uglify=require('gulp-uglify'),   //jsѹ��
    rename=require('gulp-rename'),   //�ļ�������
    jshint=require('gulp-jshint'),   //js���
    notify=require('gulp-notify');   //��ʾ

gulp.task('default', function() {
     gulp.start('minifycss','minifyjs');
});

//css����
gulp.task('minifycss',function(){
   return gulp.src('./css/*.css')      //����css
       .pipe(concat('./all.css'))      //�ϲ�css�ļ�
       .pipe(gulp.dest('./dist/css'))           //�������·��
       .pipe(rename({suffix:'.min'}))         //�޸��ļ���
       .pipe(cssmin({
           advanced: false,//���ͣ�Boolean Ĭ�ϣ�true [�Ƿ����߼��Ż����ϲ�ѡ�����ȣ�]
           compatibility: 'ie8',//���ͣ�String Ĭ�ϣ�''or'*' [���ü���ģʽ�� 'ie7'��IE7����ģʽ��'ie8'��IE8����ģʽ��'*'��IE9+����ģʽ]
           keepBreaks: true,//���ͣ�Boolean Ĭ�ϣ�false [�Ƿ�������]
           keepSpecialComments: '*'
           //������������ǰ׺ ������autoprefixer���ɵ������ǰ׺�������������������п��ܽ���ɾ����Ĳ���ǰ׺
       }))                    //ѹ���ļ�
       .pipe(gulp.dest('./dist/css'))            //����ļ�Ŀ¼
       .pipe(notify({message:'css task ok'}));   //��ʾ�ɹ�
});

//JS����
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
   ])  //ѡ��ϲ���JS
       .pipe(concat('./all.js'))   //�ϲ�js
       .pipe(gulp.dest('./dist/js'))         //���
       .pipe(rename({suffix:'.min'}))     //������
       .pipe(uglify({
           ie8:true
       }))                    //ѹ��
       .pipe(gulp.dest('./dist/js'))            //���
       .pipe(notify({message:"js task ok"}));    //��ʾ
});