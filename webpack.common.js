const COPY_WEBPACK_PLUGIN = require('copy-webpack-plugin'),
  HTML_WEBPACK_PLUGIN = require('html-webpack-plugin'),
  PATH = require('path'),
  SCRIPT_EXT_HTML_WEBPACK_PLUGIN = require('script-ext-html-webpack-plugin');

const DIST = PATH.join(__dirname, '/public'),
  ROOT = PATH.join(__dirname, '/src');

const PATHS = {
  app: PATH.join(ROOT, '/app/app.module.js'),
  index: PATH.join(ROOT, '/index.html')
};

const FAVICON_COPY = new COPY_WEBPACK_PLUGIN([{ from: './src/assets/icons/favicon.ico' }]);

const FONTS = {
  test: /\.(eot|woff2|woff|ttf)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/fonts',
      publicPath: '../assets/fonts'
    }
  }]
};

const INDEX = new HTML_WEBPACK_PLUGIN({
  inject: 'head',
  meta: { viewport: 'width=device-width, initial-scale=1.0' },
  template: PATHS.index
});

const SCRIPTS = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    { loader: 'babel-loader' },
    {
      loader: 'eslint-loader',
      options: { failOnError: true }
    }
  ]
};

const SCRIPT_TAGS = new SCRIPT_EXT_HTML_WEBPACK_PLUGIN({ defaultAttribute: 'defer' });

const TEMPLATES = {
  test: /\.html$/,
  exclude: /index\.html/,
  use: [{ loader: 'html-loader' }]
};

const COMMON_CONFIG = {
  entry: PATHS.app,
  output: { path: DIST },
  module: {
    rules: [
      FONTS,
      SCRIPTS,
      TEMPLATES
    ]
  },
  plugins: [
    FAVICON_COPY,
    INDEX,
    SCRIPT_TAGS
  ],
};

module.exports = COMMON_CONFIG;