const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let baseConfig = require('./webpack.base.config');
const sourcePath = path.join(__dirname, '../src/');

const config = merge(baseConfig, {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({template: sourcePath + 'index.html'})
    ]
});

module.exports = config;