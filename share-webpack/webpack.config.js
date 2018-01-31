var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    devtool: 'eval-source-map',
    entry: "./app/index.js", // 入口文件
    output: {
        filename: "bundle.js",   //filename 用于输出文件的文件名。
        path: path.resolve(__dirname, './public')   //目标输出目录 path 的绝对路径。__dirname
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新（为什么这个我不加都能热更新,黑人问号脸？？？）
        port: 8888, // 想webpack-dev-server在端口8888启动
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname , './app/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;