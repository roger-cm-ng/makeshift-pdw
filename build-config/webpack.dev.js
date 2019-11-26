const path = require('path');
const webpackMerge = require('webpack-merge');
const CommonConfig = require('./webpack.common');
const commons = require('./commons');

const baseUrl = 'http://localhost:3000';

module.exports = webpackMerge(CommonConfig, {
    watch: true,

    output: {
        path: path.resolve('public/bundles'),
        filename: '[name].js',
        publicPath: '/',
        jsonpFunction: 'DUCSChunkJSONPLoader'
    },

    module: {
      rules: [
        commons.loadersStringReplace(/\#BASE_URL\#/ig, baseUrl)
      ]
    }
});
