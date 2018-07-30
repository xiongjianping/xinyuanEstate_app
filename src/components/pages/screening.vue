<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <span slot="title">我的项目</span>
      <span slot="right" class="moreBtn"></span>
    </m-header>
    <div class="page-content">
      <mt-search v-model="value">
        <ul class="projectList">
          <li v-for="(info,index) in list" :key="index" @click="goLink(info)">{{info.name}}</li>
        </ul>
      </mt-search>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '项目',
      list: [
        {
          name: '项目一',
          id: 1
        }, {
          name: '项目二',
          id: 2
        }, {
          name: '项目三',
          id: 3
        }, {
          name: '项目四',
          id: 4
        }
      ]
    }
  },
  created () {
  },
  methods: {
    changeTab (info) {
      this.curTab = info.id
    },
    goLink (info) {
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
