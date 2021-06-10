/*
 * @Author: your name
 * @Date: 2021-06-10 08:47:13
 * @LastEditTime: 2021-06-10 09:24:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack5/webpack.config.js
 */
const path = require('path')
module.exports = {
  mode:'none',// 模式 [development / production / none]
  devtool:'source-map',
  context:process.cwd(),//工作目录
  entry:'./src/index.js',// 入口起点 默认值是 ./src/index.js
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',// 变量 [name]
  }
}