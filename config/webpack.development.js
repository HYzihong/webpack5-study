/*
 * @Author: your name
 * @Date: 2021-06-10 15:33:41
 * @LastEditTime: 2021-06-11 13:55:11
 * @LastEditors: Please set LastEditors
 * @Description: 开发环境的配置文件
 * @FilePath: /webpack5/webpack.development.js
 */
const path = require('path')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')// 文件监控体积,生成分析报告
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')//日志美化 更好的错误提示
const notifier  = require('node-notifier')
const errorIcon = path.resolve(__dirname,'../error.jpg')// notifier error icon
const developmentConfig = {
  mode: 'development',
  // target: '',
  devtool:'source-map',//调试工具
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,//配置是否启用 gzip 压缩 默认为 false
    host: '127.0.0.1', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 7001, // 启动端口为 7001 的服务
    hot: true,
    open:true,//用于在 DevServer 启动且第一次构建完时自动用你系统上默认的浏览器去打开要开发的网页。 
    // 同时还提供 devServer.openPage 配置项用于打开指定 URL 的网页
    // progress:false,// webpack server --progress好像没啥用
    proxy:{
      '/api': 'http://localhost:3000',
    }
  },
  plugins:[
    new BundleAnalyzerPlugin({
      analyzerMode:'disabled',//不启动展示打包报告的8888服务
      generateStatsFile:true//生成stats.json文件
    }),
    new FriendlyErrorsWebpackPlugin({
      onErrors:(severity,errors)=>{
        // console.log('FriendlyErrorsWebpackPlugin',severity,errors);
        const error = errors[0]
        notifier.notify({
          title:'编译失败',
          subtitle:error.file||'',
          message:severity+':'+error.name,
          icon:errorIcon
        })
      },
    }),
  ]
}

module.exports = developmentConfig
