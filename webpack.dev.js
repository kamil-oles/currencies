const ANALYZER = require('webpack-bundle-analyzer'),
  CIRCULAR_DEPENDENCY_PLUGIN = require('circular-dependency-plugin'),
  COMMON = require('./webpack.common'),
  MERGE = require('webpack-merge'),
  WEBPACK = require('webpack');

const BUNDLE_ANALYSIS = {
  analyzer: new ANALYZER.BundleAnalyzerPlugin({ openAnalyzer: true })
};

const CIRCULAR_DEPENDENCY = new CIRCULAR_DEPENDENCY_PLUGIN({ exclude: /node_modules/, });

const HMR = new WEBPACK.HotModuleReplacementPlugin();

const STYLE = {
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
};

const DEV_CONFIG = MERGE(COMMON, {
  mode: 'development',
  output: { filename: 'app/[name].js' },
  module: { rules: [STYLE] },
  plugins: [
    BUNDLE_ANALYSIS.analyzer,
    CIRCULAR_DEPENDENCY,
    HMR
  ],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true
  }
});

module.exports = DEV_CONFIG;