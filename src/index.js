/*
 * @Author: your name
 * @Date: 2021-06-10 09:03:09
 * @LastEditTime: 2021-06-15 16:34:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack5/src/index.js
 */
// console.log(1);
/*

> webpack5-study@0.0.1 build
> webpack

asset main.js 428 bytes [emitted] (name: main) 1 related asset
./src/index.js 228 bytes [built] [code generated]
webpack 5.38.1 compiled successfully in 98 ms

*/ 

// require('@bootstrap')
let  $ = require('jquery')//window.jQuery
// console.log($);
import './index.css'
import moment from 'moment'
// 引入中文
// import 'moment/locale/zh-cn'
// 设置中文
moment.locale('zh-cn');
// let momentStr = moment().date();
// console.log(momentStr+'日');
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
console.log('webpack env ',process.env.NODE_ENV);//undefined 
console.log('version : ',VERSION);//undefined 

