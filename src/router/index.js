/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
// import { clearLoginInfo } from '@/utils'

Vue.use(Router)
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/404',
    component: _import('modules/common/404'),
    name: '404',
    meta: { title: '404未找到' }
  },
  {
    path: '/home',
    component: _import('modules/front/home'),
    name: 'home',
    meta: { title: '首页' }
  },
  {
    path: '/login',
    component: _import('modules/front/login'),
    name: 'login',
    meta: { title: '登录' }
  },
  {
    path: '/register',
    component: _import('modules/front/register'),
    name: 'register',
    meta: { title: '注册' }
  },
  {
    path: '/forget',
    component: _import('modules/front/forget'),
    name: 'forget',
    meta: { title: '找回密码' }
  }
]

// const routes = [
//   {
//     path: '/',
//     redirect: '/backstage/authorizeList'
//   },
//   {
//     path: '/404',
//     component: _import('modules/common/404'),
//     name: '404',
//     meta: { title: '404未找到' }
//   },
//   {
//     path: '/login',
//     component: _import('modules/backstage/login'),
//     name: 'login',
//     meta: { title: '登录' }
//   },
//   {
//     path: '/backstage/:routeName',
//     name: 'backstage',
//     component: _import('modules/backstage/main')
//   }
// ]

// 配置公共路由
const router = new Router({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  next()
  // if (to.redirectedFrom === '/') {
  //   // 检测是否登录
  //   let token = Vue.cookie.get('token')
  //   if (!token || !/\S/.test(token)) {
  //     clearLoginInfo()
  //     next({ name: 'login' })
  //   }
  //   next()
  // } else {
  //   next()
  // }
})

export default router
