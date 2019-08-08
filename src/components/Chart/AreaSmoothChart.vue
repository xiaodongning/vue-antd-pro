<template>
  <div style="width:100%;height:100px">
    <v-chart :options="area" :autoresize="true" theme="light" />
  </div>
</template>

<script>
import 'echarts/lib/chart/line'
import moment from 'dayjs'
const data = []
const today = new Date().getTime()
for (let i = 0; i < 10; i++) {
  data.push(moment(new Date(today + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'))
}
export default {
  data() {
    return {
      area: {
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
          axisPointer: {
            type: 'none'
          }
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '0'
        },
        xAxis: {
          show: false,
          type: 'category',
          boundaryGap: false,
          data
        },
        yAxis: {
          type: 'value',
          show: false,
          minInterval: 1
        },
        series: [{
          data: [7, 5, 2, 6, 9, 1, 5, 6, 9, 1],
          type: 'line',
          smooth: true,
          showSymbol: false,
          itemStyle: {
            color: '#D0E9FF'
          },
          lineStyle: {
            color: '#58AFFF',
            width: 2
          },
          areaStyle: {
            color: '#D0E9FF'
          },
          tooltip: {
            textStyle: {
              color: '#333333'
            }
          }
        }]
      }
    }
  }
}

</script>
<style lang='less' scoped>

</style>
