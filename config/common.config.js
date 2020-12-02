'use strict'
const { join } = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')         // css 默认打包后在新创建的style标签中，可以使用此插件抽离css通过<link>引入, 但是不能自动压缩css文件，可使用optimize-css-assets-webpack-plugin插件压缩
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')        // webpack压缩js默认使用的这个插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')          // 每次打包前清空上一次打包后的文件
const { VueLoaderPlugin } = require('vue-loader')                       // const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { sit, uat, prd } = require('./global.config')

const env = process.env.ENV_TAG === 'sit' ? sit : process.env.ENV_TAG === 'uat' ? uat : prd

function resolve(dir) {
  return join(__dirname, '..', dir)                                     // 没有会自动创建目录
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [resolve('src/main.js')],
  output: {
    filename: '[name].js',						                                  // 取entry配置的入口文件名与后缀 [name]，output不支持[ext] 只有 [hash], [chunkhash], [name], [id], [query]，当entry值是对象时，自动取属性名
    path: resolve('dist'),                                              // 文件输出的目录，仅仅告诉Webpack结果存储在哪里，必须是一个绝对路径
    publicPath: 'https://local.vuo.com/',                               // 自动给引入的资源统一加上这个路径，方便CDN上的资源引用，被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值
    chunkFilename: '[id].[name].chunk.js'
  },
  resolve: {
    modules: [resolve('node_modules')],                                 // 查找模块时，只在指定目录查找，缩小查找范围，不再去上一级目录找
    extensions: ['.js', '.vue', '.jsx', 'css', 'json', 'scss'],         // 查找模块时，不写模块后缀时的依次查找规则：js .css .json .vue
    alias: {
      '@': resolve('src')
    }
  },
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({                                       // js压缩，删除空行、变成一行
        cache: true,                                                    // 是否用缓存
        parallel: true,                                                 // 是否并发压缩
        sourceMap: true                                                 // 源码映射，会单独生成一个sourcemap文件。压缩后代码难以阅读，此项配置可以有一个没有压缩的源码映射，可以方便调试
      })
      // new OptimizeCssAssetsWebpackPlugin()                           // 使用默认配置进行css压缩，删除空行、变成一行
    ]
  },
  module: {
    noParse: '/jquery|lodash/',                                         // 不解析指定模块的依赖关系，因为它不依赖其它模块，没有依赖关系，节省时间
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',                                           // vue-loader 15 版本 不支持oneof语法
        options: {
        }
      },
      {
        oneOf: [
          {
            test: /\.(css)$/,
            use: [
            // {
            //   loader: 'style-loader'                                 // loader从右向左执行、从下到上执行 创建style标签将css-loader生成的js模块化文件中的样式资源插入页面生效
            //   options: { insertAt: 'top' }                           // 将生成的css插入<style>的顶部，这样<style>中自定义的css永远在底部，可以覆盖生成的样式
            // },
              MiniCssExtractPlugin.loader,                                // 既然通过link标签引入了，就与上面的insertAt: 'top' ，选择一种方式使用吧
              'css-loader',                                               // css 模块化
              'postcss-loader'                                            // css 自动加兼容性前缀
            ]
          },
          {
            test: /\.(scss)$/,
            use: [
              MiniCssExtractPlugin.loader,                                // 既然通过link标签引入了，就与上面的insertAt: 'top' ，选择一种方式使用吧
              'css-loader',                                               // css 模块化
              'postcss-loader',                                           // css 自动加兼容性前缀
              'sass-loader'                                               // sass 转 css  less-loader stylus-loader
            ]
          },
          {
            test: /\.(js|jsx)$/,                                          // 处理js，jsx 需要安装 babel-loader @babel/core @babel/preset-env
            include: [resolve('src')],                                    // 默认匹配所有js ，所以可以只对指定目录下js起作用
            exclude: /node_modules/,
            use: [
              'thread-loader',                                            // 开启多进程打包。 进程启动大概为600ms，进程通信也有开销。只有工作消耗时间比较长，才需要多进程打包
              {
                loader: 'thread-loader',
                options: {
                  workers: 2 // 进程2个
                }
              },
              {
                loader: 'babel-loader?optional=runtime&cacheDirectory',   // babel-loader在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，可以加上cacheDirectory参数或使用 transform-runtime 插件(bablerc文件支持)
                options: {
                  presets: [										                          // 预设：指示babel做怎么样的兼容性处理
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',		                          // 按需加载
                        corejs: {								                          // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
                          version: 2
                        },
                        targets: {							                          // 指定js语法兼容性做到浏览器哪个版本
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
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            exclude: [resolve('src/icons')],                          // src/icons下的svg文件都不使用url-loader编译
            options: {                                                // 优点：减少请求数量，减轻服务器压力。 缺点：图片体积会更大，文件请求更慢。处理不了img src引入的图片，因为没有解析html文件
              limit: 8 * 1024,                                        // 图片小于8kb转为base64
              outputPath: 'img/',                                     // 指定图片输出目录 publicPath + outputPath
              esModule: false,                                        // 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，所以解析时会出问题：[object Module]，需要关闭url-loader的es6模块化
              name: '[hash:8].[ext]'                                  // 不想图片默认名称那么长，可以重命名，[ext]取文件的原扩展名
            }
          },
          {
            exclude: /\.(css|js|html|less|sass|jpe?g|png|gif|woff(2)?|eot|ttf|otf)$/,    // 处理其它资源都会通过file-loader进行处理
            loader: 'file-loader',
            options: {
              name: '[hash:8].[ext]',
              outputPath: 'other/'
            }
          }
        ]
      }]
  },
  plugins: [
    new VueLoaderPlugin({}),
    new Webpack.DefinePlugin({                                          // 让vue页面中访问环境变量：const env = `${process.env.BASEURL}`
      'process.env': env
    }),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),                           // 复制源模板文件到output输出目录下，并在页面中自动引入打包后的所有资源
      filename: 'index.html',                                           // 打包生成的文件名，不指定默认用原来的
      title: 'vuo-web',                                                 // 用来生成页面的 title 元素，如果模板中有设置title的名字，则会忽略这里的设置
      inject: true,                                                     // true|'head'|'body'|false，取值 true|'body'，js 资源将被放置到body元素的底部，取值'head' 将放置到 head 元素中。false则插入生成的js中
      favicon: resolve('public/favicon.ico'),                           // 指定页面图标，<link rel='shortcut icon' href='favicon.ico'>
      minify: {
        collapseWhitespace: true,                                       // html压缩，删除空行、变成一行
        collapseBooleanAttributes: true,                                // 是否简写boolean格式的属性如：disabled="disabled"简写为disabled,默认false
        removeComments: true,						                                // 移除注释
        removeAttributeQuotes: true                                     // 删除页面中属性上的无用的双引号
      }
      // hash: true                                                     // 是否生成hash添加在所有引入文件地址的末尾，可以解决缓存问题 src="./index.js?5c5c5c5c5c5c5cccc"
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.[hash:8].css'                                // 抽离css样式，指定css生成目录与文件名
    }),
    new CleanWebpackPlugin()                                            // 删除webpack的output.path目录中的所有文件，以及每次成功重建后所有未使用的webpack资产
  ]
}
