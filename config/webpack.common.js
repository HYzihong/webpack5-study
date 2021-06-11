/*
 * @Author: your name
 * @Date: 2021-06-10 15:33:12
 * @LastEditTime: 2021-06-11 15:18:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack5/webpack.common.js
 */

const path = require('path')
console.log('当前目录 ==> ',path.resolve(__dirname));
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//每次打包都会先删除dist目录
const htmlPlugin = require('html-webpack-plugin')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')//在控制台显示每个依赖打包所花费的时间,方便针对优化
const smp = new SpeedMeasurePlugin();
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
    filename: 'index.[chunkhash:8].js',
    // filename: '[name].js',// 变量 [name]
    /*
     用hash会报错(node:30768) [DEP_WEBPACK_TEMPLATE_PATH_PLUGIN_REPLACE_PATH_VARIABLES_HASH] DeprecationWarning: [hash] is now [fullhash] (also consider using [chunkhash] or [contenthash], see documentation for details)
    */
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
      '@bootstrap':path.resolve(__dirname,'../node_modules/bootstrap/dist/css/bootstrap.css')
    },
    // 指定查找的目录
    // 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 node_modules 目录下寻找。
    modules:['node_modules'],
    // 默认mainFields: ['browser', 'main']
    // 'jsnext:main' 指向的 ES6 模块化语法的文件
    mainFields:['jsnext:main','main'],
    mainFiles:['index']//如果找不到mainFields的话，会找索引文件index.js 
  },
  resolveLoader:{
    modules:[
      path.resolve(__dirname,'../loaders'),
      'node_modules'
    ]
  },
  // 如果我们想引用一个第三方库，但是不想被webpack打包，又不影响我们在程序中以CMD，AMD或者window/global全局等方式进行使用就需要配置 externals
  externals:{
    jquery:'jQuery'
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
      // 每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)。
      {
        test:/\.js$/,
        include:path.resolve(__dirname,'../src'),
        exclude:/node_modules/,//优先级高于include
        use:[
          {
            loader:'thread-loader',
            // thread-loader 后面的loader都会在一个单独的worker池(worker pool)中运行 
            // thread-loader 替代废弃的happypake
            options:{
              worker:3 
            }
          },
          {
            loader:'babel-loader',
            options:{
              cacheDirectory:true//开启babel缓存
            }
          }
        ]
      },
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test:/\.css$/,
        use:[
          // use 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
          // 注意：执行顺序是由后到前的

          // Loader 可以看作具有文件转换功能的翻译员，
          // Loader：模块转换器，用于把模块原内容按照需求转换成新内容。

          // 自己定义的loader
          'logger-loader',

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
  
  plugins:[
    // Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
    
    new htmlPlugin({
      template:path.join(__dirname, '../src/index.html')
      // 生产开启，压缩代码
      // minify: {
      //     // 删除html双引号
      //     removeAttributeQuotes: true,
      //     // 压缩成一行
      //     collapseWhitespace: true
      // },
      // 文件哈希
      //hash: true
    }),
    // new webpack.IgnorePlugin({
    //   //  IgnorePlugin 用于忽略特定的模块，不打包进来
    //   // TODO:不生效的原因可能就是我的路径不对了
    //   resourceRegExp:/^\locale$/,// 资源路径的正则
    //   contextRegExp:/moment$/ //资源上下文目录的正则
    // })
    // 简写new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    new CleanWebpackPlugin(),
  ]
})