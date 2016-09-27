/**
 * Created by jady on 2016/6/15.
 */

// 项目配置文件信息
const DOMAIN = 'http://<%=domain%>';

var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

const HOST = "radar.100credit.cn";

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
};

module.exports = {

    entry: {
        index: path.resolve("./src/index.js"),
        common: ["jquery", "angular", "angular-ui-router", "oclazyload"]
    },

    output: {
        path: path.resolve("./dist/r"),
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[name].[chunkhash:8].js",
        publicPath: DOMAIN + "/r/"
    },

    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["common", "manifest"]
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css'),
        new HtmlWebpackPlugin({
            filename: "../index.html",
            template: path.resolve("./src/static-templates/index-prod.html"),
            inject: false
        })
    ],

    module: {
        loaders: [
            // js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader?presets[]=es2015&presets[]=react"
            },

            // 字体
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader?prefix=font/&limit=5000'
            },
            {
                test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
                loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
            },

            // 图片
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: ['file']
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            },

            // css
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
            },

            // html
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },

    resolve: {

        // 模块的解析目录
        modulesDirectories: ['project_modules', 'br_modules', 'node_modules']
    }
    
};