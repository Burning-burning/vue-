<template>
  <div><div class="main" ref="main"></div></div>
</template>

<script>
import * as echarts from 'echarts'
import { money } from '../../network/xiaoshou'
export default {
  name: '',
  data() {
    return { totalPriceMoney: [] }
  },

  async mounted() {
    const res = await money()
    console.log(res)
    this.totalPriceMoney = res
    var myChart = echarts.init(this.$refs.main)
    myChart.setOption({
      title: {
        text: '客房类型销售统计'
      },
      tooltip: {},
      xAxis: {
        data: this.totalPriceMoney.map(r => r.roomtypeName)
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: this.totalPriceMoney.map(r => r.totalMoney)
        }
      ]
    })
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 600px;
  height: 500px;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
