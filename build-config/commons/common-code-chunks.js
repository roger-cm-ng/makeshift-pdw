const webpack = require('webpack');

module.exports = function exports() {
    return [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return module.resource && /node_modules/.test(module.resource);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor'],
            minChunks: Infinity
        })
    ];
};
