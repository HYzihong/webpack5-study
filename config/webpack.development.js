/*
 * @Author: your name
 * @Date: 2021-06-10 15:33:41
 * @LastEditTime: 2021-08-15 14:14:14
 * @LastEditors: Please set LastEditors
 * @Description: 开发环境的配置文件
 * @FilePath: /webpack5/webpack.development.js
 */
const path = require('path')
const webpack = require('webpack')

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')// 文件监控体积,生成分析报告

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
  // 模块
  // 在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
  // 创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。 这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
  module:{
    // noParse
    // 配置哪些模块文件不需要解析
    // 例如：不需要解析依赖的第三方大型的类库，配置这个字段后会提高构建速度，例如jQuery,loadsh
    // noParse:/xxx.js/
    // noParse: '/jquery|lodash/',
    // 注意：noParse忽略的模块文件中不能使用import/require引用其他文件 

    // rules
    // 匹配请求的规则数组
    rules:[
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test:/\.css$/,
        use:[
          // use 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
          // 注意：执行顺序是由后到前的

          // Loader 可以看作具有文件转换功能的翻译员，
          // Loader：模块转换器，用于把模块原内容按照需求转换成新内容。

          'cache-loader',
          // 将一些开销大的loader的结果缓存到磁盘（node_modules/.cache/cache-loader）
          // 位置放于性能开销大的loader之后


          // 自己定义的loader
          'logger-loader',

          // 2. 再交给 style-loader 把 CSS 内容注入到 JavaScript 里
          'style-loader',//把style标签插到html
          // 1. 先使用 css-loader 读取 CSS 文件
          'css-loader'// 解析css语法
          /*
          https://github.com/webpack-contrib/css-loader
          // 已经不支持query的形式添加option， 每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如 css-loader?minimize 中的 minimize 告诉 css-loader 要开启 CSS 压缩。
          加上参数 css-loader?minimize会报错 
          {
            loader:'css-loader',
            options:{
              minimize:true,
            }
          }
          ERROR in ./node_modules/bootstrap/dist/css/bootstrap.css (./node_modules/css-loader/dist/cjs.js?minimize!./node_modules/bootstrap/dist/css/bootstrap.css)
          Module build failed (from ./node_modules/css-loader/dist/cjs.js):
          ValidationError: Invalid options object. CSS Loader has been initialized using an options object that does not match the API schema.
          - options has an unknown property 'minimize'. These properties are valid:
            object { url?, import?, modules?, sourceMap?, importLoaders?, esModule? }
              at validate (/Users/hy/code/vue/webpack/webpack5/node_modules/schema-utils/dist/validate.js:104:11)
              at Object.loader (/Users/hy/code/vue/webpack/webpack5/node_modules/css-loader/dist/index.js:36:29)
          @ ./node_modules/bootstrap/dist/css/bootstrap.css 2:12-93 9:17-24 13:15-29
          @ ./src/index.js 21:0-20
          
          */ 
        ]
      },
      

    ]
  },
  plugins:[
    new BundleAnalyzerPlugin({
      analyzerMode:'disabled',//不启动展示打包报告的8888服务
      generateStatsFile:true//生成stats.json文件
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV':JSON.stringify('development')
    // }),
  ]
}

module.exports = developmentConfig
