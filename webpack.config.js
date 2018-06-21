var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/components');
var DIST_DIR = path.join(__dirname, '/client/dist');


module.exports = {
  entry: `${SRC_DIR}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        exclude: /node_modules/,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
                {
                    loader: 'url-loader'
                },
            ]
      }
    ]
  }
};
