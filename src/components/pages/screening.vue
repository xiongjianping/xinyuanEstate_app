<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <span slot="title">我的项目</span>
      <span slot="right" class="moreBtn"></span>
    </m-header>
    <div class="page-content">
      <mt-search v-model="value" placeholder="请输入项目名称" @keyup.enter.native="search"></mt-search>
      <ul class="projectList">
        <li v-for="(info,index) in resultList" :key="index" @click="goLink(info)">{{info.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      list: [],
      resultList: []
    }
  },
  created () {
    this.resultList = this.list
    this.getProjects()
  },
  methods: {
    search(){
      this.resultList = []
      if(this.value != ''){
        for(var i = 0; i < this.list.length; i++){
          if(this.list[i].name.indexOf(this.value) != -1){
            this.resultList.push(this.list[i])
          }
        }
      } else {
        this.resultList = this.list
      }
    },
    getProjects(){
      window.$findProjectByArea(this.$route.params.id).then((res) => {
        this.list = res
        this.resultList = this.list
      }, (err) => {})
    },
    changeTab (info) {
      this.curTab = info.id
    },
    goLink (info) {
      window.$projectId = info.id
      this.$router.push({path: '/project/' + info.id + '/' + info.name})
    }
  }
}
</script>
<style scoped lang="less">
.page-content{
  background: #29304d;
}
.projectList{
  li{
    height: .88rem;
    line-height: .88rem;
    padding: 0 0.2rem;
    font-size: 0.3rem;
    background: url(../../assets/images/next.png) no-repeat 97% center, url(../../assets/images/play_fill.png) no-repeat left center;
    background-size: 0.18rem, 0.34rem;
    box-shadow: 0 0 15px #5890cb;
    margin: .4rem;
    border-radius: 10px;
    color: #fff;
    padding-left: .4rem;
  }
}
</style>
