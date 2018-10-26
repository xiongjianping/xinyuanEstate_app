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


      <div class="searchBox f-cb">
          <div class="f-fl">
              <el-date-picker
                class="input-class"
                size="mini"
                v-model="value_index_begin"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="生效日期"
                @change="dateChangeSelectCreate"
                ref="inputText" autofocus="autofocus" @focus="clickInput">
              </el-date-picker>
          </div>
          <div class="f-fl ml10">
              <el-date-picker
                class="input-class"
                size="mini"
                v-model="value_index_end"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                @change="dateChangeSelectEnd"
                ref="inputText1" @focus="clickInput">
              </el-date-picker>
          </div>
          <div class="f-fl ml20">
              <img class="left-padding-date" src="../../assets/images/search_show.png" alt="" @click="searchProjectData()">
          </div>
      </div>







      <div id="main" style="width: 400px;height:240px;"></div>


      <div class="ml20 mr20">
        <div class="name_title">标准三角形：</div>
          <el-row type="flex" class="ml20" justify="space-around">
            <el-col :span="6" class="name_title">{{triangData.standardRent}}</el-col>
            <el-col :span="6" class="name_title">{{triangData.standardGuest}}</el-col>
            <el-col :span="4" class="name_title">{{triangData.standardFitted}}</el-col>
          </el-row>
      </div>


      <div class="infoList">
        <div class="name_title">动态三角形：</div>
        <div v-for="(item, index) in resultList" :key="item.index">

          <div class="title upBtn" :class="{'downBtn': item.isShowAll}" @click="item.isShowAll = !item.isShowAll">
            <div class="sub_1">{{item.rateName}}:{{item.rate}}</div>
            <div class="sub_1 text-center">{{item.status}}</div>
            <div class="sub_1 text-right">{{item.advice}}</div>
          </div>

          <ul class="list">
            <!--<div class="g_text f-toe"  v-if="item.isShowAll && triangData.yzlState==4" v-for="(item, index) in triangData.yzl" :key="index">{{item.hl}}</div>-->
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.yzlState==1)" v-for="(cont, index) in item.list" :key="index">{{cont.yx}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.yzlState==2)" v-for="(cont, index) in item.list" :key="index">{{cont.lh}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.yzlState==3)" v-for="(cont, index) in item.list" :key="index">{{cont.ts}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.yzlState==4)" v-for="(cont, index) in item.list" :key="index">{{cont.hl}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.yzlState==5)" v-for="(cont, index) in item.list" :key="index">{{cont.ks}}</li>

            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.kxdState==1)" v-for="(cont, index) in item.list" :key="index">{{cont.yx}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.kxdState==2)" v-for="(cont, index) in item.list" :key="index">{{cont.lh}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.kxdState==3)" v-for="(cont, index) in item.list" :key="index">{{cont.ts}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.kxdState==4)" v-for="(cont, index) in item.list" :key="index">{{cont.hl}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.kxdState==5)" v-for="(cont, index) in item.list" :key="index">{{cont.ks}}</li>

            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.spzState==1)" v-for="(cont, index) in item.list" :key="index">{{cont.yx}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.spzState==2)" v-for="(cont, index) in item.list" :key="index">{{cont.lh}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.spzState==3)" v-for="(cont, index) in item.list" :key="index">{{cont.ts}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.spzState==4)" v-for="(cont, index) in item.list" :key="index">{{cont.hl}}</li>
            <li class="g_text f-toe" v-if="(item.isShowAll)&&(triangData.spzState==5)" v-for="(cont, index) in item.list" :key="index">{{cont.ks}}</li>
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
      value_index_begin:'',
      value_index_end:'',
      createTimeBegin: '',
      createTimeEnd: '',

      myChart:{},
      triangData: {},
      resultList: [
        {
          rateName: '溢租率',
          rate: '',
          status: '亏损',
          // advice: '建议提升',
          advice: '指令措施',
          isShowAll: false,
          list: []
        },
        {
          rateName: '客销度',
          rate: '',
          status: '亏损',
          // advice: '建议提升',
          advice: '指令措施',
          isShowAll: false,
          list: []
        },
        {
          rateName: '适配值',
          rate: '',
          status: '亏损',
          // advice: '建议提升',
          advice: '指令措施',
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

  created () {
      if( this.value_index_begin == "" || this.value_index_end == "") {
        this.getCurrentDateTime()
      }
  },
  watch:{

    // //下面这个triangData必须和接口的名字一样
    // triangData (val) {
    //   this.triangData = val
    //   this.drawTriangle()
    // }

    triangData(val) {
      // this.triangData = val
      // var option = window.$getEchartsOption(this.triangData)
      var option = this.getOption()

      this.myChart = echarts.init(document.getElementById('main'))
      this.myChart.setOption(option);
    },

  },

  mounted(){
      // this.getDetails()
      this.myChart = echarts.init(document.getElementById('main'))

      // var option = window.$getEchartsOption(this.triangData)
      var option = this.getOption()
      this.myChart.setOption(option)
  },



  methods: {

    clickInput(){
      this.$refs.inputText.blur();
      this.$refs.inputText1.blur();
    },

    dateChangeSelectCreate(){
      this.createTimeBegin = this.value_index_begin
    },

    dateChangeSelectEnd(){
      this.createTimeEnd = this.value_index_end
    },

    /**
     * 获取当前时间
     * 格式YYYY-MM-DD
     */
    getCurrentDateTime(){
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var strDateOld = strDate -1;

      console.log("strDate***："+strDate)
      console.log("strDateOld***："+strDateOld)

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }

      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      if (strDateOld >= 0 && strDateOld <= 9) {
        strDateOld = "0" + strDateOld;
      }


      var currentdateYesterday = year + seperator1 + month + seperator1 + strDateOld;
      var currentdateToday = year + seperator1 + month + seperator1 + strDate;

      // console.log("currentdateYesterday***："+currentdateYesterday)
      // console.log("currentdateToday***："+currentdateToday)

      this.createTimeBegin = currentdateYesterday+""
      this.createTimeEnd = currentdateToday+""
      console.log("当前的时间区间-默认值为："+this.createTimeBegin+","+this.createTimeEnd)

      this.getDetails()

    },

    searchProjectData(){
      console.log("开始刷新项目!!!")
      this.getDetails()
    },



    getDetails() {
      this.id = this.$route.params.id
      var params = {}

      params.projectId = this.$route.params.id
      window.$projectId = params.projectId

      params.createTime = this.createTimeBegin
      params.modifyTime = this.createTimeEnd
      console.log("传入项目接口的时间区间："+params.createTime+","+params.modifyTime)

      window.$findProjectTriangle(params).then((res) => {
        this.triangData = res
        console.log("项目接口数据res："+res)

        this.dataRecombined()
      }, (err) => {
        console.log(err)
        this.$toast({ message:err,duration: 3000});
      })
      this.name = this.$route.params.name
      // console.log("name--->"+this.$route.params.name)
    },

    changeTab (info) {
      this.$router.push(info.url + '/' + info.id)
    },
    goScreening () {
      this.$router.push({path: '/screening/1'})
    },

    dataRecombined(){
      //溢租率
      console.log("triangleRent--->"+this.triangData.triangleRent)
      console.log("triangData.yzlState--->"+this.triangData.yzlState)

      this.resultList[0].rate = this.triangData.triangleRent
      this.resultList[0].list = this.triangData.yzl
      if(this.triangData.yzlState==5){
        this.resultList[0].status = '亏损'
      } else if(this.triangData.yzlState==4){
        this.resultList[0].status = '合理'
      } else if(this.triangData.yzlState==3){
        this.resultList[0].status = '提升'
      } else if(this.triangData.yzlState==2){
        this.resultList[0].status = '良好'
      } else {
        this.resultList[0].status = '优秀'
      }

      // this.resultList[0].list.push(this.data.rentContent)
      // if(this.resultList[0].rate < this.data.intervalRent.qd){
      //   this.resultList[0].status = '亏损'
      // } else if(this.resultList[0].rate >= this.data.intervalRent.qd && this.resultList[0].rate < this.data.intervalRent.hl){
      //   this.resultList[0].status = '合理'
      // } else if(this.resultList[0].rate >= this.data.intervalRent.hl && this.resultList[0].rate < this.data.intervalRent.ts){
      //   this.resultList[0].status = '提升'
      // } else if(this.resultList[0].rate >= this.data.intervalRent.ts && this.resultList[0].rate < this.data.intervalRent.lh){
      //   this.resultList[0].status = '良好'
      // } else {
      //   this.resultList[0].status = '优秀'
      // }



      this.resultList[1].rate = this.triangData.triangleGuest
      console.log("triangData.kxdState--->"+this.triangData.kxdState)
      this.resultList[1].list = this.triangData.kxd
      if(this.triangData.kxdState==5){
        this.resultList[1].status = '亏损'
      } else if(this.triangData.kxdState==4){
        this.resultList[1].status = '合理'
      } else if(this.triangData.kxdState==3){
        this.resultList[1].status = '提升'
      } else if(this.triangData.kxdState==2){
        this.resultList[1].status = '良好'
      } else {
        this.resultList[1].status = '优秀'
      }

      // this.resultList[1].list.push(this.data.guestContent)
      // if(this.resultList[1].rate < this.data.intervalGuest.qd){
      //   this.resultList[1].status = '亏损'
      // } else if(this.resultList[1].rate >= this.data.intervalGuest.qd && this.resultList[1].rate < this.data.intervalGuest.hl){
      //   this.resultList[1].status = '合理'
      // } else if(this.resultList[1].rate >= this.data.intervalGuest.hl && this.resultList[1].rate < this.data.intervalGuest.ts){
      //   this.resultList[1].status = '提升'
      // } else if(this.resultList[1].rate >= this.data.intervalGuest.ts && this.resultList[1].rate < this.data.intervalGuest.lh){
      //   this.resultList[1].status = '良好'
      // } else {
      //   this.resultList[1].status = '优秀'
      // }



      this.resultList[2].rate = this.triangData.triangleFitted
      console.log("triangData.spzState--->"+this.triangData.spzState)
      this.resultList[2].list = this.triangData.spz
      if(this.triangData.spzState==5){
        this.resultList[2].status = '亏损'
      } else if(this.triangData.spzState==4){
        this.resultList[2].status = '合理'
      } else if(this.triangData.spzState==3){
        this.resultList[2].status = '提升'
      } else if(this.triangData.spzState==2){
        this.resultList[2].status = '良好'
      } else {
        this.resultList[2].status = '优秀'
      }

      // this.resultList[2].list.push(this.data.fittedContent)
      // if(this.resultList[2].rate < this.data.intervalFitted.qd){
      //   this.resultList[2].status = '亏损'
      // } else if(this.resultList[2].rate >= this.data.intervalFitted.qd && this.resultList[2].rate < this.data.intervalFitted.hl){
      //   this.resultList[2].status = '合理'
      // } else if(this.resultList[2].rate >= this.data.intervalFitted.hl && this.resultList[2].rate < this.data.intervalFitted.ts){
      //   this.resultList[2].status = '提升'
      // } else if(this.resultList[2].rate >= this.data.intervalFitted.ts && this.resultList[2].rate < this.data.intervalFitted.lh){
      //   this.resultList[2].status = '良好'
      // } else {
      //   this.resultList[2].status = '优秀'
      // }

    },


    // drawTriangle(){
    //   this.myChart = echarts.init(document.getElementById('main'));
    //
    //   if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
    //     this.myChart.dispose();
    //   }
    //
    //   var option = window.$getEchartsOption(this.triangData)
    //   // 使用刚指定的配置项和数据显示图表。
    //   this.myChart.setOption(option);
    // },


    getOption() {
      return {
        textStyle: {
          color: "white"
        },
        parallelAxis: [
          {
            dim: 0,
            name: '溢租率(%)',
            // min: this.triangData.intervalRent.ks,
            // max: this.triangData.intervalRent.yx,
            min: -100,
            max: 400,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                width: 10,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'blue',

                  }, {
                    offset: 0.33,
                    color: 'green' // 100% 处的颜色
                  },
                    {
                      offset: 0.66,
                      color: 'yellow' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'red' // 0% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              },
            }
          },
          {
            dim: 1,
            name: '客销度',
            // min: this.triangData.intervalGuest.ks,
            // max: this.triangData.intervalGuest.yx,
            min: 0,
            max: this.triangData.excellentPgeVal,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                width: 10,
                color: {
                  type: '',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.33,
                    color: 'green' // 100% 处的颜色
                  },
                    {
                      offset: 0.66,
                      color: 'yellow' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'red' // 0% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          },
          {
            dim: 2,
            name: '适配值',
            // min: this.triangData.intervalFitted.ks,
            // max: this.triangData.intervalFitted.yx,
            min: 0,
            max: 10000,
            color: "red",
            axisLine: {
              textStyle: {
                opacity: 0.5
              },
              lineStyle: {
                width: 10,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.33,
                    color: 'green' // 100% 处的颜色
                  },
                    {
                      offset: 0.66,
                      color: 'yellow' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'red' // 0% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }
        ],

        parallel: { // 这是『坐标系』的定义
          left: '10%', // 平行坐标系的位置设置
          right: '25%',
          bottom: '10%',
          top: '15%',
          parallelAxisDefault: { // 『坐标轴』的公有属性可以配置在这里避免重复书写
            type: 'value',
            nameLocation: 'end',
            nameGap: 20,
            opacity: 0.6,
          }
        },

        series: [{
          type: 'parallel',
          lineStyle: {
            width: 3
          },
          data: [{
            value: [this.triangData.standardRent > 400 ? 401 : (this.triangData.standardRent < -180 ? -181 : this.triangData.standardRent), this.triangData.standardGuest > this.triangData.excellentPgeVal ? this.triangData.excellentPgeVal + 1 : (this.triangData.standardGuest < 0 ? -1 : this.triangData.standardGuest), this.triangData.standardFitted > 10000 ? 10001 : (this.triangData.standardFitted < 0 ? -1 : this.triangData.standardFitted)],
            lineStyle: {
              color: '#fff'
            }
          },

            {
              value: [this.triangData.standardRent > 400 ? 401 : (this.triangData.standardRent < -180 ? -181 : this.triangData.standardRent), null, this.triangData.standardFitted > 10000 ? 10001 : (this.triangData.standardFitted < 0 ? -1 : this.triangData.standardFitted)],
              lineStyle: {
                color: '#fff'
              }
            }
          ]
        },
          {
            color: '#fff',
            type: 'parallel',
            lineStyle: {
              width: 3
            },
            data: [{
              value: [this.triangData.triangleRent > 400 ? 401 : (this.triangData.triangleRent < -180 ? -181 : this.triangData.triangleRent), this.triangData.triangleGuest > this.triangData.excellentPgeVal ? this.triangData.excellentPgeVal + 1 : (this.triangData.triangleGuest < 0 ? -1 : this.triangData.triangleGuest), this.triangData.triangleFitted > 10000 ? 10001 : (this.triangData.triangleFitted < 0 ? -1 : this.triangData.triangleFitted)],
              lineStyle: {
                color: 'yellow'
                // color: '#fff'
              }
            },
              {
                value: [this.triangData.triangleRent > 400 ? 401 : (this.triangData.triangleRent < -180 ? -181 : this.triangData.triangleRent), null, this.triangData.triangleFitted > 10000 ? 10001 : (this.triangData.triangleFitted < 0 ? -1 : this.triangData.triangleFitted)],
                lineStyle: {
                  color: 'yellow'
                  // color: '#fff'
                }
              }
            ]
          }]



      }
    },



  },

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
  .name_title{
    color: #fff;
    font-weight: bold;
  }
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

  .notes_list {
    &.standard{
      color: #08E9DF;
    }
    &.ranged{
      color: #ADF75C;
    }
    width: 575px;
    margin: 0 auto;
    padding-right: 66px;
    span {
      font-size: 14px;
      float: left;
      width: 25%;
      text-align: left;
    }
    i {
      display: inline-block ;

    }
  }

}

.name_title{
  color: #08E9DF;
  /*margin: 0.1rem!important;*/
  font-size: 0.3rem;
  font-style: normal;
  font-weight: bold;
}

</style>


<style lang="less">
  .input-class{
    .el-input__inner{
      width: 2.6rem;
      background-color: transparent;
      color: white;
      text-align: center;

    }

  }

  .searchBox{
    margin:0.2rem 0.5rem!important;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 2.7rem !important;
  }


  .left-padding-date {
    width: 0.7rem;
    height: 0.55rem;
  }

  .row-bg {
    padding: 0.1rem 0;
  }

</style>


