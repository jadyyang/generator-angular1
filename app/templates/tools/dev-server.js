/**
 * dev-server
 * Created by jady on 2016/8/11.
 */

var lancher = require("webpack-server-lancher");
var path = require("path");

var webpackConfig = require("../config/webpack.dev.js");

module.exports = (function() {
    return lancher({
        webpack: webpackConfig,
        mock: path.resolve("../mock")
    });
})();