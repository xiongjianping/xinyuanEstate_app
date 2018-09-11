
<template>
  <div class="page">
    <m-header>
      <span slot="left" class="backBtn"></span>
      <span slot="title">品牌</span>
    </m-header>
    <div class="page-content">
      <div class="type-box f-cb pt15 pb15">
        <p class="type-title f-fl">项目：</p>
        <span class="f-fl pro-name">{{this.curProjectName }}</span>

      </div>
      <div class="type-box f-cb">
        <p class="type-title f-fl brandName_title">楼层：</p>
        <ul class="f-cb f-fl floor-type">
          <li class="f-fl" :class="{'active': curfloor == info.id}" v-for="(info, index) in floorList" :key="index" @click="changefloor(info)">
            {{info.name}}
          </li>
        </ul>
      </div>

      <div class="type-box f-cb">
        <p class="type-title f-fl brandName_title">业态：</p>

        <ul class="f-cb f-fl format-type">
          <li class="f-fl" :class="{'active': curformats == info.id}" v-for="(info, index) in formatsList" :key="index" @click="changeformats(info)">
            {{info.name}}
          </li>
        </ul>
      </div>
      <div class="type-box f-cb">
        <p class="type-title f-fl brandName_title">业种：</p>

        <ul class="f-cb f-fl category-type">
          <li class="f-fl" :class="{'active': curcategory == info.id}" v-for="(info, index) in categoryList" :key="index" @click="changeCategory(info)">
           {{info.name}}
          </li>
        </ul>
      </div>
      <div class="type-box f-cb">
        <p class="type-title f-fl brandName_title">品牌：</p>

        <ul class=" f-fl brand-type">
          <li class="f-fl" :class="{'active': curbrand_yyh == info.id}" v-for="(info, index) in brandList" :key="index" @click="goLink(info)">

            {{info.name}}
          </li>
        </ul>
      </div>


      <!--<ul class="brandList pt30">-->
        <!--<li class="curbrand"-->
        <!--:class="{'style1': info.type == 1, 'style2': info.type == 2, 'style3': info.type == 3, 'style4': info.type == 4,}"
        v-for="(info, index) in brandList" :key="index" @click="goLink(info)">-->
          <!--<p class="bg"></p>-->
          <!--<span>{{info.floorName}}</span>-->
          <!--<p class="brandName">{{info.name}}</p>-->
        <!--</li>-->
      <!--</ul>-->

      <!--<ul class="styleType">-->
        <!--<li><span class="style1"></span>服装类</li>-->
        <!--<li><span class="style2"></span>生活类</li>-->
        <!--<li><span class="style3"></span>医疗类</li>-->
        <!--<li><span class="style4"></span>娱乐类</li>-->
      <!--</ul>-->

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
      curcategory:1,
      curbrand_yyh:1,
      buildingId:'',
      curProjectName:'',

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
      ],
      categoryId:'',
      categoryList: {},
    }
  },
  created () {
    console.log("brand.vue品牌*当前项目名称："+window.$curProjectName)
    this.curProjectName = window.$curProjectName
    this.getAllFloor()
  },
  methods: {
    getAllFloor(){

      window.$getBuilding(this.$route.params.id).then((res) => {
        this.buildingId = res[0].id
        console.log("***app-当前楼栋id为：" + res[0].id)
      }, (err) => {console.log(err)})


      window.$findFloorByProject(this.$route.params.id).then((res) => {
        this.floorList = res
        this.curfloor = res[0].id
        window.$findFormate({projectId: this.$route.params.id, floorId: this.curfloor}).then((res) => {
          this.formatsList = res
          this.curformats = res[0].id

          window.$getSpeciesSelect(this.curformats).then((res) => {
            this.categoryList = res
            this.curcategory = res[0].id

              window.$findBrand({projectId: this.$route.params.id, floorId: this.curfloor, businessFormId: this.curformats}).then((res) => {
                this.brandList = res
                this.curbrand_yyh = res[0].id

            }, (err) => {console.log(err)})
          }, (err) => {console.log(err)})
        }, (err) => {console.log(err)})
      }, (err) => {console.log(err)})
    },


    changefloor (info) {
      this.curfloor = info.id
      console.log("curfloor:"+info.id)
      window.$findFormate({projectId: this.$route.params.id, floorId: info.id}).then((res) => {
        this.formatsList = res
        console.log("formatsList:"+res[0].name)
      }, (err) => {console.log(err)})
    },

    changeformats (info) {
      this.curformats = info.id
      console.log("curformats:"+info.id)//业态id

      // window.$findBrand({projectId: this.$route.params.id, floorId: this.curfloor, businessFormId: info.id}).then((res) => {
      //   this.brandList = res
      //   console.log("brandList:"+res[0].name)//系统异常
      // }, (err) => {console.log(err)})

      window.$getSpeciesSelect(this.curformats).then((res) => {
          console.log("业种列表------>"+res)
          this.categoryList = res
      }, (err) => {console.log(err)})

    },

    changeCategory (info) {
      this.curcategory = info.id
      window.$findBrand({projectId: this.$route.params.id, floorId: this.curfloor, businessFormId: info.id}).then((res) => {
        this.brandList = res
      }, (err) => {console.log(err)})
    },


    goLink (info) {

      window.$brandList = this.brandList
      console.log("品牌id-项目id-楼层id-业态id-业种id-楼栋id-业种id-楼栋id"+info.id + '/' + this.$route.params.id + '/' + this.curfloor + '/' + this.curformats)
      this.$router.push({path: '/brandDetails/' + info.id + '/' + info.name + '/' + this.$route.params.id + '/' + this.curfloor
        + '/' + this.curformats+ '/' + this.curcategory+ '/' + this.buildingId})

    },


    goScreening () {
      this.$router.push({path: '/screening'})
    }

  }
}
</script>



