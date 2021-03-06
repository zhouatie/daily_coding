var webpack = require("webpack")
var path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
console.log(path.join(__dirname, "public/"), 33)
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public',
    publicPath: __dirname + '/public'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    compress: true,
    port: 9000,
    inline: true,
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: './index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
}
