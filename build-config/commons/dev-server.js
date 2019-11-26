const path = require('path');

module.exports = function exports() {
    return {
        contentBase: path.resolve('./public/bundles'),
        compress: true,
        port: process.env.PORT || 5678,
        historyApiFallback: true
    };
};
