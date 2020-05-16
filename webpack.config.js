// webpack.config.js
module.exports = {
  
  entry: './js/app.js',
  output: {
    // filename: './bundle.js',
    filename: './dist/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './',
  }
};


