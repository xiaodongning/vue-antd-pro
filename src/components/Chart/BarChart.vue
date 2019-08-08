<template>
  <div style="width:100%;height:100px">
    <v-chart :options="bar" :autoresize="true" theme="light" />
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
import moment from 'dayjs'
const dataX = []; const dataY = []
const today = new Date().getTime()
for (let i = 0; i < 17; i++) {
  dataX.push(moment(new Date(today + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'))
  dataY.push(Math.round(Math.random() * 10) + 1)
}
export default {
  data() {
    return {
      bar: {
        color: ['#3AA0FF'],
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            return `<span class="chart-tooltip" style="background-color:${params[0].color}"></span>
                    <i class="tip-text">${params[0].name}</i>
                    <i class="tip-text">${params[0].value}</i>`
          },
          backgroundColor: 'rgba(255,255,255,0.7)',
          textStyle: {
            color: 'rgba(0,0,0,.85)'
          },
          extraCssText: 'box-shadow: 0 0 10px rgba(174, 174, 174);',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '0',
          containLabel: false
        },
        xAxis: {
          show: false,
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: dataX
        },
        yAxis: {
          type: 'value',
          show: false,
          minInterval: 1
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: dataY
          }
        ]
      }
    }
  }
}

</script>
<style lang='less' scoped>

</style>
