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
      // axios.post('/showtriangle/find/triangleproject/byprojectId', params)
      axios.post('/sy/get/project', params)
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
 * 通过项目id 获取楼栋(GET)
 */
Vue.prototype.getBuilding = window.$getBuilding = function(projectId) {
  return new Promise(function(resolve, reject) {
    axios.get('/region/find/building/project/' + projectId)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        console.log(error);
        reject(error)
      });
  })
}


/*
 * 通过楼栋获取楼层(GET)
 */
Vue.prototype.getFloorForBuilding = window.$getFloorForBuilding = function(buildingId) {
  return new Promise(function(resolve, reject) {
    axios.get('/region/find/floor/by/building/' + buildingId)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        console.log(error);
        reject(error)
      });
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
      // axios.post('/showtriangle/find/trianglefloor/byfloorId', params)
      axios.post('/sy/get/floor', params)
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
 * 获取业种下拉列表
 */
Vue.prototype.getSpeciesSelect = window.$getSpeciesSelect = function(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/base/find/business/species/select/' + id)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        console.log(error);
        reject(error)
      });
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
        // axios.post('/showtriangle/find/trianglecondition/byconditionId', params)
        axios.post('sy/get/yetai', params)
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
        // axios.post('/apptriangle/find/appbrand/list', params)
        axios.post('/brand/find/contract', params)
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
        // axios.post('/showtriangle/find/trianglebrand/byBrandId', params)
        axios.post('/sy/get/brand', params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}
