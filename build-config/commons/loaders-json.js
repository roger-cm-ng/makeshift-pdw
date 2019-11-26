module.exports = function exports() {
    return {
        test: /\.json/,
        exclude: /node_modules/,
        loader: 'json-loader'
    };
};
