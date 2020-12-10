'use strict'
const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')         // css 默认打包后在新创建的style标签中，可以使用此插件抽离css通过<link>引入, 但是不能自动压缩css文件，可使用optimize-css-assets-webpack-plugin插件压缩，此插件不支持HMR，若提取样式文件成单独文件（报错 No template for dependency: CssDependency https://blog.csdn.net/weixin_45615791/article/details/104294458），那么修改了样式文件，是不能即时在浏览器中显示出来的，需要手动刷新页面，用来替代extract-text-webpack-plugin，支持CSS和SourceMaps的按需加载  https://www.jianshu.com/p/e6b25ed1b4cc?utm_campaign=shakespeare
const { CleanWebpackPlugin } = require('clean-webpack-plugin')          // 每次打包前清空上一次打包后的文件
const { VueLoaderPlugin } = require('vue-loader')                       // const VueLoaderPlugin = require('vue-loader/lib/plugin')，装了vue-loader就不要装vue-loader-plugin

const { sit, uat, prd } = require('./env.config')
const env = process.env.ENV_TAG === 'sit' ? sit : process.env.ENV_TAG === 'uat' ? uat : prd

const devMode = process.env.NODE_ENV !== 'production'

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: resolve('src/main'),
  output: {
    filename: '[name].js',
    path: resolve('dist'),                                              // 文件输出的目录，仅仅告诉Webpack结果存储在哪里，必须是一个绝对路径
    publicPath: 'https://local.vuo.com/',                               // 自动给引入的资源统一加上这个路径，方便CDN上的资源引用，被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值
    chunkFilename: '[id].[name].chunk.js'                               // 用来打包require.ensure方法中引入的模块，如果该方法中没有引入任何模块则不会生成任何chunk块文件：https://www.cnblogs.com/toward-the-sun/p/6147324.html?utm_source=itdadao&utm_medium=referral
  },
  resolve: {
    modules: [resolve('node_modules')],                                 // 查找模块时，只在指定目录查找，缩小查找范围，不再去上一级目录找
    extensions: ['.js', '.vue', '.scss', '.json', '.css', '.jsx'],      // 查找模块时，不写模块后缀时的依次查找规则
    alias: {
      '~': resolve('src'),
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js'                                     // vue.esm.js（运行时 + 编译，包含编译器） vue.common.js（运行时，没有编译器）
      // 'vue$': 'vue/dist/vue.esm.js'                                  // import Vue from ‘vue’ 这行代码被解析为 import Vue from ‘vue/dist/vue.esm.js’，直接指定了文件的位置，没有使用main字段默认的文件位置     compiler模式
      // 'vue': 'vue/dist/vue.common.js'                                // import Vue from ‘vue’ 这行代码被解析为 import Vue from ‘vue/dist/vue.common.js’，直接指定了文件的位置，没有使用main字段默认的文件位置  runtime模式
    }
  },
  optimization: {
    splitChunks: {                                                      // 抽离公共代码，多页面应用才有抽离公共代码
      chunks: 'async',                                                  // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000,                                                   // 模块超过30k自动被抽离成公共模块
      minChunks: 1,                                                     // 模块被引用>=1次，便分割
      maxAsyncRequests: 5,                                              // 异步加载chunk的并发请求数量<=5
      maxInitialRequests: 3,                                            // 一个入口并发加载的chunk数量<=3
      automaticNameDelimiter: '~',                                      // 命名分隔符
      cacheGroups: {                                                    // 缓存组
        common: {                                                       // 公共代码配置，满足下面所有条件就抽离
          chunks: 'initial',                                            // 公用代码从哪里开始找：initial，入口处
          minSize: 0,                                                   // 公用代码大于0个字节
          minChunks: 2                                                  // 公用代码引用了2次及以上
        },
        default: {                                                      // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2,                                                 // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20,                                                // 优先级
          reuseExistingChunk: true                                      // 默认使用已有的模块
        },
        vendor: {
          priority: 1,                                                  // 设置权重，权重高的先抽离， 防止受别的抽离影响
          test: /node_modules/,                                         // 抽离第三方模块
          chunks: 'initial',                                            // 第三方模块从哪里开始找
          minSize: 0,                                                   // 第三方模块大于0个字节
          minChunks: 2                                                  // 第三方模块引用了2次及以上
        }
      }
    }
  },
  module: {
    noParse: '/jquery|lodash/',                                         // 不解析指定模块的依赖关系，因为它不依赖其它模块，没有依赖关系，节省时间
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'                                            // vue-loader 15 版本 不支持oneof语法
      },
      {
        oneOf: [
          // {
          //   test: /\.(html|ejs)$/,
          //   use: ['html-loader']
          // },
          // {
          //   test: /\.(css)$/,
          //   use: ['style-loader', 'css-loader', 'postcss-loader']
          // },
          {
            // test: /\.(css)$/,
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: 'style-loader',                              // loader从右向左执行、从下到上执行 创建style标签将css-loader生成的js模块化文件中的样式资源插入页面生效
                options: { insert: 'top' }                           // 将生成的css插入<style>的顶部，这样<style>中自定义的css永远在底部，可以覆盖生成的样式，在webpack4.0中insertAt已经被废弃，使用insert函数
              },
              devMode ? {
                loader: 'style-loader',                                 // loader从右向左执行、从下到上执行 创建style标签将css-loader生成的js模块化文件中的样式资源插入页面生效
                options: {
                  insert: function (element) {                          // 将生成的css插入<style>的顶部，这样<style>中自定义的css永远在底部，可以覆盖生成的样式
                    const parent = document.querySelector('head')
                    const lastInsertedElement = window._lastElementInsertedByStyleLoader
                    if (!lastInsertedElement) {
                      parent.insertBefore(element, parent.firstChild)
                    } else if (lastInsertedElement.nextSibling) {
                      parent.insertBefore(element, lastInsertedElement.nextSibling)
                    } else {
                      parent.appendChild(element)
                    }
                  }
                }
              } : MiniCssExtractPlugin.loader,                          // 既然通过link标签引入了，就与上面的insertAt: 'top' ，选择一种方式使用吧，必须配合plugin配置new MiniCssExtractPlugin()一起使用，斗则报错：No template for dependency: CssDependency
              'css-loader',                                             // css 模块化
              'postcss-loader',
              'sass-loader'
            ]
          },
          // {
          //   test: /\.(scss)$/,
          //   use: [
          //     MiniCssExtractPlugin.loader,
          //     'css-loader',
          //     'postcss-loader',
          //     'sass-loader'                                             // sass 转 css  sass-loader less-loader stylus-loader
          //   ]
          // },
          // {
          //   // test: /\.scss$/,
          //   test: /\.(sa|sc|c)ss$/,
          //   // 执行顺序是从右到左的，先scss-loader编译 --> css-loader --> style-loader放入页面中（document中）
          //   // use: ['style-loader', 'css-loader', 'sass-loader']
          //   use: [
          //     'style-loader',
          //     {
          //       loader: 'css-loader'
          //     },
          //     // "css-loader",  //或者这样
          //     'sass-loader'
          //   ]
          // },
          {
            test: /\.(js|jsx)$/,                                        // 处理js，jsx 需要安装 babel-loader @babel/core @babel/preset-env
            include: [resolve('src')],                                  // 默认匹配所有js ，所以可以只对指定目录下js起作用
            exclude: /node_modules/,
            use: [
              'thread-loader',                                          // 开启多进程打包。 进程启动大概为600ms，进程通信也有开销。只有工作消耗时间比较长，才需要多进程打包
              {
                loader: 'thread-loader',
                options: {
                  workers: 2                                            // 进程2个
                }
              },
              {
                loader: 'babel-loader?optional=runtime&cacheDirectory', // babel-loader在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，可以加上cacheDirectory参数或使用 transform-runtime 插件(bablerc文件支持)
                options: {
                  presets: [										                        // 预设：指示babel做怎么样的兼容性处理
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',		                        // 按需加载
                        corejs: {								                        // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
                          version: 2
                        },
                        targets: {							                        // 指定js语法兼容性做到浏览器哪个版本
                          chrome: '60',
                          firefox: '60',
                          ie: '8',
                          safari: '10',
                          edge: '17'
                        }
                      }
                    ]
                  ],
                  cacheDirectory: true
                }
              }
            ]
          },
          {
            test: require.resolve('jquery'),                          // expose-loader插件暴露全局变量jquery的$符形式给window，写法二： import $ from 'expose-loader?$!jquery'
            use: 'expose-loader?$!jquery'
          },
          {
            test: /\.(woff(2)?|eot|ttf|otf)(\?.*)?$/,                 // 处理字体图标文件
            use: [{
              loader: 'url-loader',
              options: {
                limit: 1024,
                name: 'font/[name].[hash:8].[ext]'
              }
            }]
          },
          {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',                              // 将加载的 svg 图片拼接成 雪碧图，放到页面中，其它地方通过 <use> 复用
            include: [resolve('src/icons')],                          // 只有src/icons下的svg使用svg-sprite-loader编译
            options: {
              symbolId: 'icon-[name]'                                 // 编译时把svg的文件名前添加上icon，方便使用
            }
          },
          {
            test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
            loader: 'url-loader',
            exclude: [resolve('src/icons')],                          // src/icons下的svg文件都不使用url-loader编译
            options: {                                                // 优点：减少请求数量，减轻服务器压力。 缺点：图片体积会更大，文件请求更慢。处理不了img src引入的图片，因为没有解析html文件
              limit: 8 * 1024,                                        // 图片小于8kb转为base64
              outputPath: 'images/',                                  // 指定图片输出目录 publicPath + outputPath
              esModule: false,                                        // 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，所以解析时会出问题：[object Module]，需要关闭url-loader的es6模块化
              name: '[hash:8].[ext]'                                  // 不想图片默认名称那么长，可以重命名，[ext]取文件的原扩展名
            }
          },
          {
            test: /\.(mp3|mp4)(\?.*)?$/,
            loader: 'file-loader',
            options: {
              name: './assets/[name].[ext]'                           // mp3不能用hash html只会用源码的文件名
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin({}),
    new Webpack.DefinePlugin({                                       // 让vue页面中访问环境变量：const env = `${process.env.BASEURL}`
      'process.env': env
    }),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),                        // 复制源模板文件到output输出目录下，并在页面中自动引入打包后的所有资源
      filename: 'index.html',                                        // 打包生成的文件名，不指定默认用原来的
      title: 'vuo-web',                                              // 用来生成页面的 title 元素，如果模板中有设置title的名字，则会忽略这里的设置
      inject: true,                                                  // true|'head'|'body'|false，取值 true|'body'，js 资源将被放置到body元素的底部，取值'head' 将放置到 head 元素中。false则插入生成的js中
      favicon: resolve('public/favicon.ico'),                        // 指定页面图标，<link rel='shortcut icon' href='favicon.ico'>
      minify: {
        collapseWhitespace: true,                                    // html压缩，删除空行、变成一行
        collapseBooleanAttributes: true,                             // 是否简写boolean格式的属性如：disabled="disabled"简写为disabled,默认false
        removeComments: true,						                             // 移除注释
        removeAttributeQuotes: true                                  // 删除页面中属性上的无用的双引号
      },
      hash: true                                                     // 是否生成hash添加在所有引入文件地址的末尾，可以解决缓存问题 src="./index.js?5c5c5c5c5c5c5cccc"
    }),
    new CleanWebpackPlugin()                                         // 删除webpack的output.path目录中的所有文件，以及每次成功重建后所有未使用的webpack资产
  ]
}
