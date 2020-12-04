import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect'] // 白名单 本地登录（/login）三方登录（/auth-redirect）

router.beforeEach(async (to, from, next) => {
  debugger
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  // 用户是否已登录
  if (getToken()) {
    // 如果已登录，则重定向到主页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 用户是否通过getInfo获取了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) next()
      else {
        try {
          // 获取用户信息，roles必须是数组：['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
          // 基于角色生成可访问路由图
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) next()
    else next('/login') // next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})

router.afterEach(() => { NProgress.done() })
