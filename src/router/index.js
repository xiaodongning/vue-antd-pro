import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'icon-dashboard' }
      }
    ]
  },
  {
    path: '/leads',
    component: Layout,
    redirect: '/leads/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'Leads',
        meta: { title: '名单跟进', icon: 'icon-solution' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/basic-form',
    meta: { title: '表单页', icon: 'icon-form' },
    children: [
      {
        path: 'basic-form',
        component: () => import('@/views/list/index'),
        name: 'BasicForm',
        meta: { title: '基础表单' }
      },
      {
        path: 'step-form',
        component: () => import('@/views/list/index'),
        name: 'StepForm',
        meta: { title: '分步表单' }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/edit-table',
    meta: { title: '列表和表格', icon: 'icon-unorderedlist' },
    children: [
      {
        path: 'edit-table',
        component: () => import('@/views/list/edit-table'),
        name: 'EditTable',
        meta: { title: 'Table内编辑' }
      },
      {
        path: 'complex-table',
        component: () => import('@/views/list/complex-table'),
        name: 'ComplexTable',
        meta: { title: '综合实例' }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})
