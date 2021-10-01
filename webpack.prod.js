const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
      rules: [
          {
              test: /\.js$/, 
             
              exclude: [
                /node_modules/,
                /api/,
              ],
              include: /client/,
              use: [
               
                  {
                      loader: 'babel-loader',
                      options: {
                          presets: ['@babel/preset-react']
                      },
                 }
                  
              ]  
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
      ]
  }
};