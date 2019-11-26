module.exports = function exports() {
    return {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
    };
};
