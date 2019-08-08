<template>
  <div>
    <a-row :gutter="24" style="margin-bottom:24px;">
      <a-col :span="6">
        <card-chart title="总销售额" total="¥ 126,560">
          <template>
            <div class="card-content-analysis" style="margin-right:16px;">
              <div>
                <span>周同比</span>
                <span>12%</span>
                <icon-font class="icon icon-up" type="icon-caret-up" />
              </div>
            </div>
            <div class="card-content-analysis">
              <div>
                <span>日同比</span>
                <span>11%</span>
                <icon-font class="icon icon-down" type="icon-caret-down" />
              </div>
            </div>
          </template>
          <template slot="footer">
            <div>
              <span>日销售额</span>
              <span>￥12,423</span>
            </div>
          </template>
        </card-chart>
      </a-col>
      <a-col :span="6">
        <card-chart title="访问量" total="8,846">
          <template>
            <area-chart />
          </template>
          <template slot="footer">
            <div>
              <span>日访问量</span>
              <span>1,234</span>
            </div>
          </template>
        </card-chart>
      </a-col>
      <a-col :span="6">
        <card-chart title="支付笔数" total="6560">
          <template>
            <bar-chart />
          </template>
          <template slot="footer">
            <div>
              <span>转化率</span>
              <span>60%</span>
            </div>
          </template>
        </card-chart>
      </a-col>
      <a-col :span="6">
        <card-chart title="运营活动效果" total="78%">
          <template>
            <mini-progress :target="50" :percentage="40" />
          </template>
          <template slot="footer">
            <div class="card-content-analysis" style="margin-right:16px;">
              <div>
                <span>周同比</span>
                <span>12%</span>
                <icon-font class="icon icon-up" type="icon-caret-up" />
              </div>
            </div>
            <div class="card-content-analysis">
              <div>
                <span>日同比</span>
                <span>11%</span>
                <icon-font class="icon icon-down" type="icon-caret-down" />
              </div>
            </div>
          </template>
        </card-chart>
      </a-col>
    </a-row>
    <a-card
      class="ant-pro-card-tabs"
      style="width:100%"
      :body-style="{padding:'0'}"
    >
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="销售额">
          <a-row>
            <a-col :span="16">
              <div class="ant-pro-scalebar">
                <div>
                  <h4>销售趋势</h4>
                  <div style="width:100%;height:254px">
                    <v-chart :options="bar" :autoresize="true" theme="light" />
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="ant-pro-sale">
                <div>
                  <h4>门店销售额排名</h4>
                  <ul class="ant-pro-list">
                    <li>
                      <span class="ant-pro-list-rank">1</span>
                      <span class="ant-pro-list-item">滨江店 1 号店</span>
                      <span class="ant-pro-list-number">323,234</span>
                    </li>
                    <li>
                      <span class="ant-pro-list-rank">1</span>
                      <span class="ant-pro-list-item">滨江店 1 号店</span>
                      <span class="ant-pro-list-number">323,234</span>
                    </li>
                    <li>
                      <span class="ant-pro-list-rank">1</span>
                      <span class="ant-pro-list-item">滨江店 1 号店</span>
                      <span class="ant-pro-list-number">323,234</span>
                    </li>
                    <li>
                      <span class="ant-pro-list-rank">1</span>
                      <span class="ant-pro-list-item">滨江店 1 号店</span>
                      <span class="ant-pro-list-number">323,234</span>
                    </li>
                    <li>
                      <span class="ant-pro-list-rank">1</span>
                      <span class="ant-pro-list-item">滨江店 1 号店</span>
                      <span class="ant-pro-list-number">323,234</span>
                    </li>
                    <li>
                      <span class="ant-pro-list-rank">1</span>
                      <span class="ant-pro-list-item">滨江店 1 号店</span>
                      <span class="ant-pro-list-number">323,234</span>
                    </li>
                    <li>
                      <span class="ant-pro-list-rank">1</span>
                      <span class="ant-pro-list-item">滨江店 1 号店</span>
                      <span class="ant-pro-list-number">323,234</span>
                    </li>
                  </ul>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="访问量" force-render>Content of Tab Pane 2</a-tab-pane>
        <div slot="tabBarExtraContent" class="ant-pro-tabs-extra-wrap">
          <div class="ant-pro-tabs-extra-date">
            <a class="ant-pro-tabs-extra-active">
              <span>今日</span>
            </a>
            <a>
              <span>本周</span>
            </a>
            <a>
              <span>本月</span>
            </a>
            <a>
              <span>全年</span>
            </a>
          </div>
          <a-range-picker
            :default-value="[moment('2019/01/01', dateFormat), moment('2019/12/01', dateFormat)]"
            :format="dateFormat"
            style="width:256px;"
          />
        </div>
      </a-tabs>
    </a-card>
    <a-row type="flex" :gutter="24" style="margin-top:24px;">
      <a-col :span="12">
        <a-card title="线上热门搜索">
          <a-row :gutter="64" style="margin-bottom:24px;">
            <a-col :span="12">
              <div class="ant-pro-dashboard-info">
                <span class="ant-pro-dashboard-subtitle">
                  搜索用户数
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>指标说明</span>
                    </template>
                    <icon-font class="dashboard-tooltip" type="icon-warning-circle" style="margin-left:8px;" />
                  </a-tooltip>
                </span>
              </div>
              <div class="ant-pro-dashboard-value">
                <span>12312</span>
                <span>17.1 <icon-font class="icon icon-up" type="icon-caret-up" /></span>
              </div>
              <div class="chart-content-miniChart">
                <div class="chart-content-wrap">
                  <area-smooth-chart />
                </div>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="ant-pro-dashboard-info">
                <span class="ant-pro-dashboard-subtitle">
                  人均搜索次数
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>指标说明</span>
                    </template>
                    <icon-font class="dashboard-tooltip" type="icon-warning-circle" />
                  </a-tooltip>
                </span>
              </div>
              <div class="ant-pro-dashboard-value">
                <span>2.7</span>
                <span>26.2 <icon-font class="icon icon-down" type="icon-caret-down" /></span>
              </div>
              <div class="chart-content-miniChart">
                <div class="chart-content-wrap">
                  <area-smooth-chart />
                </div>
              </div>
            </a-col>
          </a-row>
          <a-table class="dashboard-table-wrap" :columns="columns" :data-source="tableData" :pagination="{pageSize:5}" size="small">
            <a slot="keyword" slot-scope="text" href="javascript:;">{{ text }}</a>
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="销售额类别占比" style="height:100%;">
          <div>
            <h4>销售额</h4>
            <div class="pie-wrap">
              <pie-chart />
            </div>
          </div>
        </a-card>
      </a-col>

    </a-row>

  </div>
