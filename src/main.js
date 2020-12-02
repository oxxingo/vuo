import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss'

import App from './App'
// import store from './store'
import router from './router'

import i18n from './lang'
import './icons'
// import './permission'
import './utils/error-log'

import * as filters from './filters'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')                                 // 把App.vue组件替换index.html中的id='app'元素
