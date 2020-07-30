const path = require('path');

module.exports = {
    entry: {
        app: './src-js/scheduler.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'static/js-gen'),
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/i, loader: ['style-loader', 'css-loader']},
        ]
    },
    mode: "development"
};
