const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config({ quiet: true });

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const useMocks = !process.env.NEWS_API_KEY || process.env.USE_API_MOCKS === 'true';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig, {
        plugins: [
            new webpack.DefinePlugin({
                __USE_API_MOCKS__: JSON.stringify(useMocks),
                __NEWS_API_KEY__: JSON.stringify(useMocks ? '' : process.env.NEWS_API_KEY),
            }),
        ],
    });
};
