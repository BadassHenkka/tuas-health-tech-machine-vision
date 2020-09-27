const path = require('path');

module.exports = {
  entry: [path.resolve(__dirname, 'machinevision/frontend/src/index.js')],
  output: {
    // where compiled files go
    path: path.resolve(__dirname, 'machinevision/frontend/static/frontend/'),

    // 127.0.0.1/static/frontend/ where files are served from
    publicPath: '/static/frontend/',
    filename: 'main.js', // the same one we import in index.html
  },
  module: {
    // configuration regarding modules
    rules: [
      {
        // regex test for js and jsx files
        test: /\.(js|jsx|mjs)?$/,
        // don't look in any node_modules/
        // NOTE FOR MAKING PRODUCTION BUILD!!!
        // if issues come up when building for production
        // check if babel runtime regenerator needs to be whitelisted
        // https://stackoverflow.com/a/49939402
        exclude: /node_modules/,
        // for matching files, use the babel-loader
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/env', '@babel/preset-react'] },
        },
      },
    ],
  },
  devServer: {
    writeToDisk: true,
  },
};
