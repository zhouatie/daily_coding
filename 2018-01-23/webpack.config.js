module.exports = {
  entry:'./index.js',
  output:{
    filename:'bundle.js',
    path:__dirname+'/build'
  },
  module:{
    rules:[
      {
        test:"/.css$/",
        use:"css-loader"
      }
    ]
  }
}
