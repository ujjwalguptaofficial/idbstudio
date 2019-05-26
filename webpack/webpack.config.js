const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
console.log("webpack build runing for environment", process.env.NODE_ENV);
const outputFolder = isDev ? "build" : "dist";
module.exports = {
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        }
    },
    name: "idbstudio",
    entry: ["./src/index.ts"],
    devtool: isDev ? 'source-map' : false,
    output: {
        path: path.join(__dirname, `../${outputFolder}`),
        publicPath: '/',
        filename: isDev ? "scripts/bundle.js" : "scripts/bundle.[contenthash].js"
    },
    mode: isDev ? 'development' : 'production',
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'client/images',
                },
            }]
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },

        {
            test: /\.css$/,
            use: [
                isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                { loader: 'css-loader' },
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    // global data for all components
                    // this can be read from a scss file
                }
            ]
        },
        {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            use: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: 'url-loader?limit=10000&name=fonts/[name][hash].[ext]&mimetype=application/octet-stream'
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: 'file-loader'
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue']
    },
    plugins: [

        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // cache: true,
            // hash: true,
            template: './src/index.html',
            minify: {
                collapseWhitespace: !isDev,
                removeComments: !isDev,
                removeRedundantAttributes: !isDev,
                removeScriptTypeAttributes: !isDev,
                removeStyleLinkTypeAttributes: !isDev
            }
        }),
        new CopyPlugin([{
            from: './src/assets/',
            to: 'assets/'
        }]),
        new MiniCssExtractPlugin({
            filename: 'styles/style.css',
            // chunkFilename: '[id].css',
        }),
    ],
    optimization: {
        // runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
        })],
    }
};