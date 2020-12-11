'use strict'
const WebpackMerge = require('webpack-merge')
const ComConfig = require('./config/com.config')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')  // 生产环境，自动压缩html、css、js压缩css，开发环境不会自动压缩。如果开发环境配置这个插件压缩css会导致js压缩失效，需要通过UglifyjsWebpackPlugin解决
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')        // webpack压缩js默认使用的这个插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')         // css 默认打包后在新创建的style标签中，可以使用此插件抽离css通过<link>引入, 但是不能自动压缩css文件，可使用optimize-css-assets-webpack-plugin插件压缩，此插件不支持HMR，若修改了样式文件，是不能即时在浏览器中显示出来的，需要手动刷新页面，用来替代extract-text-webpack-plugin，支持CSS和SourceMaps的按需加载  https://www.jianshu.com/p/e6b25ed1b4cc?utm_campaign=shakespeare

const devMode = process.env.NODE_ENV !== 'production'

if (process.env.NODE_ENV === 'development') {
  module.exports = WebpackMerge.merge(ComConfig, {
    devtool: 'inline-source-map',
    target: devMode ? 'web' : 'browserslist',                  // 解决有 .browserslistrc 文件或者在 package.json 里面配置了 browserslist 字段，webpack-dev-server无法热更新的bug
    optimization: {
      minimizer: [
        new UglifyjsWebpackPlugin({                            // js压缩，删除空行、变成一行
          cache: true,                                         // 是否用缓存
          parallel: true,                                      // 是否并发压缩
          sourceMap: true                                      // 源码映射，会单独生成一个sourcemap文件。压缩后代码难以阅读，此项配置可以有一个没有压缩的源码映射，可以方便调试
        })
        // new OptimizeCssAssetsWebpackPlugin()                // 使用默认配置进行css压缩，删除空行、变成一行
      ]
    },
    devServer: {                                               // devServer配置会被webpack-dev-server使用，并从不同方面做定制（webpack-dev-server ^3.11.0 之前的版本，需使用 webpack-cli ^3.3.12）
      https: true,                                             // 开启https
      host: 'local.vuo.com',                                   // 主机
      port: 443,		                                           // 端口
      historyApiFallback: {
        rewrites: [{ from: /./, to: '/404.html' }]             // 用来应对返回404页面时定向到特定页面用的，当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
      },
      hot: true,                                               // 开启HMR功能
      inline: true,                                            //
      clientLogLevel: 'none',                                  // 禁止显示调试信息：当使用inline模式，控制台中将会输出调试信息，会让输出变得比较乱
      overlay: true,                                           // 编译出错时，在浏览器页面上显示错误
      stats: 'errors-only',                                    // 编译时的输出内容，没有设置时许多看似不重要的文件也被打印出来了，可以设置下，只打印错误
      progress: true,		                                       // 进度条
      contentBase: './dist',	                                 // 指定了服务器资源的根目录
      watchContentBase: true,                                  // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
      compress: true,		                                       // 是否启动gzip压缩对所有的服务器资源，优点：对JS，CSS资源的压缩率很高，可以极大得提高文件传输的速率，从而提升web性能  缺点：服务端要对文件进行压缩，而客户端要进行解压，增加了两边的负载
      open: false,                                             // 是否自动打开浏览器
      // hotOnly: true                                         // 如果模块热替换功能不生效，则不刷新网页
      proxy: {                                                 // 配置请求代理解决跨域
        '/api': {
          target: 'https://www.vuo.com',
          pathRewrite: { '/api': '' }
        }
      }
    },
    plugins: [
      new OptimizeCssAssetsWebpackPlugin()                     // 使用默认配置进行css压缩，删除空行、变成一行
    ]
  })
  return
}

if (process.env.NODE_ENV === 'production') {
  module.exports = WebpackMerge.merge(ComConfig, {
    devtool: 'inline-source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? 'css/index.[hash:8].css' : 'css/index.[hash:8].css' // 抽离css样式，指定css生成目录与文件名
      })
    ]
  })
}
