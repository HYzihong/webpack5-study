/*
 * @Author: your name
 * @Date: 2021-06-11 16:33:12
 * @LastEditTime: 2021-08-15 16:42:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack5/config/webpack.production.js
 */
/*
 * @Author: your name
 * @Date: 2021-06-10 15:33:48
 * @LastEditTime: 2021-06-15 11:06:51
 * @LastEditors: Please set LastEditors
 * @Description: 生产环境的配置文件
 * @FilePath: /webpack5/webpack.production.js
 */
const path = require('path')
// 和OptimizeCssPlugin一样的功能,但更准确的源映射和资产使用查询字符串，允许缓存和工作在并行模式。
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 因为css和js可以并行加载，所以我们可以把css提取成单独的文件并去掉无用的css并压缩
// 抽离css为单独文件
const MiniCssExtractPlugin =  require('mini-css-extract-plugin');
// 导入样式压缩
let OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
// 单独提取css并清除无用的css
const glob = require('glob')
const PATHS = {
  src:path.resolve(__dirname,'../src')
}
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
// 压缩js
// const UglifyjsPlugin =  require('uglifyjs-webpack-plugin');
// 优化和压缩js
const TerserPlugin = require('terser-webpack-plugin')
// 暂且不知道怎么使用  webpack v5 TerserPlugin
// https://webpack.js.org/plugins/terser-webpack-plugin/
// If you are using webpack v5 or above you do not need to install this plugin. Webpack v5 comes with the latest terser-webpack-plugin out of the box. Using Webpack v4, you have to install terser-webpack-plugin v4.
// const TerserPlugin = require(`${process.cwd()}/node_modules/terser-webpack-plugin`);
const ImageLoader = require('image-webpack-loader')
const webpack = require('webpack')
// console.log('webpack env ==>',process.env.NODE_ENV);// undefined 
// const NODE_ENV = process.env.NODE_ENV//获取不到
// const NODE_ENV =require(path.resolve(__dirname,'../.env'))
// console.log(NODE_ENV);
// 复制文件
const CopyPlugin = require('copy-webpack-plugin');
const productionConfig = {
  mode: 'production',
  // 压缩 model 必须是production才有效果
  // optimization: {
  //   minimizer: [
  //       new UglifyjsPlugin({
  //           // 使用缓存
  //           cache: true
  //       }),
  //       new OptimizeCssPlugin()
  //   ]      
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test:/\.(jpg|png|gif|bmp)$/,
        use:[
          {
            // 优化和压缩 图片
            loader:'image-webpack-loader',
            // options copy from https://www.npmjs.com/package/image-webpack-loader
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
    ]
  },
  performance:{
    hints: "warning", // 枚举
    maxAssetSize: 600000, // 整数类型（以字节为单位）
    maxEntrypointSize: 600000, // 整数类型（以字节为单位）
    // assetFilter: function (assetFilename) {
    //     // 提供资源文件名的断言函数
    //     // 只给出js与css文件的性能提示
    //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    // }
  },
  // 优化
  optimization: {
    minimize:true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new TerserPlugin(),
      // new CssMinimizerPlugin(),
    ],
  },
  plugins:[
    // 抽离css为单独文件
    // new MiniCssExtractPlugin({
    //     filename: 'css/main.css'
    // }),
    // 压缩css
    // new OptimizeCssPlugin(),
    // 压缩js
    // new UglifyjsPlugin({
    //     // 使用缓存
    //     cache: true
    // }),
    // 把项目中存在的某一个文件复制到打包后的文件夹（dist）里
    new CopyPlugin({
      patterns: [
        { from: "note", to: "note" },
      ],
    }),
    // 版权声明，添加到打包输出后的js代码之前
    new webpack.BannerPlugin(
      {
      banner:
      `
        hash:[chunkhash],  file:[file]
        使用此代码请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
        本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
        可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
        Copyright (c) 2021 hou zihong all rights reserved.
        版权所有，侵权必究！！！
      `,
      // raw:true, // 如果值为 true，将直出，不会被作为注释
      // entryOnly: true, // 如果值为 true，将只在入口 chunks 文件中添加
    }
    ), 
    // 打包时候忽略的文件
    // fix to https://github.com/webpack/webpack/issues/13557
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment/,
    }),
    new OptimizeCssPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
    }),
    new PurgeCSSPlugin({
      // **匹配任何字符，包括路径分隔符
      // * 匹配任何字符，不包括路径分隔符
      paths:glob.sync(`${PATHS.src}/**/*`,{nodir:true})
    }),
    // 定义模块内部的全局变量
    new webpack.DefinePlugin({
      // 定义在编译阶段使用的全局变量，在浏览器中运行的时候已经变为字符串值了
      // 'process.env.NODE_ENV':JSON.stringify(NODE_ENV),
      VERSION:JSON.stringify('v 0.0.1')// "\"v 0.0.1\""
    }),
  ]
}

module.exports = productionConfig