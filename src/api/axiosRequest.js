import Vue from 'vue'
import axios from 'axios'

/*
 * 登录
 * 
 * userName：用户名
 */
Vue.prototype.login = window.$login = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/app/sso/login', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

/*
 * 获取所有区域
 */
Vue.prototype.findAllArea = window.$findAllArea = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/apptriangle/find/area/all')
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

/*
 * 通过区域获取项目
 * 
 * areaId: 区域id
 */
Vue.prototype.findProjectByArea = window.$findProjectByArea = function(areaId) {
    return new Promise(function(resolve, reject) {
        axios.get('/apptriangle/find/project/by/area/' + areaId)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

/*
 * 项目三角理论
 * 
 * brandId: 品牌id
 * projectId: 项目id
 * floorId: 楼层id
 * businessFormId: 业态id
 */
Vue.prototype.findProjectTriangle = window.$findProjectTriangle = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/showtriangle/find/triangleproject/byprojectId', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

/*
 * 获取楼层列表
 * 
 * projectId: 项目id
 */
Vue.prototype.findFloorByProject = window.$findFloorByProject = function(projectId) {
    return new Promise(function(resolve, reject) {
        axios.get('/apptriangle/find/floor/by/project/' + projectId)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

/*
 * 楼层三角理论
 * 
 * projectId: 项目id
 * floorId: 楼层id
 */
Vue.prototype.findFloorTriangle = window.$findFloorTriangle = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/showtriangle/find/trianglefloor/byfloorId', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

/*
 * 业态列表
 * 
 * projectId: 项目id
 */
Vue.prototype.findFormate = window.$findFormate = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/apptriangle/find/Conditionlist/project', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

/*
 * 业态三角理论
 * 
 * projectId: 项目id
 * businessFormId: 业态id
 */
Vue.prototype.findFormateTriangle = window.$findFormateTriangle = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/showtriangle/find/trianglecondition/byconditionId', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

/*
 * 获取品牌
 * 
 * projectId: 项目id
 * floorId: 楼层id
 * businessFormId: 业态id
 */
Vue.prototype.findBrand = window.$findBrand = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/apptriangle/find/appbrand/list', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

/*
 * 品牌三角理论
 * 
 * projectId: 项目id
 * floorId: 楼层id
 * businessFormId: 业态id
 * brandId: 品牌id
 */
Vue.prototype.findBrandTriangle = window.$findBrandTriangle = function(params) {
    return new Promise(function(resolve, reject) {
        axios.post('/showtriangle/find/trianglebrand/byBrandId', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}