import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'                   // 让不同浏览器在渲染网页元素的时候形式更统一，相比于传统的CSS reset,它是一种现代的、为HTML5准备的优质替代方案。是一种CSS reset的替代方案

import Element from 'element-ui'
import '@/styles/element-variables.scss'

import '@/styles/index.scss'
import '@/styles/global.css'

import App from './App.vue'
import store from './store'
import router from './router'

import './icons'
import './permission'
import './utils/error-log'

import * as filters from './filters'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])                       // 注册全局过滤器
})

Vue.config.productionTip = false

// vue有两种形式的代码 compiler（模板）模式和runtime模式（运行时）  https://blog.csdn.net/wxl1555/article/details/83187647
// compiler
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })

// runtime
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')                                 // 把App.vue组件替换index.html中的id='app'元素
