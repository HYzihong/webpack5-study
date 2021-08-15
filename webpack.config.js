/*
 * @Author: your name
 * @Date: 2021-06-10 08:47:13
 * @LastEditTime: 2021-06-15 17:32:39
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /webpack5/webpack.config.js
 */

/*

Webpack 是一个打包模块化 JavaScript 的工具，
它会从 入口文件 出发，识别出源码中的模块化导入语句， 
递归的寻找出入口文件的所有依赖，把入口和其所有依赖打包到一个单独的文件中。

*/ 
const baseConfig = require('./config/webpack.common')
const developmentConfig = require("./config/webpack.development");
const productionConfig = require("./config/webpack.production")
const webpackMerge = require("webpack-merge");

/*
环境
mode

6.1 环境
6.1.1模式(mode)
- 日常的前端开发工作中，一般都会有两套构建环境
- 一套开发时使用，构建结果用于本地开发调试，不进行代码压缩，打印debug信息，包含 sourcemap 文件
- 一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印debug信息，静态文件不包括 sourcemap 
- webpack4.x版本引入了mode的概念
- 当你指定使用production mode时，默认会启用各种性能优化的功能，包括构建结果优化以及webpack运行性能优化
- 而如果是development mode的话，则会开启debug工具，运行时打印详细的错误信息，以及更加快速的增量编译构建

选项             描述
 development 会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin
 production  会将 process.env.NODE_ENV 的值设为 production 。启用 FlagDependencyUsagePlugin, FlagincludedChunksPlugin,
ModuleConcatenationPlugin,NoEmitOnErrorsPlugin,OccurrenceOrderPlugin,SideEffectsFlagPlugin 和 UglifyJsPlugin

6.1.2 环境差异
- 开发环境
    - 需要生成 sourcemap 文件需要打印 debug 信息
    - 需要 live reload 或者hot reload 的功能

- 生产环境
    - 可能需要分离CSS成单独的文件，以便多个页面共享同一个CSS 文件
    - 需要压缩HTML/CSS/JS代码
    - 需要压缩图片

- 其默认值为production
*/ 
// 读取.env文件(确保env文件在根目录)，设置到 process.env 中 
// require('dotenv').config();
const path = require('path')
// const NODE_ENV =require(path.resolve(__dirname,'.env.production'))
// console.log(NODE_ENV);
const fs = require('fs')
const ENV = fs.readFileSync(path.resolve(__dirname,'.env.production'),'utf-8')
console.log(ENV);
// console.log('webpack env ==>',process.env.NODE_ENV);// defalt:undefined 
module.exports = (env) => {
    // webpack --env development 只有这里(module.exports = (env) => {})可以接受env这个参数
    /*
    npx webpack --env development  --progress
    { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, development: true }
    */ 
    /*
    npx webpack --env production  --progress
    { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, production: true }
    */
    if(env.production){
        console.log('------production------');
        // console.log(webpackMerge.merge(baseConfig,productionConfig,{mode:'production'}));
        return webpackMerge.merge(baseConfig,productionConfig,{mode:'production'});   
    }else{
        console.log('------development------');
        // console.log(webpackMerge.merge(baseConfig,developmentConfig,{mode:'development'}));
        return webpackMerge.merge(baseConfig,developmentConfig,{mode:'development'});
    }
};