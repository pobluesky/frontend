const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
dotenv.config();

module.exports = function () {
    return {
        mode: 'development',
        entry: path.resolve('src/index.js'),
        output: {
            path: path.resolve('public'),
            filename: 'assets/js/main.js',
            assetModuleFilename: 'assets/images/[hash][ext]',
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve('config/babel.config.json'),
                    },
                },
                {
                    test: /\.(c|sa|sc)ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|gif|jpe?g|svg|ico|tiff?|bmp)/i,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env),
            }),
        ],
        devServer: {
            host: '0.0.0.0',
            port: 9090,
            liveReload: true,
            compress: true,
            hot: false,
            historyApiFallback: true,
            proxy: [
                {
                    context: ['/api'],
                    target: 'https://ApiGateWayALB-544361737.ap-northeast-2.elb.amazonaws.com',
                    changeOrigin: true,
                },
            ],
        },
    };
};
