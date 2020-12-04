// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

// /* 布局 */
// import Layout from '@/layout'

// /*
//   hidden: true                   如果设置为true，则不会在侧边栏中显示该项（默认为false）
//   alwaysShow: true               如果设置为true，将始终显示根菜单，如果未设置alwaysShow，则当项目有多个子路线时，它将变成嵌套模式，否则不显示根菜单
//   redirect: noRedirect           如果取值 noRedirect将不会在breadcrumb中重定向
//   name:'router-name'             如果路由想被 <keep-alive> 缓存，必须设置该项
//   meta : {
//     roles: ['admin','editor']    控制页面角色（可以设置多个角色），如果不设置角色，则表示：此页面不需要权限
//     title: 'title'               侧栏和面包屑中显示的名称
//     icon: 'svg-name'/'el-icon-x' 图标显示在侧栏中
//     noCache: true                如果设置为true，则不会缓存该页（默认值为false）
//     affix: true                  如果设置为true，则标记将附加在tags视图中
//     breadcrumb: false            如果设置为false，则项目将隐藏在breadcrumb中（默认值为true）
//     activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
//   }
//  */

// // 没有权限要求的页面，所有角色都可以访问
// export const constantRoutes = [
//   {
//     path: '/redirect',
//     component: Layout,
//     hidden: true,
//     children: [
//       {
//         path: '/redirect/:path(.*)',
//         component: () => import('@/views/redirect/index')
//       }
//     ]
//   },
//   {
//     path: '/login',
//     component: () => import('@/views/login/index'),
//     hidden: true
//   },
//   {
//     path: '/auth-redirect',
//     component: () => import('@/views/login/auth-redirect'),
//     hidden: true
//   },
//   {
//     path: '/404',
//     component: () => import('@/views/error-page/404'),
//     hidden: true
//   },
//   {
//     path: '/401',
//     component: () => import('@/views/error-page/401'),
//     hidden: true
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     children: [
//       {
//         path: 'dashboard',
//         component: () => import('@/views/dashboard/index'),
//         name: 'Dashboard',
//         meta: { title: 'dashboard', icon: 'dashboard', affix: true }
//       }
//     ]
//   }
// ]

// // 需要根据用户角色所拥有的权限，动态加载的路由
// export const asyncRoutes = [
//   { path: '*', redirect: '/404', hidden: true } // 404页必须放在末尾，因为 * 匹配所有
// ]

// const createRouter = () => new Router({
//   // mode: 'history', 默认hash，如果指定history需要后端服务支持
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
// })

// const router = createRouter()

// export function resetRouter() {
//   const newRouter = createRouter()
//   // 重置路由器
//   router.matcher = newRouter.matcher
// }

// export default router
