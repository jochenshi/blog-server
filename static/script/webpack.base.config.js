const path = require('path');
const ExtractCssPlugin = require('mini-css-extract-plugin');


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
        filename: "js/[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.styl$/,
                use: [
                    ExtractCssPlugin.loader,
                    'css-loader?-autoprefixer',
                    'stylus-loader'
                ],
            },
            {
                test: /\.css$/,
                use: [
                    ExtractCssPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractCssPlugin('style.css')
    ]
};

module.exports = config;