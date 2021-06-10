/*
 * @Author: your name
 * @Date: 2021-06-10 08:47:13
 * @LastEditTime: 2021-06-11 05:48:53
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

module.exports = (env) => {
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