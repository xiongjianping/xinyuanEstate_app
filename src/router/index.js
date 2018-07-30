import Vue from 'vue'

import Router from 'vue-router'
import region from '@/components/pages/region' // 地区
import project from '@/components/pages/project' // 项目
import screening from '@/components/pages/screening' // 项目筛选
import floor from '@/components/pages/floor.vue' // 楼层
import formats from '@/components/pages/formats.vue' // 业态
import brand from '@/components/pages/brand.vue' // 品牌
import floorDetails from '@/components/pages/floorDetails.vue' // 楼层详情
import formatsDetails from '@/components/pages/formatsDetails.vue' // 业态详情
import brandDetails from '@/components/pages/brandDetails.vue' // 品牌详情
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'region',
      component: region
    }, {
      path: '/project/:id/:name',
      name: 'project',
      component: project
    }, {
      path: '/screening/:id',
      name: 'screening',
      component: screening
    }, {
      path: '/floor',
      name: 'floor',
      component: floor
    }, {
      path: '/formats',
      name: 'formats',
      component: formats
    }, {
      path: '/brand',
      name: 'brand',
      component: brand
    }, {
      path: '/brandDetails/:id/:name',
      name: 'brandDetails',
      component: brandDetails
    }, {
      path: '/formatsDetails/:id/:name',
      name: 'formatsDetails',
      component: formatsDetails
    }, {
      path: '/floorDetails/:id/:name',
      name: 'floorDetails',
      component: floorDetails
    }
  ]
})
