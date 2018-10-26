<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <span slot="title">全国区域</span>
      <span slot="right" class="moreBtn"></span>
    </m-header>
    <div class="page-content">
      <div class="areaList">
        <div v-for="(info, index) in list" :key="index" class="area" @click="goProject(info)">
          <img :src="info.images" />
          <div class="name">{{info.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    var urlArr = window.location.href.split('&')
    for(var i = 0; i < urlArr.length; i++){
      if(urlArr[i].indexOf('thirdUserName') > 0){
        var arr = urlArr[i].split('=')
        var thirdUserName = arr[arr.length - 1]
        console.log(thirdUserName)
        this.submitForm(thirdUserName)
      }
    }
  },
  methods: {
    submitForm (formName) {
      var params = {
        thirdUserName: formName
      }
      window.$login(params).then((res) => {
        window.localStorage.setItem('xinyuan_accesstoken', res.accessToken)
        this.getAllArea()
      }, (err) => {
        console.log(err)
      })
    },
    getAllArea(){
      window.$findAllArea().then((res) => {
        this.list = res
        for(var i =0; i < this.list.length; i++) {
          this.list[i].images = require('../../assets/images/img/img' + (i + 1) + '.jpg')
        }
      }, (err) => {
        this.$toast({ message:err,duration: 3000});
      })
    },
    goProject (info) {
      this.$router.push({path: '/screening/' + info.id})
    },
    // showAlert: function (cont) {
    //   this.$alert(cont, '温馨提示', {
    //     confirmButtonText: '确定'
    //   })
    // }
  }
}
</script>
<style scoped lang="less">
.areaList{
  margin: 1rem .9rem;
  .area{
    width: 2.68rem;
    height: 2.68rem;
    float: left;
    margin-bottom: .34rem;
    position: relative;
    img{
      width: 100%;
    }
    .name{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;
      height: .58rem;
      line-height: .58rem;
      background: rgba(62, 148, 223, 0.5);
      color:#fff;
    }
  }
  .area:nth-child(2n){
    float: right;
  }
}
</style>
