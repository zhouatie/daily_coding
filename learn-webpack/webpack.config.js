var webpack = require("webpack")
var path = require("path")

module.exports = {
  entry:'./index.js',
  output:{
    filename:'bundle.js',
    path:__dirname+'/public',
    publicPath:__dirname+'/public'
  },
  module:{
    loaders:[
        {
         test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
       },
       {
         test: /\.(js|jsx)$/,
         use:'babel-loader',
         exclude:'/node_modules/'
       }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    compress: true,
    port: 9000,
    inline: true,
    hot: true
  }
}
