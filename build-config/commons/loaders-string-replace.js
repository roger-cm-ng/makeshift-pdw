const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = function (regExp, replacement) {
  return {
    test: /\.(scss|js)$/,
    exclude: /node_modules/,
    loader: StringReplacePlugin.replace({
      replacements: [
        {
          pattern: regExp,
          replacement() {
            return replacement;
          }
        }
      ]
    })
  };
};
