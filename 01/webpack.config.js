var path = require('path');
var webpack = require('webpack');
// 编译后自动打开浏览器
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
// 产出html模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');


module.exports = {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      contentBase: './public',
      port: 8080,
      stats: { colors: true }
    },
    entry: {
      index: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'src/index.js')
      ],
      vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "[name].js",
        publicPath: '/'
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      // 提高webpack搜索的速度
      alias: { }
    },
    'display-error-details': true,
    module: {
      loaders: [
        {
          test: /\.js[x]?$/,
          loaders: ['react-hot', 'babel'],
          exclude: path.resolve(__dirname, 'node_modules')
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url?limit=8192'
        },
        {
          test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000"
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new HtmlWebpackPlugin({
        title: 'your app title',
        template: './public/index.html',
      }),
      new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
      
    ]
};
