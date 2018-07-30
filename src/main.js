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
Vue.use(CacheNavigation, {router})
Vue.use(routeTranslate, {router, store})

Vue.config.productionTip = false
Vue.use(mintUI)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
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
