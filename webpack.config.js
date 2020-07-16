const path = require('path');

module.exports = {
    entry: './src-js/index.js',
    output: {
	filename: 'event.js',
	path: path.resolve(__dirname, 'static/js-gen'),
    },
    module: {
	rules: [
	    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
	]
    }
};
