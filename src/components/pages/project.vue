<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <span slot="title">{{name}}</span>
      <!-- <span slot="right" class="screeningBtn" @click="goScreening()"></span> -->
    </m-header>
    <div class="page-content">
      <ul class="tabs">
        <li :class="{'curTab': curTab == info.id}" v-for="(info, index) in tabsList" :key="index" @click="changeTab(info)">{{info.name}}</li>
      </ul>
      <div id="main" style="width: 400px;height:400px;"></div>

      <div class="infoList">
        <div v-for="(item, index) in resultList" :key="item.index">
          <div class="title upBtn" :class="{'downBtn': item.isShowAll}" @click="item.isShowAll = !item.isShowAll">
            <div class="sub_1">{{item.rateName}}:{{item.rate}}</div>
            <div class="sub_1 text-center">{{item.status}}</div>
            <div class="sub_1 text-right">{{item.advice}}</div>
          </div>
          <ul class="list">
            <li v-if="item.isShowAll" v-for="(cont, index) in item.list" :key="index">{{cont}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from '../../../static/js/echarts.js'
export default {
 name:"main",
  data () {
    return {
      data: {},
      resultList: [
        {
          rateName: '溢租率',
          rate: '',
          status: '亏损',
          advice: '建议提升',
          isShowAll: false,
          list: []
        },
        {
          rateName: '客销度',
          rate: '',
          status: '亏损',
          advice: '建议提升',
          isShowAll: false,
          list: []
        },
        {
          rateName: '适配值',
          rate: '',
          status: '亏损',
          advice: '建议提升',
          isShowAll: false,
          list: []
        },
      ],
      name: '',
      curTab: 1,
      tabsList: [
        {
          name: '楼层',
          url: '/floor',
          id: this.$route.params.id
        },
        {
          name: '业态',
          url: '/formats',
          id: this.$route.params.id
        },
        {
          name: '品牌',
          url: '/brand',
          id: this.$route.params.id
        }
      ]
    }
  },
  created () {},
  methods: {
    getDetails(){
      this.id = this.$route.params.id
      var params = {}
      params.projectId = this.$route.params.id
      window.$findProjectTriangle(params).then((res) => {
        this.data = res
        this.drawTriangle()
        this.dataRecombined()
      }, (err) => {console.log(err)})
      this.name = this.$route.params.name
    },
    changeTab (info) {
      this.$router.push(info.url + '/' + info.id)
    },
    goScreening () {
      this.$router.push({path: '/screening/1'})
    },
    dataRecombined(){
      this.resultList[0].rate = this.data.triangleRent
      this.resultList[0].list.push(this.data.rentContent)
      if(this.resultList[0].rate < this.data.intervalRent.qd){
        this.resultList[0].status = '亏损'
      } else if(this.resultList[0].rate >= this.data.intervalRent.qd && this.resultList[0].rate < this.data.intervalRent.hl){
        this.resultList[0].status = '合理'
      } else if(this.resultList[0].rate >= this.data.intervalRent.hl && this.resultList[0].rate < this.data.intervalRent.ts){
        this.resultList[0].status = '提升'
      } else if(this.resultList[0].rate >= this.data.intervalRent.ts && this.resultList[0].rate < this.data.intervalRent.lh){
        this.resultList[0].status = '良好'
      } else {
        this.resultList[0].status = '优秀'
      }

      this.resultList[1].rate = this.data.triangleGuest
      this.resultList[1].list.push(this.data.guestContent)
      if(this.resultList[1].rate < this.data.intervalGuest.qd){
        this.resultList[1].status = '亏损'
      } else if(this.resultList[1].rate >= this.data.intervalGuest.qd && this.resultList[1].rate < this.data.intervalGuest.hl){
        this.resultList[1].status = '合理'
      } else if(this.resultList[1].rate >= this.data.intervalGuest.hl && this.resultList[1].rate < this.data.intervalGuest.ts){
        this.resultList[1].status = '提升'
      } else if(this.resultList[1].rate >= this.data.intervalGuest.ts && this.resultList[1].rate < this.data.intervalGuest.lh){
        this.resultList[1].status = '良好'
      } else {
        this.resultList[1].status = '优秀'
      }

      this.resultList[2].rate = this.data.triangleFitted
      this.resultList[2].list.push(this.data.fittedContent)
      if(this.resultList[2].rate < this.data.intervalFitted.qd){
        this.resultList[2].status = '亏损'
      } else if(this.resultList[2].rate >= this.data.intervalFitted.qd && this.resultList[2].rate < this.data.intervalFitted.hl){
        this.resultList[2].status = '合理'
      } else if(this.resultList[2].rate >= this.data.intervalFitted.hl && this.resultList[2].rate < this.data.intervalFitted.ts){
        this.resultList[2].status = '提升'
      } else if(this.resultList[2].rate >= this.data.intervalFitted.ts && this.resultList[2].rate < this.data.intervalFitted.lh){
        this.resultList[2].status = '良好'
      } else {
        this.resultList[2].status = '优秀'
      }
    },
    drawTriangle(){
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
        legend: {
          data:['流量','降雨量'],
          x: 'left'
        },
        parallelAxis: [
          {dim: 0, name: '溢租率(%)',min:this.data.intervalRent.ks,max:this.data.intervalRent.yx,
            axisLine:{
              lineStyle:{
                width:10,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.33, color: 'green' // 100% 处的颜色
                  },
                    {
                      offset: 0.66, color: 'yellow' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: 'red' // 0% 处的颜色
                    }],
                  globalCoord: true // 缺省为 false
                }
              }
            }
          },
          {dim: 1, name: '客销度',min:this.data.intervalGuest.ks,max:this.data.intervalGuest.yx,
            axisLine:{
              lineStyle:{
                width:10,
                color: {
                  type: '',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.25, color: 'green' // 100% 处的颜色
                  },
                    {
                      offset: 0.5, color: 'yellow' // 0% 处的颜色
                    },
                    {
                      offset: 0.75, color: 'white' // 0% 处的颜色
                    }],
                  globalCoord: true // 缺省为 false
                }
              }
            }
          },
          {dim: 2, name: '适配值',min:this.data.intervalFitted.ks,max:this.data.intervalFitted.yx,
            axisLine:{
              textStyle:{
                opacity:0.5
              },
              lineStyle:{
                width:10,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.33, color: 'green' // 100% 处的颜色
                  },
                    {
                      offset: 0.66, color: 'yellow' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: 'red' // 0% 处的颜色
                    }],
                  globalCoord: false // 缺省为 false
                }
              }
            }}
        ],
        parallel: {                         // 这是『坐标系』的定义
          left: '8%',                     // 平行坐标系的位置设置
          right: '8%',
          bottom: '20%',
          top: '20%',
          parallelAxisDefault: {          // 『坐标轴』的公有属性可以配置在这里避免重复书写
            type: 'value',
            nameLocation: 'end',
            nameGap: 20,
            opacity:0.6,
          }
        },
        series: [{
          type: 'parallel',
          lineStyle: {
            width: 3
          },
          data: [
            {
              value:[this.data.standardRent, this.data.standardGuest, this.data.standardFitted],
              lineStyle:{
                color:'blue'
              }
            },
            {
              value:[this.data.standardRent, null, this.data.standardFitted],
              lineStyle:{
                color:'blue'
              }
            }

          ]
        },{
          color:'#333',
          type: 'parallel',
          lineStyle: {
            width: 3
          },
          data: [
            {
              value:[this.data.triangleRent, this.data.triangleGuest, this.data.triangleFitted],
              lineStyle:{
                color:'red'
              }
            },
            {
              value:[this.data.triangleRent, null, this.data.triangleFitted],
              lineStyle:{
                color:'red'
              }
            }


          ]
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted(){
    this.getDetails()
  }
}
</script>
<style scoped lang="less">
.tabs{
  height: .9rem;
  line-height: .9rem;
  border-bottom: 1px solid #fffffb;
  margin: 0 .5rem;
  li{
    width: 33.333%;
    text-align: center;
    float: left;
    color: #fff;
    font-size: .3rem;
    font-weight: 300;
    position: relative;
    cursor: pointer;
  }
  li:after{
    content: '';
    position: absolute;
    bottom: 0.1rem;
    text-align: center;
    height: 1px;
    width: 0.25rem;
    background: #fff;
    border-radius: 10px;
    top: 0.45rem;
    right: -.2rem;
  }
  li:last-child:after{
    background: none;
  }
}
.infoList{
  margin-top: .2rem;
  padding: 0 .2rem;
  .title{
    height: .9rem;
    line-height: .9rem;
    padding-right: .45rem;
    display: flex;
    .sub_1{
      font-size: .3rem;
      flex: 1;
      color: #fff;
    }
  }
  .list{
    margin: 0 0.2rem;
    border-bottom: 1px solid #eee;
    li:first-child{
      padding-top: .25rem;
      border-top: 1px solid #eee;
    }
    li{
      line-height: .45rem;
      color: #fff;
      font-size: .3rem;
    }
    li:last-child{
      padding-bottom: .25rem;
    }
  }
}
</style>
