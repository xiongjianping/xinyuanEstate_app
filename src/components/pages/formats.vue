<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <span slot="title">业态</span>
    </m-header>
    <div class="page-content">
      <ul class="formatsList">
        <li :class="{'curformats': curformats == info.id}" v-for="(info, index) in formatsList" :key="index" @click="changeTab(info)">
          <p></p>
          <span>{{info.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curformats: 1,
      formatsList: [
        {
          name: '主力店',
          id: 1
        }, {
          name: '生活类',
          id: 2
        }, {
          name: '理疗类',
          id: 3
        }, {
          name: '餐饮类',
          id: 4
        }, {
          name: '娱乐类',
          id: 5
        }, {
          name: '体验类',
          id: 6
        }
      ]
    }
  },
  created () {
  },
  methods: {
    changeTab (info) {
      this.curformats = info.id
      this.$router.push({path: '/formatsDetails/' + info.id + '/' + info.name})
    },
    goScreening () {
      this.$router.push({path: '/screening'})
    }
  }
}
</script>
<style scoped lang="less">
.formatsList{
  padding: .3rem;
  li{
    width: 19%;
    background: #012a5e;
    margin: 0.12rem 3%;
    color: #dadada;
    text-align: center;
    float: left;
    font-size: 0.26rem;
    padding: 0.05rem 0;
    background: #fff;
    height: .5rem;
    position: relative;
    p{
      background: #012a5e;
      margin: 0 .05rem;
      height: .49rem;
      box-shadow: 0 0 5px #fff;
    }
    span{
      position: absolute;
      color: #fff;
      left: 0;
      top: .13rem;
      height: .3rem;
      display: block;
      width: 100%;
      background: #012a5e;
    }
  }
  li.curformats{
    background: #3e94df;
    color: #fff;
  }
}
</style>
