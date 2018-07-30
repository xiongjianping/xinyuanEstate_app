<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <span slot="title" @click="showAllData()" class="play_downBtn">{{title}}</span>
    </m-header>
    <div class="page-content">
      <div class="statistical">
        <div id="main" style="width: 400px;height:400px;"></div>
      </div>
      <div class="infoList">
        <div v-for="item in infoList" :key="item.id">
          <div class="title upBtn" :class="{'downBtn': item.isShowAll}" @click="item.isShowAll = !item.isShowAll">
            <div class="sub_1">{{item.rateName}}:{{item.rate}}</div>
            <div class="sub_1 text-center">{{item.status}}</div>
            <div class="sub_1 text-right">{{item.advice}}</div>
          </div>
          <ul class="list">
            <li v-if="item.isShowAll" v-for="(cont, index) in item.list" :key="index">{{cont.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup">
      <div class="btns"><p class="cancel" @click="closePopup">取消</p><p class="confirm" @click="setTitle">确定</p></div>
      <select-data :data="formatsList" v-if="popupVisible4" @chooseInfo="chooseInfo"></select-data>
    </mt-popup>
  </div>
</template>
<script>
import selectData from '../../common/select.vue'
import echarts from '../../../static/js/echarts.js'
export default {
  data () {
    return {
      popupVisible4: false,
      temporaryData: {},
      title: '',
      curTab: 1,
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
      ],
      infoList: [
        {
          id: 1,
          rateName: '溢租率',
          rate: '80',
          status: '亏损',
          advice: '建议提升',
          isShowAll: false,
          list: [
            {
              name: 'E1：短期下调租金培育品牌经营'
            }, {
              name: 'E2：辅助品牌经营'
            }, {
              name: 'E3：分析品牌下降原因'
            }, {
              name: 'E4：下调租金'
            }, {
              name: 'E5：品牌淘汰'
            }
          ]
        }, {
          id: 2,
          rateName: '客销率',
          rate: '300',
          status: '亏损',
          advice: '建议提升',
          isShowAll: false,
          list: [
            {
              name: 'E1：短期下调租金培育品牌经营'
            }, {
              name: 'E2：辅助品牌经营'
            }, {
              name: 'E3：分析品牌下降原因'
            }, {
              name: 'E4：下调租金'
            }, {
              name: 'E5：品牌淘汰'
            }
          ]
        }, {
          id: 3,
          rateName: '适配值',
          rate: '3300',
          status: '亏损',
          advice: '建议提升',
          isShowAll: false,
          list: [
            {
              name: 'E1：短期下调租金培育品牌经营'
            }, {
              name: 'E2：辅助品牌经营'
            }, {
              name: 'E3：分析品牌下降原因'
            }, {
              name: 'E4：下调租金'
            }, {
              name: 'E5：品牌淘汰'
            }
          ]
        }
      ]
    }
  },
  components: {
    selectData
  },
  created () {
    this.id = this.$route.params.id
    this.title = this.$route.params.name
  },
  methods: {
    showAllData () {
      this.popupVisible4 = true
    },
    changeTab (info) {
      this.$router.push({path: info.url})
    },
    chooseInfo (info) {
      this.temporaryData = info
    },
    closePopup () {
      this.popupVisible4 = false
    },
    setTitle () {
      this.title = this.temporaryData.name
      this.closePopup()
    }
  },
  mounted(){
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
      legend: {
        data:['流量','降雨量'],
        x: 'left'
      },
      parallelAxis: [
        {dim: 0, name: '溢租率(%)',min:-100,max:100,
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
        {dim: 1, name: '客销率',min:-50,max:200,
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
        {dim: 2, name: '适配度',min:0,max:8000,
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
            value:[-20, 130, 3600],
            lineStyle:{
              color:'blue'
            }
          },
          {
            value:[-20, null,3600],
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
            value:[-45, 180, 6000],
            lineStyle:{
              color:'red'
            }
          },
          {
            value:[-45, null, 6000],
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
