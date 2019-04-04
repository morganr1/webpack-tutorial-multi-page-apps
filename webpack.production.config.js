const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'hello-world': './src/hello-world.js',
        'ned-image': './src/ned.js',
    },
    output: {
        filename: '[name].[contenthash].js', //will take the entry property and place it here (both)
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    mode: 'production',
    // common dependencies
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 9000, //override the threshhold (30kb) for webpack to bundle common dependencies (react in this case);
            automaticNameDelimiter: '_'
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'stage-0' ]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css' //instead of bundle we will use entry properties (top)
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'hello-world.html',
            chunks: ['hello-world', 'vendors~hello-world~ned-image'], //can create multiple
            title: 'Hello world',
            template: 'src/page-template.hbs',
            description: 'Hello World'
        }),
        new HtmlWebpackPlugin({
            filename: 'ned-image.html',
            chunks: ['ned-image', 'vendors~hello-world~ned-image'], //matches entry point properties
            title: 'Ned Image',
            template: 'src/page-template.hbs',
            description: 'Ned Image'
        })
    ]
};
