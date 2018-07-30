
<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <span slot="title">品牌</span>
    </m-header>
    <div class="page-content">
      <ul class="brandList">
        <li :class="{'curbrand': curfloor == info.id}" v-for="(info, index) in floorList" :key="index" @click="changefloor(info)">
          <p class="bg"></p>
          <span>{{info.name}}</span>
        </li>
      </ul>
      <ul class="brandList">
        <li :class="{'curbrand': curformats == info.id}" v-for="(info, index) in formatsList" :key="index" @click="changeformats(info)">
          <p class="bg"></p>
          <span>{{info.name}}</span>
        </li>
      </ul>
      <ul class="brandList pt30">
        <li class="curbrand"
        :class="{'style1': info.type == 1, 'style2': info.type == 2, 'style3': info.type == 3, 'style4': info.type == 4,}" v-for="(info, index) in brandList" :key="index" @click="goLink(info)">
          <p class="bg"></p>
          <span>{{info.floorName}}</span>
          <p class="brandName">{{info.name}}</p>
        </li>
      </ul>
      <ul class="styleType">
        <li><span class="style1"></span>服装类</li>
        <li><span class="style2"></span>生活类</li>
        <li><span class="style3"></span>医疗类</li>
        <li><span class="style4"></span>娱乐类</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curbrand: 1,
      curfloor: 1,
      curformats: 1,
      floorList: [
        {
          name: '全部',
          id: 1
        },
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
      ],
      formatsList: [
        {
          name: '全部',
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
      ],
      brandList: [
        {
          floorName: '1001',
          name: '阿迪达斯',
          id: 1,
          type: 1
        }, {
          floorName: '1002',
          name: '屈臣氏',
          id: 2,
          type: 2
        }, {
          floorName: '1003',
          name: '梦妆',
          id: 3,
          type: 3
        }, {
          floorName: '1004',
          name: '4D电影',
          id: 4,
          type: 4
        }
      ]
    }
  },
  created () {
    this.getAllFloor()
  },
  methods: {
    getAllFloor(){
      window.$findFloorByProject(this.$route.params.id).then((res) => {
        this.floorList = res
        this.curfloor = res[0].id
        window.$findFormate({projectId: this.$route.params.id, floorId: this.curfloor}).then((res) => {
          this.formatsList = res
          this.curformats = res[0].id
          window.$findBrand({projectId: this.$route.params.id, floorId: this.curfloor, businessFormId: this.curformats}).then((res) => {
            this.brandList = res
          }, (err) => {console.log(err)})
        }, (err) => {console.log(err)})
      }, (err) => {console.log(err)})
    },
    changefloor (info) {
      this.curfloor = info.id
      window.$findFormate({projectId: this.$route.params.id, floorId: info.id}).then((res) => {
        this.formatsList = res
      }, (err) => {console.log(err)})
    },
    changeformats (info) {
      this.curformats = info.id
      window.$findBrand({projectId: this.$route.params.id, floorId: this.curfloor, businessFormId: info.id}).then((res) => {
        this.brandList = res
      }, (err) => {console.log(err)})
    },
    goLink (info) {
      window.$brandList = this.brandList
      this.$router.push({path: '/brandDetails/' + info.id + '/' + info.name + '/' + this.$route.params.id + '/' + this.curfloor + '/' + this.curformats})
    },
    goScreening () {
      this.$router.push({path: '/screening'})
    }
  }
}
</script>
<style scoped lang="less">
.styleType{
  height: 1rem;
  padding-top: 1rem;
  li{
    float: left;
    width: 20%;
    margin-left: 5%;
    color: #fff;
    text-align: center;
    span{
      height: 15px;
      width: 15px;
      display: block;
      border-radius: 15px;
      display: block;
      position: relative;
      top:.34rem;
    }
  }
  .style1{
    background: #ff4083;
  }
  .style2{
    background: #3f51b5;
  }
  .style3{
    background: #259a25;
  }
  .style4{
    background: #b2cb94;
  }
}
.brandList{
  padding: 0.1rem .3rem;
  margin-top:.1rem;
  clear: both;
  li{
    width: 19%;
    float: left;
    font-size: 0.26rem;
    padding: 0.05rem 0;
    color: #fff;
    min-height: .5rem;
    margin: 0.02rem 3%;
    text-align: center;
    position: relative;
    overflow: visible;
    span{
      position: absolute;
      color: #fff;
      left: 0;
      top: .13rem;
      height: .3rem;
      display: block;
      width: 100%;
    }
  }
  li.curbrand{
    background: #fff;
    p.bg{
      background: #012a5e;
      margin: 0 .05rem;
      height: .49rem;
      box-shadow: 0 0 5px #fff;
    }
    p.brandName{
      color: #fff;
      height: .4rem;
      line-height: .4rem;
      position: absolute;
      bottom: -.45rem;
      text-align: center;
      width: 100%;
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
  li.curbrand.style1{
    background: #ff4083;
  }
  li.curbrand.style2{
    background: #3f51b5;
  }
  li.curbrand.style3{
    background: #259a25;
  }
  li.curbrand.style4{
    background: #b2cb94;
  }
}
</style>
