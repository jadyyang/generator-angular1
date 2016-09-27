/**
 * gulpfile
 * Created by jady on 2016/6/20.
 */

var pathUtil = require("path");

var gulp = require("gulp");
var gutil = require("gutil");
var process = require('child_process');
var clean = require("gulp-clean");
var uglify = require("gulp-uglify");
var useref = require("gulp-useref");
var rev = require("gulp-rev");
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var webpack = require("webpack");


// 常用文件路径
var PROJECTROOT = pathUtil.resolve(__dirname, '../').replace(/\\/g, "/") + "/";
var SRC = PROJECTROOT + "src/";
var DIST = PROJECTROOT + "dist/";

/**
 * 重新构建所有的HTML
 */
gulp.task("重建HTML（本机）", function() {
    var task = gulp.src([SRC + "static-templates/index-dev.html"])
        .pipe(rename("index.html"));

    require("../config/paths").forEach(function(path) {
        task = task.pipe(gulp.dest(SRC + "static" + path));
    });
    return task;
});

/**
 * 跟踪index.html的变化
 */
gulp.task("PathsWatcher", ["重建HTML（本机）"], function() {
    var watcher = gulp.watch([SRC + 'static-templates/index-dev.html', PROJECTROOT + "config/paths.js"], ["重建HTML（本机）"]);
    return watcher.on("change", function(event) {
        // 重新获取menus
        delete require.cache[require.resolve('../config/paths')];
        menus = require("../config/paths");

        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

/**
 * 清空由编译生成的文件夹
 */
gulp.task("清空编译文件", function() {
    return gulp.src([DIST], { read: false })
        .pipe(clean());
});

/**
 * 对js进行webpack处理
 */
gulp.task("webpack", ["清空编译文件"], function(next) {
    webpack( require("../config/webpack.dist.js"), function(err) {
        if(err) throw new gutil.PluginError("webpack", err);

        next();
    });
});

/**
 * 从menus中构建html
 */
gulp.task("重建HTML", ["webpack"], function() {
    var task = gulp.src([DIST + "index.html"]);
    require("../config/paths").forEach(function(path) {
        task = task.pipe(gulp.dest(DIST + path));
    });
    return task;
});

/**
 * 把dist目录添加到svn
 */
gulp.task("提交SVN", ["重建HTML"], function(done) {
    // 把dist目录添加到svn
    var addCmd = "TortoiseProc.exe /command:add /path:\"" + DIST + "\" /closeonend:2 /logmsg:\"auto svn add after build by gulp and webpack\" ";
    process.exec(addCmd, function(error, stdout, stderr) {

        // 提交整个代码目录
        var commitCmd = "TortoiseProc.exe /command:commit /path:\"" + PROJECTROOT + "\" /closeonend:2";
        process.exec(commitCmd, function(error, stdout, stderr) {

            // 本任务已经完成
            done(error);
        });
    });
});

/**
 * 默认任务
 */
gulp.task('default', ["提交SVN"]);