</template>

<script>
import CardChart from '@/components/Chart/CardChart'
import AreaChart from '@/components/Chart/AreaChart'
import BarChart from '@/components/Chart/BarChart'
import AreaSmoothChart from '@/components/Chart/AreaSmoothChart'
import PieChart from '@/components/Chart/PieChart'
import MiniProgress from '@/components/Chart/MiniProgress'
import moment from 'moment'
const dataX = []; const dataY = []
for (let i = 0; i < 12; i++) {
  dataX.push(i + 1 + '月')
  dataY.push(Math.round(Math.random() * 1200) + 1)
}

const columns = [{
  title: '排名',
  dataIndex: 'rank'
}, {
  title: '搜索关键词',
  dataIndex: 'keyword',
  scopedSlots: { customRender: 'keyword' }
}, {
  title: '用户数',
  dataIndex: 'number'
}, {
  title: '周涨幅',
  dataIndex: 'increase'
}]
const tableData = []
for (let i = 0; i < 50; i++) {
  const random = Math.random()
  tableData.push(
    {
      key: i,
      rank: i,
      keyword: '搜索关键词-' + i,
      number: Math.round(random * 100),
      increase: Math.floor(random * 10) + '%'
    }
  )
}
export default {
  name: 'Dashboard',
  components: {
    CardChart,
    AreaChart,
    BarChart,
    MiniProgress,
    PieChart,
    AreaSmoothChart
  },
  data() {
    return {
      tableData,
      columns,
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      bar: {
        color: ['#58AFFF'],
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
          top: '24',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgb(87,87,87)'
            }
          },
          data: dataX
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: 'rgba(0,0,0,.65)'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#eee',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '42px',
            data: dataY
          }
        ]
      }
    }
  },
  methods: {
    moment
  }
}
</script>
<style lang='less'>
.ant-pro-card-tabs{
  .ant-tabs-bar{
    padding-left:16px;
    margin-bottom:24px;
    .ant-tabs-tab{
      padding:16px 16px 14px;
      line-height:24px;
      font-size:16px;
    }
  }
}
.ant-pro-tabs-extra-wrap{
  padding-right:24px;
  line-height:55px;
  .ant-pro-tabs-extra-date{
    display: inline-block;
    margin-right:24px;
    a{
      margin-left:24px;
      color:rgba(0, 0, 0, 0.65);
      &:hover,&.ant-pro-tabs-extra-active{
        color:#1890ff;
      }
    }
  }
}
</style>
<style lang='less' scoped>
.card-content-analysis {
  display: inline-block;
  span:last-of-type {
    color: rgba(0, 0, 0, 0.85);
    margin-left: 8px;
  }
}
.icon{
  font-size:10px;
  margin-left:4px;
  &.icon-up{
    color:#f5222d
  }
  &.icon-down{
    color:#52c41a;
  }
}
.ant-pro-scalebar{
  padding:0 0 32px 32px;
}
.ant-pro-sale{
  padding:0 32px 32px 72px;
}
.ant-pro-list{
  margin-top:25px;
  padding:0;
  li{
    display: flex;
    margin-bottom:15px;
    .ant-pro-list-rank{
      background-color:#314659;
      display:inline-block;
      width:20px;
      height:20px;
      line-height:20px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      margin-right:16px;
    }
    .ant-pro-list-item{
      flex: 1 1;
      margin-right:8px;
    }
  }
}
.ant-pro-dashboard-subtitle{
  color:rgba(0, 0, 0, 0.45);
}
.ant-pro-dashboard-value{
  margin-top:8px;
  span:first-of-type{
    font-size:24px;
    margin-right:32px;
  }
  span:last-of-type{
    font-size:16px;
    color:rgba(0, 0, 0, 0.45)
  }
}
.chart-content-miniChart{
  position: relative;
  height:45px;
  .chart-content-wrap{
    position: absolute;
    bottom:0;
    width:100%;
  }
}
.dashboard-table-wrap{
  /deep/.ant-pagination{
      margin-bottom: 0;
  }
}
</style>
