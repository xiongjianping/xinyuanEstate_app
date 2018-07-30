<template>
  <div class="page" v-if="pickerData">
    <mt-picker :slots="mySlots" :itemHeight="40" @change="onChange"></mt-picker>
  </div>
</template>
<script>
export default {
  props: [
    'data'
  ],
  data () {
    return {
      pickerData: [],
      mySlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: this.pickerData,
          textAlign: 'center'
        }
      ]
    }
  },
  activated () {
  },
  mounted () {
    this.data.forEach((info) => {
      this.pickerData.push(info.name)
    })
    this.mySlots[0].values = this.pickerData
  },
  methods: {
    chooseInfo (values) {
      this.$emit('chooseInfo', values)
    },
    onChange (picker, values) {
      this.chooseInfo(this.data[this.getInfoIndex(values[0], this.data)])
    },
    getInfoIndex (name, list) {
      var curIndex = ''
      var isTrue = true
      list.forEach(function (info, index) {
        if (isTrue) {
          if (info.name === name) {
            curIndex = index
            isTrue = false
          }
        }
      })
      return curIndex
    }
  }
}
</script>
<style lang="less" scoped>
.page{
  top: 1rem;
}
.picker-slot{
  font-size: .3rem!important;
}
</style>
