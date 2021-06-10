/*
 * @Author: your name
 * @Date: 2021-06-10 15:33:12
 * @LastEditTime: 2021-06-10 17:12:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack5/webpack.common.js
 */

const path = require('path')
const webpackMerge = require('webpack-merge')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')//日志美化 更好的错误提示
const notifier  = require('node-notifier')
const errorIcon = path.resolve(__dirname,'error.jpg')// notifier error icon
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')//在控制台显示每个依赖打包所花费的时间,方便针对优化
const smp = new SpeedMeasurePlugin();
// module.exports = webpackMerge({
module.exports = smp.wrap({
  mode:'none',// 模式 [development / production / none]
  // devtool:'source-map',//调试工具
  context:process.cwd(),//上下文的工作目录（根目录） 
  // 例子：根目录是app/ ==> context:path.resolve(__dirname, 'app')
  // 也可以 webpack --context
  // Webpack 在寻找相对路径的文件时会以 context 为根目录

  entry:'./src/index.js',// 入口起点 默认值是 ./src/index.js
  /*
  Entry 类型:
  
    string	'./app/entry'	                      入口模块的文件路径，可以是相对路径。
    array	  ['./app/entry1', './app/entry2']	  入口模块的文件路径，可以是相对路径。
    object	{                                   配置多个入口，每个入口生成一个 Chunk
                a: './app/entry-a',
                b: ['./app/entry-b1', './app/entry-b2']
            }                                                 	

  注意：如果是 array 类型，则搭配 output.library 配置项使用时，只有数组里的最后一个入口文件的模块会被导出。

  */ 


  /*
  
  Chunk 名称
    Webpack 会为每个生成的 Chunk 取一个名称，Chunk 的名称和 Entry 的配置有关：

    如果 entry 是一个 string 或 array，就只会生成一个 Chunk，这时 Chunk 的名称是 main；
    如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称。
  
  */ 

  
  output:{
    // // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, '../dist'),//必须是 string 类型的绝对路径
    // 把所有依赖的模块合并输出到一个文件
    filename: '[name].[chunkhash:8].js',
    // filename: '[name].js',// 变量 [name]

    /*
    内置变量除了 name 还包括：
      变量名	    含义
      id	      Chunk 的唯一标识，从0开始
      name	    Chunk 的名称
      hash	    Chunk 的唯一标识的 Hash 值,长度是可指定的, 8~20位
      chunkhash	Chunk 内容的 Hash 值,长度是可指定的
    */ 
  },
  // 解析
  // Resolve 配置 Webpack 如何寻找模块所对应的文件
  resolve: {
    /*
    在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。 
    resolve.extensions 用于配置在尝试过程中用到的后缀列表，
    默认是：extensions: ['.js', '.json']
    */ 
    // extensions 制定后就不用在require/import时添加扩展名
    extensions: [ '.js' , 'ts' , '.jsx' , '.json' ],//扩展名匹配顺序
    // enforceExtension:false,所有导入语句是否都必须要带文件后缀
    // enforceModuleExtension:false,// 在 webpack 5 中被废弃 兼容第三方模块(安装的第三方模块中大多数导入语句没带文件后缀)
    // alias 别名
    alias:{
      '@bootstrap':path.resolve(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css')
    },
    // 指定查找的目录
    // 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 node_modules 目录下寻找。
    modules:['node_modules'],
    // 默认mainFields: ['browser', 'main']
    // 'jsnext:main' 指向的 ES6 模块化语法的文件
    mainFields:['jsnext:main','main']

  },
  // 模块
  // 在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
  // 创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。 这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
  module:{
    // 匹配请求的规则数组
    rules:[
      // 每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)。
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test:/\.css$/,
        use:[
          // use 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
          // 注意：执行顺序是由后到前的

          // Loader 可以看作具有文件转换功能的翻译员，
          // Loader：模块转换器，用于把模块原内容按照需求转换成新内容。

          
          // 2. 再交给 style-loader 把 CSS 内容注入到 JavaScript 里
          'style-loader',//把style标签插到html
          // 1. 先使用 css-loader 读取 CSS 文件
          'css-loader'// 解析css语法
          /*
          https://github.com/webpack-contrib/css-loader
          // 每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如 css-loader?minimize 中的 minimize 告诉 css-loader 要开启 CSS 压缩。
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
      // oneOf 唯一匹配
      // oneOf 当匹配到一个loader后则不再匹配其他的loader
      // 优化手段之一：处理性能更好
      // 案例：1. 同时处理react/vue框架的项目时，https://juejin.cn/post/6911979118359740423
      // 注意：不能有两个配置处理同一种类型文件
      // 示例：
      //   {
      //     test: /\.js$/,
      //     exclude: /node_modules/,
       //   //  不能有两个loader处理同一种类型文件，所以eslint-loader放在oneOf匹配之前执行
      //     enforce: 'pre', //优先执行，正常的，一个文件只能被一个loader处理，当一个文件要被多个loader处理，
      //                     //一定要指定loader执行的先后顺序，先执行eslint再执行babel
      //     loader: 'eslint-loader',
      //     options: {
      //         fix: true
      //     }
      // },
      // {
      //   oneOf: [
      //     {
      //       test:/\.js$/,
      //       include:path.join(__dirname, 'src'),
      //       exclude:/node_modules/,
      //       use:[
      //         {
      //           loader:'thread-loader',
      //           options:{
      //             xxx
      //           }
      //         },
      //         {
      //           loader:'babel-loader',
      //           options:{
      //             xxx
      //           }
      //         }
      //       ]
      //     },
      //     {
      //       test:/\.css$/,
      //       use:[
      //         'style-loader',
      //         'css-loader'
      //       ]
      //     },
      //   ],
      // }

    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
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
    // Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
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
})