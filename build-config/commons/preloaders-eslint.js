module.exports = function exports() {
    return {
        test: /\.(es6|js)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|build-config|public|server)/,
        enforce: 'pre'
    };
};
