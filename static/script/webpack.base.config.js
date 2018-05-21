const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


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
                loader: new ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?-autoprefixer', 'stylus-loader']
                })
            },
            {
                test: /\.css$/,
                loader: new ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
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
        new ExtractTextPlugin('style.css')
    ]
};

module.exports = config;