<style lang="less" scoped>
  .page-content{
    box-sizing: border-box;
    padding: 0 0.2rem;
    .type-box{
      .type-title{
        color: #fff;
        font-size: 0.28rem;
        height: 0.5rem;
        line-height: 0.5rem;
        width: 0.88rem;
      }
      .pro-name{
        height: 0.5rem;
        line-height: 0.5rem;
        color: #fff;
        font-size: 0.28rem;
      }
      ul{
        width: 6.1rem;
        &.floor-type{
          li.active{
            background: #41a0f2;
          }
        }
        &.format-type{
          li.active{
            background: #5f5acb;

          }
        }
        &.category-type{

          li.active{
            background: #4cca64;

          }
        }
        &.brand-type{

          li.active{
            background: #f22893;

          }
        }
        li{
          color: #fff;
          font-size: 0.28rem;
          width: 1.84rem;
          height: 0.5rem;
          line-height: 0.5rem;
          margin-left: 0.2rem;
          text-align: center;
          background: #012a5e;
          margin-bottom: 0.15rem;
          border: 1px solid #fff;

          &:nth-child(3n+1){
            margin-left: 0;
          }

        }
      }
    }


  }

/*.styleType{*/
  /*height: 1rem;*/
  /*padding-top: 1rem;*/
  /*li{*/
    /*float: left;*/
    /*width: 20%;*/
    /*margin-left: 5%;*/
    /*color: #fff;*/
    /*text-align: center;*/
    /*span{*/
      /*height: 15px;*/
      /*width: 15px;*/
      /*display: block;*/
      /*border-radius: 15px;*/
      /*display: block;*/
      /*position: relative;*/
      /*top:.34rem;*/
    /*}*/
  /*}*/
  /*.style1{*/
    /*background: #ff4083;*/
  /*}*/
  /*.style2{*/
    /*background: #3f51b5;*/
  /*}*/
  /*.style3{*/
    /*background: #259a25;*/
  /*}*/
  /*.style4{*/
    /*background: #b2cb94;*/
  /*}*/
/*}*/
/*.brandList{*/
  /*padding: 0.1rem .3rem;*/
  /*margin-top:.1rem;*/
  /*clear: both;*/
  /*li{*/
    /*width: 19%;*/
    /*float: left;*/
    /*font-size: 0.26rem;*/
    /*padding: 0.05rem 0;*/
    /*color: #fff;*/
    /*min-height: .5rem;*/
    /*margin: 0.02rem 3%;*/
    /*text-align: center;*/
    /*position: relative;*/
    /*overflow: visible;*/
    /*span{*/
      /*position: absolute;*/
      /*color: #fff;*/
      /*left: 0;*/
      /*top: .13rem;*/
      /*height: .3rem;*/
      /*display: block;*/
      /*width: 100%;*/
    /*}*/
  /*}*/
  /*li.curbrand{*/
    /*background: #fff;*/
    /*p.bg{*/
      /*background: #012a5e;*/
      /*margin: 0 .05rem;*/
      /*height: .49rem;*/
      /*box-shadow: 0 0 5px #fff;*/
    /*}*/
    /*p.brandName{*/
      /*color: #fff;*/
      /*height: .4rem;*/
      /*line-height: .4rem;*/
      /*position: absolute;*/
      /*bottom: -.45rem;*/
      /*text-align: center;*/
      /*width: 100%;*/
    /*}*/
    /*span{*/
      /*position: absolute;*/
      /*color: #fff;*/
      /*left: 0;*/
      /*top: .13rem;*/
      /*height: .3rem;*/
      /*display: block;*/
      /*width: 100%;*/
      /*background: #012a5e;*/
    /*}*/
  /*}*/
  /*li.curbrand.style1{*/
    /*background: #ff4083;*/
  /*}*/
  /*li.curbrand.style2{*/
    /*background: #3f51b5;*/
  /*}*/
  /*li.curbrand.style3{*/
    /*background: #259a25;*/
  /*}*/
  /*li.curbrand.style4{*/
    /*background: #b2cb94;*/
  /*}*/

/*}*/

  /*.brandName_title{*/
    /*color: #fff;*/
    /*margin: 0.1rem!important;;*/
    /*font-size: 0.3rem;*/
  /*}*/


</style>
