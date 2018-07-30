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