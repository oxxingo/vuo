'use strict'
const WebpackMerge = require('webpack-merge')
const CommonConfig = require('./config/common.config')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')    // 生产环境，自动压缩html、css、js压缩css，开发环境不会自动压缩。如果开发环境配置这个插件压缩css会导致js压缩失效，需要通过UglifyjsWebpackPlugin解决

if (process.env.NODE_ENV === 'development') {
  module.exports = WebpackMerge.merge(CommonConfig, {
    devServer: {                                                          // webpack-dev-server ^3.11.0 之前的版本，需使用 webpack-cli ^3.3.12
      hot: true,                                                          // 开启HMR功能
      https: true,                                                        // 开启https
      // host: 'local.vuo.com',                                              // 主机
      // port: 443,		                                                      // 端口
      progress: true,		                                                  // 进度条
      contentBase: './dist',	                                            // 用于运行打包后的静态资源目录
      compress: true,		                                                  // 启动gzip压缩，让代码体积更好，速度更快
      open: false,                                                        // 是否自动打开浏览器
      proxy: {                                                            // 配置请求代理解决跨域
        '/api': {
          target: 'https://www.vuo.com',
          pathRewrite: { '/api': '' }
        }
      }
    },
    plugins: [
      new OptimizeCssAssetsWebpackPlugin()                                // 使用默认配置进行css压缩，删除空行、变成一行
    ]
  })
} else {
  module.exports = WebpackMerge.merge(CommonConfig, {

  })
}

