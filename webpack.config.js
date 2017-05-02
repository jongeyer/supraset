var webpack = require('webpack');
var path = require("path");

module.exports = {
  devServer: {
		overlay: {
			errors: true,
			warnings: true
		}
	},

  entry: './src/supra.js',
  // Where should the compiled file go?
  output: {
    path: path.join(__dirname, "js"),
    publicPath: 'dist/',
    // With the filename `build.js` so it's dist/build.js
    filename: 'build.js'
  },
  resolve: {
    alias: {
      // 'jQuery': 'jquery'
    }
  },
  module: {
    // Special compilation rules

    rules: [
      {
        test: /\.css/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|eot|ttf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[path][name].[hash].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        // d3: 'd3',
        '$.bxSlider': 'bxslider'
    })
  ]
}
