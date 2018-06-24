const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const sourcePath = path.join(__dirname, '../src/');
const rootPath = path.join(__dirname, '../../static/');
const outPath = path.join(__dirname, '../build');

const config = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        publicPath: "/",
        filename: "js/[name].[chunkhash].js",
        chunkFilename: "js/[name].[chunkhash].chunk.js"
    },

    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: rootPath
        }),
        new HtmlWebpackPlugin({
            template: sourcePath + 'index.html'
        })
    ]
});

module.exports = config;