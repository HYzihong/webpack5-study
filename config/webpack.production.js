/*
 * @Author: your name
 * @Date: 2021-06-10 15:33:48
 * @LastEditTime: 2021-06-10 17:06:55
 * @LastEditors: Please set LastEditors
 * @Description: 生产环境的配置文件
 * @FilePath: /webpack5/webpack.production.js
 */
// const webpackMerge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//每次打包都会先删除dist目录
const developmentConfig = {
  mode: 'production',
  plugins:[
    new CleanWebpackPlugin(),
  ]
}

module.exports = developmentConfig