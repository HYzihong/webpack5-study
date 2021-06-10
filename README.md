<!--
 * @Author: your name
 * @Date: 2021-06-10 08:42:05
 * @LastEditTime: 2021-06-10 15:14:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack5/README.md
-->

# webpack5-study

## 学习 webpack5

### webpack: 常见概念

1. Entry

- context
- Entry
  - Entry 类型
    - string
    - array
    - object
  - 动态 Entry
- Chunk

2. Output

- filename
  - 模版和变量

---

### 性能优化手段

1. oneOf

---

扩展：

1. 不怎么用到的官方可视化分析手段

```shell

webpack --profile --json > stats.json

> webpack5-study@0.0.1 build
> webpack --profile --json > stats.json

(node:22108) [DEP_WEBPACK_COMPILATION_NORMAL_MODULE_LOADER_HOOK] DeprecationWarning: Compilation.hooks.normalModuleLoader was moved to NormalModule.getCompilationHooks(compilation).loader
(node:22108) [DEP_WEBPACK_TEMPLATE_PATH_PLUGIN_REPLACE_PATH_VARIABLES_HASH] DeprecationWarning: [hash] is now [fullhash] (also consider using [chunkhash] or [contenthash], see documentation for details)

# 根目录下会生成一个stats.json目录 记录了所有构建过程中的信息,可以在http://webpack.github.io/analyse/(官方的可视化分析工具)中分析


```

---

参考：

1. [深入浅出 Webpack](https://webpack.wuhaolin.cn/)
