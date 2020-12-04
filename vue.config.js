'use strict'
const WebpackMerge = require('webpack-merge')
const CommonConfig = require('./config/common.config')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')  // 生产环境，自动压缩html、css、js压缩css，开发环境不会自动压缩。如果开发环境配置这个插件压缩css会导致js压缩失效，需要通过UglifyjsWebpackPlugin解决

if (process.env.NODE_ENV === 'development') {
  module.exports = WebpackMerge.merge(CommonConfig, {
    devServer: {                                               // devServer配置会被webpack-dev-server使用，并从不同方面做定制（webpack-dev-server ^3.11.0 之前的版本，需使用 webpack-cli ^3.3.12）
      https: true,                                             // 开启https
      host: 'local.vuo.com',                                   // 主机
      port: 443,		                                           // 端口
      historyApiFallback: {                                    // 用来应对返回404页面时定向到特定页面用的
        rewrites: [{ from: /./, to: '/error.html' }]
      },
      hot: true,                                               // 开启HMR功能
      inline: true,                                            //
      clientLogLevel: 'none',                                  // 禁止显示调试信息：当使用inline模式，控制台中将会输出调试信息，会让输出变得比较乱
      overlay: true,                                           // 编译出错时，在浏览器页面上显示错误
      stats: 'errors-only',                                    // 编译时的输出内容，没有设置时许多看似不重要的文件也被打印出来了，可以设置下，只打印错误
      progress: true,		                                       // 进度条
      contentBase: './public',	                               // 指定了服务器资源的根目录
      watchContentBase: true,                                  // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
      compress: true,		                                       // 是否启动gzip压缩对所有的服务器资源，优点：对JS，CSS资源的压缩率很高，可以极大得提高文件传输的速率，从而提升web性能  缺点：服务端要对文件进行压缩，而客户端要进行解压，增加了两边的负载
      open: false,                                             // 是否自动打开浏览器
      before: require('./mock/mock-server.js'),                // 在 webpack-dev-server 静态资源中间件处理之前，拦截部分请求返回特定内容
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
} else {
  module.exports = WebpackMerge.merge(CommonConfig, {

  })
}

