module.exports = function () {
  return {
  test: /\.svg$/,
	exclude: /node_modules/,
  loader: 'raw-loader'
};
};
