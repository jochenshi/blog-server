const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const sourcePath = path.join(__dirname, '../src/');
const rootPath = path.join(__dirname, '../../static/');
const outPath = path.join(__dirname, '../build');

console.log(rootPath);

const config = {
    entry: {
        'main': sourcePath + 'index.js',
        vendor: ['react', 'react-dom']
    },

    output: {
        path: outPath,
        filename: "js/[name].[chunkhash].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader"
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: rootPath
        }),
        new HtmlWebpackPlugin({template: sourcePath + 'index.html'})
    ]
};

module.exports = config;