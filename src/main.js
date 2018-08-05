// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import rem from './config/rem.js'
import mintUI from 'mint-ui'
import axios from 'axios'
import store from './store/'
import './common/mrHeader/components.js'
import 'mint-ui/lib/style.css'
import routeTranslate from './config/routeTranslate'
import CacheNavigation from './config/cacheNavigation'
import echarts from 'echarts'
import './components/js/comaxios.js'
import './api/axiosRequest.js'

Vue.use(CacheNavigation, { router })
Vue.use(routeTranslate, { router, store })

Vue.config.productionTip = false
Vue.use(mintUI)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.getEchartsOption = window.$getEchartsOption = function(data){
    return {
        parallelAxis: [
          {dim: 0, name: '溢租率(%)',min:data.intervalRent.ks,max:data.intervalRent.yx,
            axisLine:{
              lineStyle:{
                width:10,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.33, color: 'green' // 100% 处的颜色
                  },
                    {
                      offset: 0.66, color: 'yellow' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: 'red' // 0% 处的颜色
                    }],
                  globalCoord: true // 缺省为 false
                }
              }
            }
          },
          {dim: 1, name: '客销度',min:data.intervalGuest.ks,max:data.intervalGuest.yx,
            axisLine:{
              lineStyle:{
                width:10,
                color: {
                  type: '',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.25, color: 'green' // 100% 处的颜色
                  },
                    {
                      offset: 0.5, color: 'yellow' // 0% 处的颜色
                    },
                    {
                      offset: 0.75, color: 'white' // 0% 处的颜色
                    }],
                  globalCoord: true // 缺省为 false
                }
              }
            }
          },
          {dim: 2, name: '适配值',min:data.intervalFitted.ks,max:data.intervalFitted.yx,
            axisLine:{
              textStyle:{
                opacity:0.5
              },
              lineStyle:{
                width:10,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.33, color: 'green' // 100% 处的颜色
                  },
                    {
                      offset: 0.66, color: 'yellow' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: 'red' // 0% 处的颜色
                    }],
                  globalCoord: false // 缺省为 false
                }
              }
            }}
        ],
        parallel: {                         // 这是『坐标系』的定义
          left: '8%',                     // 平行坐标系的位置设置
          right: '8%',
          bottom: '20%',
          top: '20%',
          parallelAxisDefault: {          // 『坐标轴』的公有属性可以配置在这里避免重复书写
            type: 'value',
            nameLocation: 'end',
            nameGap: 20,
            opacity:0.6,
          }
        },
        series: [{
          type: 'parallel',
          lineStyle: {
            width: 3
          },
          data: [
            {
              value:[data.standardRent, data.standardGuest, data.standardFitted],
              lineStyle:{
                color:'blue'
              }
            },
            {
              value:[data.standardRent, null, data.standardFitted],
              lineStyle:{
                color:'blue'
              }
            }

          ]
        },{
          color:'#333',
          type: 'parallel',
          lineStyle: {
            width: 3
          },
          data: [
            {
              value:[data.triangleRent, data.triangleGuest, data.triangleFitted],
              lineStyle:{
                color:'red'
              }
            },
            {
              value:[data.triangleRent, null, data.triangleFitted],
              lineStyle:{
                color:'red'
              }
            }


          ]
        }]
      }
}

Vue.prototype.projectId = window.$projectId = ''
Vue.prototype.floorId = window.$floorId = ''
Vue.prototype.formatsId = window.$formatsId = ''
Vue.prototype.floorList = window.$floorList = ''
Vue.prototype.formatsList = window.$formatsList = ''
Vue.prototype.brandList = window.$brandList = ''

if (window.device && window.device.model === 'iPhone10,3') {
    window.eventBus.$emit('iPhoneXClass') // 更新样式
}
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    rem,
    store,
    echarts,
    components: { App },
    template: '<App/>'
})