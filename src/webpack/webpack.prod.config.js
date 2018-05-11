const path = require('path');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');

module.exports = [
    merge(baseConfig[0], {
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "../../dist"),
            publicPath: '',
            filename: "scripts/bundle.[hash].js"
        },
        mode: 'production'
    })
]