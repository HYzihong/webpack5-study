/*
 * @Author: your name
 * @Date: 2021-06-10 15:33:48
 * @LastEditTime: 2021-06-11 15:14:43
 * @LastEditors: Please set LastEditors
 * @Description: 生产环境的配置文件
 * @FilePath: /webpack5/webpack.production.js
 */
const path = require('path')

// 抽离css为单独文件
// let MiniCssExtractPlugin =  require('mini-css-extract-plugin');
// 导入样式压缩
// let OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js
// let UglifyjsPlugin =  require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
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
    // new CopyPlugin({
    //   patterns: [
    //     { from: "note", to: "note" },
    //   ],
    // }),
    // new webpack.BannerPlugin({
    //   banner:"zi hong"
    // }), // 版权声明，添加到打包输出后的js代码之前
    // 打包时候忽略的文件
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
}

module.exports = productionConfig