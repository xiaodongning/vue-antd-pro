<template>
  <div style="position:relative">
    <div style="width:calc(100% - 240px);height:325.5px">
      <v-chart ref="pie" :options="area" :autoresize="true" computed-options="getOption" theme="light" />
    </div>
    <!-- 此处可添加点击事件操作图表的data数据 达到图片自带的legend组件效果 -->
    <ul class="legend">
      <li v-for="item in legend" :key="item.name">
        <span class="dot" :style="{backgroundColor:item.color}" />
        <span class="item-name">{{ item.name }}</span>
        <a-divider type="vertical" />
        <span class="item-percent">{{ item.value }}</span>
        <span class="item-money">￥ {{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie'
import moment from 'dayjs'
const data = []
const today = new Date().getTime()
for (let i = 0; i < 10; i++) {
  data.push(moment(new Date(today + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'))
}
export default {
  data() {
    return {
      legend: [],
      total: 0,
      area: {
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return `<span class="chart-tooltip" style="background-color:${params.color}"></span>
                    <i class="tip-text">${params.name}</i>
                    <i class="tip-text">${params.value}</i>`
          },
          backgroundColor: 'rgba(255,255,255,0.7)',
          textStyle: {
            color: 'rgba(0,0,0,.85)'
          },
          extraCssText: 'box-shadow: 0 0 10px rgba(174, 174, 174);'
        },
        radiusAxis: {
          interval: 20,
          nameGap: 15
        },
        color: ['#37A2DA', '#67E0E3', '#FFDB5C', '#ff9f7f', '#E062AE'],
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: true,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            borderWidth: 5, // 设置border的宽度有多大
            borderColor: '#fff'
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }]
      }
    }
  },
  computed: {
    computedOptions(val) {
      return val
    }
  },
  mounted() {
    const pie = this.$refs.pie
    const option = pie.computedOptions
    this.legend = this.getData(option)
    pie.mergeOptions({
      series: {
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ]
      }
    })
  },
  methods: {
    getData(option) {
      const color = option.color
      const data = option.series[0].data
      const arr = []
      for (let i = 0; i < data.length; i++) {
        this.total += data[i].value
        arr.push({
          color: color[i],
          value: data[i].value,
          name: data[i].name
        })
      }
      return arr
    }
  }
}

</script>
<style lang='less' scoped>
.legend{
  position: absolute;
  min-width: 200px;
  padding:0;
  margin:0 20px;
  top:50%;
  right:0;
  transform: translateY(-50%);
  li{
    height:22px;
    line-height: 22px;
    margin-bottom:16px;
    cursor:pointer;
    .dot{
      position: relative;
      top:-1px;
      display: inline-block;
      width:8px;
      height:8px;
      margin-right:8px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .item-name{
      color:rgba(0, 0, 0, .65);
    }
    .item-percent{
      color:rgba(0, 0, 0, .45);
    }
    .item-money{
      position: absolute;
      right:0;
    }
  }

}

</style>
