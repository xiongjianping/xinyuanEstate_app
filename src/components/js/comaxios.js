import Vue from 'vue'
import axios from 'axios'
// import { ERR_OK } from 'api/config'
var isRefresh = true


// axios.defaults.baseURL = "http://10.17.9.123:8080" // 本地
// axios.defaults.baseURL = "http://192.168.3.33:8080" // 测试

// axios.defaults.baseURL = "http://192.168.0.55:8080" // 正式
axios.defaults.baseURL = "http://sjll.vinfai.com:8080" // 正式


axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

async function requestInterceptor(config) {
    let token = window.localStorage.getItem('xinyuan_accesstoken')
    console.log('token: ' + token)
    config.headers['ACCESS-TOKEN'] = token
    return config
}

axios.interceptors.request.use(config => {
    return requestInterceptor(config)
})

async function responseInterceptor(response) {
    if (response.data.code === '0' || response.data.code === 0) {
        return response.data.data
    } else if (response.data.code === 'AOP_CHECK_TOKEN_003') { // token过期，刷新token
        console.log('token过期')
            // token过期, 刷新token
        if (isRefresh) {
            isRefresh = false
            let rToken = window.localStorage.getItem('xinyuan_refreshtoken')
            axios.get('/token/refresh/token/' + rToken)
                .then((res) => {
                    window.localStorage.setItem('xinyuan_accesstoken', res.accessToken)
                        // window.localStorage.setItem('xinyuan_refreshtoken', res.refreshToken)
                    window.location.reload()
                    isRefresh = true
                })
                .catch((err) => {
                    console.log(err)
                    isRefresh = true
                })
        }
        return Promise.reject(response.data.message)
    } else if (response.data.code === 'AOP_CHECK_TOKEN_002' ||
        response.data.code === 'SSO_LOGIN_002') { // token无效，踢出页面
        refreshApp()
    } else {
        return Promise.reject(response.data.message)
    }
}


// 设置拦截器
axios.interceptors.response.use(function(response) {
    return responseInterceptor(response)
})

async function refreshApp() {

    window.localStorage.clear()
    console.log('跳转登录页')
    if (window.location.href.indexOf('/region') < 0) {
        window.location.replace('/region')
    }
}
Vue.prototype.$axios = axios
