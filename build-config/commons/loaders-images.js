module.exports = function () {
    return {
        test: /\.(gif|png|jpe?g)$/i,
        exclude: /node_modules/,
        loaders: [
            {
                loader: 'file-loader',
                options: {
                    name: '[hash].[ext]',
                    outputPath: 'assets/images/',
                    publicPath: process.env.ASSET_CDN_PATH
                        ? process.env.ASSET_CDN_PATH
                        : '/'
                }
            }
        ]
    };
};
