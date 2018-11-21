<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <!--<span slot="title" @click="showAllData()" class="play_downBtn">{{title}}</span>-->
      <span slot="title">{{title}}</span>
    </m-header>
    <div class="page-content">




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






      <div class="statistical">
        <div id="main" style="width: 400px;height:240px;"></div>
      </div>

      <!--<div class="infoList">-->
        <!--<span>标准：</span>-->
        <!--<span>-->
              <!--<i>{{triangData.standardRent}}</i>-->
          <!--</span>-->
        <!--<span>-->
              <!--<i>{{triangData.standardGuest}}</i>-->
          <!--</span>-->
        <!--<span>-->
              <!--<i>{{triangData.standardFitted}}</i>-->
          <!--</span>-->
      <!--</div>-->

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
        <div v-for="(item, index) in resultList" :key="index">
          <div class="title upBtn" :class="{'downBtn': item.isShowAll}" @click="item.isShowAll = !item.isShowAll">
            <div class="sub_1">{{item.rateName}}:{{item.rate}}</div>
            <div class="sub_1 text-center">{{item.status}}</div>
            <div class="sub_1 text-right">{{item.advice}}</div>
          </div>
          <ul class="list">
            <!--<li v-if="item.isShowAll" v-for="(cont, index) in item.list" :key="index">{{cont}}</li>-->
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

      value_index_begin:'',
      value_index_end:'',
      createTimeBegin: '',
      createTimeEnd: '',

      myChart:{},
      popupVisible4: false,
      temporaryData: {},
      title: '',
      curTab: 1,
      formatsList: window.$formatsList,
      triangData:{},
      resultList: [
        {
          rateName: '溢租率',
          rate: '',
          status: '亏损',
          advice: '指令措施',
          isShowAll: false,
          list: []
        },
        {
          rateName: '客销度',
          rate: '',
          status: '亏损',
          advice: '指令措施',
          isShowAll: false,
          list: []
        },
        {
          rateName: '适配值',
          rate: '',
          status: '亏损',
          advice: '指令措施',
          isShowAll: false,
          list: []
        },
      ],
    }
  },
  components: {
    selectData
  },
  created () {
    this.id = this.$route.params.id
    this.title = this.$route.params.name

    if( this.value_index_begin == "" || this.value_index_end == "") {
      this.getCurrentDateTime()
    }
  },
  // watch:{
  //   data (val) {
  //     this.data = val
  //     this.drawTriangle()
  //   }
  // },


  watch:{
    triangData(val) {
      var option = this.getOption()
      this.myChart = echarts.init(document.getElementById('main'))
      this.myChart.setOption(option);
    },
  },

  mounted(){
    this.myChart = echarts.init(document.getElementById('main'))
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

      // this.getDetails()

    },

    searchProjectData(){
      console.log("开始刷新项目!!!")
      this.getDetails()
    },



    getDetails(){
      var params = {
        projectId: this.$route.params.id,
      }
      params.createTime = this.createTimeBegin
      params.modifyTime = this.createTimeEnd
      params.formId = this.$route.params.megabiteId
      console.log("传入项目接口的时间区间："+params.createTime+","+params.modifyTime)

      // window.$findFormateTriangle({projectId: window.$projectId, businessFormId: this.id}).then((res) => {
        window.$findFormateTriangle(params).then((res) => {
        this.triangData = res

        this.dataRecombined()

      }, (err) => {
          console.log(err)
          this.$toast({ message:err,duration: 3000});
        })
    },

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
      if(this.id !== this.temporaryData.id){
        this.id = this.temporaryData.id
        this.getDetails()
      }
    },
    // dataRecombined(){
    //   this.resultList[0].rate = this.data.triangleRent
    //   this.resultList[0].list.push(this.data.rentContent)
    //   if(this.resultList[0].rate < this.data.intervalRent.qd){
    //     this.resultList[0].status = '亏损'
    //   } else if(this.resultList[0].rate >= this.data.intervalRent.qd && this.resultList[0].rate < this.data.intervalRent.hl){
    //     this.resultList[0].status = '合理'
    //   } else if(this.resultList[0].rate >= this.data.intervalRent.hl && this.resultList[0].rate < this.data.intervalRent.ts){
    //     this.resultList[0].status = '提升'
    //   } else if(this.resultList[0].rate >= this.data.intervalRent.ts && this.resultList[0].rate < this.data.intervalRent.lh){
    //     this.resultList[0].status = '良好'
    //   } else {
    //     this.resultList[0].status = '优秀'
    //   }
    //
    //   this.resultList[1].rate = this.data.triangleGuest
    //   this.resultList[1].list.push(this.data.guestContent)
    //   if(this.resultList[1].rate < this.data.intervalGuest.qd){
    //     this.resultList[1].status = '亏损'
    //   } else if(this.resultList[1].rate >= this.data.intervalGuest.qd && this.resultList[1].rate < this.data.intervalGuest.hl){
    //     this.resultList[1].status = '合理'
    //   } else if(this.resultList[1].rate >= this.data.intervalGuest.hl && this.resultList[1].rate < this.data.intervalGuest.ts){
    //     this.resultList[1].status = '提升'
    //   } else if(this.resultList[1].rate >= this.data.intervalGuest.ts && this.resultList[1].rate < this.data.intervalGuest.lh){
    //     this.resultList[1].status = '良好'
    //   } else {
    //     this.resultList[1].status = '优秀'
    //   }
    //
    //   this.resultList[2].rate = this.data.triangleFitted
    //   this.resultList[2].list.push(this.data.fittedContent)
    //   if(this.resultList[2].rate < this.data.intervalFitted.qd){
    //     this.resultList[2].status = '亏损'
    //   } else if(this.resultList[2].rate >= this.data.intervalFitted.qd && this.resultList[2].rate < this.data.intervalFitted.hl){
    //     this.resultList[2].status = '合理'
    //   } else if(this.resultList[2].rate >= this.data.intervalFitted.hl && this.resultList[2].rate < this.data.intervalFitted.ts){
    //     this.resultList[2].status = '提升'
    //   } else if(this.resultList[2].rate >= this.data.intervalFitted.ts && this.resultList[2].rate < this.data.intervalFitted.lh){
    //     this.resultList[2].status = '良好'
    //   } else {
    //     this.resultList[2].status = '优秀'
    //   }
    // },


    dataRecombined(){

      this.resultList[0].rate = this.triangData.triangleRent
      this.resultList[0].list = this.triangData.yzl
      // this.resultList[0].list.push(this.triangData.yzl)
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

      this.resultList[1].rate = this.triangData.triangleGuest
      this.resultList[1].list = this.triangData.kxd
      console.log("triangData.kxdState--->"+this.triangData.kxdState)
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

      this.resultList[2].rate = this.triangData.triangleFitted
      this.resultList[2].list = this.triangData.spz
      console.log("triangData.spzState--->"+this.triangData.spzState)
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


    },



    // drawTriangle(){
    //   this.myChart = echarts.init(document.getElementById('main'));
    //   var option = window.$getEchartsOption(this.data)
    //   // 使用刚指定的配置项和数据显示图表。
    //   this.myChart.setOption(option);
    // }

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
            value: [this.triangData.standardRent > 400 ? 401 : (this.triangData.standardRent < -100 ? -101 : this.triangData.standardRent), this.triangData.standardGuest > this.triangData.excellentPgeVal ? this.triangData.excellentPgeVal + 0.001 : (this.triangData.standardGuest < 0 ? 0 : this.triangData.standardGuest), this.triangData.standardFitted > 10000 ? 10001 : (this.triangData.standardFitted < 0 ? 0 : this.triangData.standardFitted)],
            lineStyle: {
              color: '#fff'
            }
          },

            {
              value: [this.triangData.standardRent > 400 ? 401 : (this.triangData.standardRent < -100 ? -101 : this.triangData.standardRent), null, this.triangData.standardFitted > 10000 ? 10001 : (this.triangData.standardFitted < 0 ? 0 : this.triangData.standardFitted)],
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
              value: [this.triangData.triangleRent > 400 ? 401 : (this.triangData.triangleRent < -100 ? -101 : this.triangData.triangleRent), this.triangData.triangleGuest > this.triangData.excellentPgeVal ? this.triangData.excellentPgeVal + 0.0001 : (this.triangData.triangleGuest < 0 ? 0 : this.triangData.triangleGuest), this.triangData.triangleFitted > 10000 ? 10001 : (this.triangData.triangleFitted < 0 ? 0 : this.triangData.triangleFitted)],
              lineStyle: {
                color: 'yellow'
                // color: '#fff'
              }
            },
              {
                value: [this.triangData.triangleRent > 400 ? 401 : (this.triangData.triangleRent < -100 ? -101 : this.triangData.triangleRent), null, this.triangData.triangleFitted > 10000 ? 10001 : (this.triangData.triangleFitted < 0 ? 0 : this.triangData.triangleFitted)],
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

  // mounted(){
  //   this.getDetails()
  // }


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


<!--<style lang="less">-->
  <!--.input-class{-->
    <!--.el-input__inner{-->
      <!--width: 2.6rem;-->
      <!--background-color: transparent;-->
      <!--color: white;-->
      <!--text-align: center;-->

    <!--}-->

  <!--}-->

  <!--.searchBox{-->
    <!--margin:0.2rem 0.5rem!important;-->
  <!--}-->
  <!--.el-date-editor.el-input, .el-date-editor.el-input__inner{-->
    <!--width: 130px;-->
  <!--}-->

  <!--.left-padding-date {-->
    <!--width: 0.7rem;-->
    <!--height: 0.55rem;-->
  <!--}-->

  <!--.row-bg {-->
    <!--padding: 0.1rem 0;-->
  <!--}-->

<!--</style>-->




