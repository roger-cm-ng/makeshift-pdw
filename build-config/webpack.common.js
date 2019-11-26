const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const commons = require('./commons');


module.exports = {
    resolve: commons.resolve(),

    context: commons.context(),
    devtool: 'source-map',
    entry: commons.entry(),

    plugins: [
        commons.providePlugin(),
        new ProgressBarPlugin(),
        commons.stylelintPlugin(),
        commons.hashedModuleIds(),
        ...commons.commonCodeChunksPlugin(),
        new CopyPlugin([{ from: 'assets/vmsg.wasm', to: '../' }])
    ],

    devServer: commons.devServer(),

    module: {
        rules: [
            commons.preloadersEslint(),
            commons.loadersBabel(),
            commons.loadersStyle(),
            commons.loadersImages(),
            commons.loadersJson(),
            commons.loadersSvg()
        ]
    }
};
