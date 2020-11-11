'use strict'
const WebpackMerge = require('webpack-merge')

const common = {
  WSURL: 'ws://10.45.25.29/api/ws/notify',
  APP_VERSION: 0,
  TEMPLATE: '"https://www.xoxo.com/common/template.xlsx"'
}

const sit = WebpackMerge.merge(common, {
  NODE_ENV: '"sit"',
  BASEURL: '"https://xoxo-uat.xoxo.com"'
})

const uat = WebpackMerge.merge(common, {
  NODE_ENV: '"uat"',
  BASEURL: '"https://xoxo-uat.xoxo.com"'
})

const prd = WebpackMerge.merge(common, {
  NODE_ENV: '"prd"',
  BASEURL: '"https://xoxo-uat.xoxo.com"'
})

module.exports =  {
  sit, uat, prd
}
