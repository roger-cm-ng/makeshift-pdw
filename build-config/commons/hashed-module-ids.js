const webpack = require('webpack');

module.exports = function exports() {
    return new webpack.HashedModuleIdsPlugin();
};
