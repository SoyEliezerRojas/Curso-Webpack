const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename:'assets/images/[hash][ext][query]',
    },
    resolve: {
        extensions: ['.js'],
        alias:{
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
        }
    },
    
    module: {
        rules: [
            {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.m?js$/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
                loader: "babel-loader"
            },
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/
            },
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader,
                     'css-loader',
                     'sass-loader'
                ]
            },
            {
                test:/\.png/,
                type:'asset/resource',
            },
            {
                test: /\.(woff|woff2)/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit: 10000,
                        mimetype: "aplication/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    }
                }
            },
            
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css',
        }),
        new CopyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname,"src","assets/images"),
                    to: 'assets/images'
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    }
        
}