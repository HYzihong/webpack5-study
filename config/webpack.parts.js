/*
 * @Author: your name
 * @Date: 2021-06-10 15:41:23
 * @LastEditTime: 2021-06-10 15:45:28
 * @LastEditors: Please set LastEditors
 * @Description: 各个配置零件的配置文件
 * @FilePath: /webpack5/webpack.parts.js
 */
// 参考 ：https://www.cnblogs.com/wangtong111/p/11197313.html
/**
 * @description: 
 * @param {*} reg loader匹配的test正则
 * @param {*} include 所要打包的文件夹
 * @param {*} exclude 要跳过打包的文件夹
 * @param {*} uses 外部导入的loader(默认:['style-loader','css-loader'])
 * @return {*} loader
 */
exports.loadCSS = ({reg = /\.css$/,include,exclude,uses = []} = {}) => ({
  module : {
      rules:[{
          test : reg,
          include,
          exclude,
          use:[
            {
              loader : "style-loader",
            },
            {
                loader : "css-loader",
            }
          ].concat(uses),
      }]
  }
})