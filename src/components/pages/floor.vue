<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <span slot="title">楼层</span>
    </m-header>
    <div class="page-content">
      <ul class="floorList">
        <li :class="{'curFloor': curFloor == info.id}" v-for="(info, index) in floorList" :key="index" @click="changeTab(info)">
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
      // curFloor: 1,
      floorId: "",
      curFloor: "",

      floorList: [
        {
          name: '1F',
          id: 1
        }, {
          name: '2F',
          id: 2
        }, {
          name: '3F',
          id: 3
        }, {
          name: '4F',
          id: 4
        }, {
          name: '5F',
          id: 5
        }, {
          name: '6F',
          id: 6
        }
      ]
    }
  },
  created () {
    this.getFloor()
  },
  methods: {
    getFloor(){
      // window.$findFloorByProject(this.$route.params.id).then((res) => {
      //   window.$floorList = this.floorList = res
      //   this.curFloor = res[0].id
      // }, (err) => {console.log(err)})

      window.$getBuilding(this.$route.params.id).then((res) => {

        console.log("***app-当前楼栋列表的数据：" + res)

        this.curFloor = res[0].id

        console.log("***app-当前楼栋id为：" + res[0].id)

        window.$getFloorForBuilding(this.curFloor).then((res) => {
              window.$floorList = this.floorList = res
              console.log("***app-当前楼层列表的数据：" + res)


          }, (err) => {console.log(err)})
      }, (err) => {console.log(err)})
    },

    changeTab (info) {
      // this.curFloor = info.id
      this.floorId = info.id
      // this.$router.push({path: '/floorDetails/' + info.id + '/' + info.name})
      this.$router.push({path: '/floorDetails/' + this.$route.params.id + '/' + info.name + '/' + this.curFloor+ '/' + this.floorId})
    },
    goScreening () {
      this.$router.push({path: '/screening'})
    }
  }
}
</script>
<style scoped lang="less">
.floorList{
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
  li.curFloor{
    background: #3e94df;
    color: #fff;
  }
}
</style>
