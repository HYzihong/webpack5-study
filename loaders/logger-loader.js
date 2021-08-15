/*
 * @Author: your name
 * @Date: 2021-06-11 05:42:22
 * @LastEditTime: 2021-06-15 16:12:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack5/loaders/logger-loader.js
 */
/**
 * @description: 
 * @param {*} source 源代码文件
 * @return {*} 处理后的源代码文件
 */
function loader(source){
  console.log('@----- use logger-loader -----@');
  return source
}
module.exports = loader