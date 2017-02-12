var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin  = require('clean-webpack-plugin');

var config = {

  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
      //publicPath: '../build/',
      // chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: [/node_modules/, /libs/],
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-2']
        }
      },
      {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
      },
      {
      test: /\.(png|jpe?g|gif)$/,
      loader: 'url?limit=8192&name=img/[hash:8].[ext]'
    }]
  },
  devServer: {
			// enble history api fallback to HTML5 History
			// API based
			// routing works.This is a good defualt that wil
			// come in handy in more complicated setups
			// historyApiFallback: true,
			// display onlu errors to reduce the amount of output
			stats: 'errors-only',
			host: '127.0.0.1',
			port: 9000
		},
  plugins: [
    new CleanWebpackPlugin(['build'],{
      root:process.cwd()
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     // Don't beautify output (enable for neater output)
    //     beautify: false,
    //
    //     // Eliminate comments
    //     comments: false,
    //
    //     // Compression specific options
    //     compress: {
    //
    //       warnings: false,
    //
    //       // Drop `console` statements
    //       // drop_console: true
    //     },
    //
    //     // Mangling specific options
    //     mangle: {
    //       // Don't mangle $
    //       except: ['$'],
    //
    //       // Don't care about IE8
    //       screw_ie8 : true,
    //
    //       // Don't mangle function names
    //       keep_fnames: true
    //      }
    //   }),
		new HtmlWebpackPlugin({
      title: "ascii",
      template: path.join(__dirname, 'index.html')
    })
]};

module.exports = config;
