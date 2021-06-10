/*
 * @Author: your name
 * @Date: 2021-06-10 15:33:41
 * @LastEditTime: 2021-06-10 16:24:50
 * @LastEditors: Please set LastEditors
 * @Description: 开发环境的配置文件
 * @FilePath: /webpack5/webpack.development.js
 */
// const webpackMerge = require('webpack-merge')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')// 文件监控体积,生成分析报告

const developmentConfig = {
  mode: 'development',
  devtool:'source-map',//调试工具
  plugins:[
    new BundleAnalyzerPlugin({
      analyzerMode:'disabled',//不启动展示打包报告的8888服务
      generateStatsFile:true//生成stats.json文件
    }),
  ]
}

module.exports = developmentConfig
