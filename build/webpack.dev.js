const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common')()

common.mode = 'development'

module.exports = merge(common, {
    devServer: {
        hot: true, // 开启模块热替换
        open: true, // 自动在浏览器打开
        port: 8080, // 端口号
        quiet: true,
        noInfo: true,
        stats: {
            colors: true,
            "errors-only": false,
            cached: true
        },
        contentBase: common.output.path,
    },
    plugins: [
        // css代码单独提取
        new MiniCssExtractPlugin({
            filename: '[name].css', // 合并的文件名
            chunkFilename: '[id].css' // 分块的文件名
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/dist/' // css中引入资源的公共路径
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/dist/' // css中引入资源的公共路径
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
})
