<template>
  <a-card class="antd-pro-card" :bordered="false">
    <div class="antd-pro-dashboard">
      <div class="card-top">
        <div class="card-top-meta">
          <div class="card-top-meta-title">
            <span>{{ title }}</span>
          </div>
          <div class="card-top-meta-total">
            <span>{{ total }}</span>
          </div>
        </div>
        <a-tooltip placement="top">
          <template slot="title">
            <span>指标说明</span>
          </template>
          <icon-font class="dashboard-tooltip" type="icon-warning-circle" />
        </a-tooltip>
      </div>
      <div class="card-content">
        <div class="card-content-wrap">
          <slot />
        </div>
      </div>
      <div class="card-footer">
        <div class="card-content-analysis">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    total: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}

</script>
<style lang='less' scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.antd-pro-card{
  /deep/.ant-card-body{
    padding:20px 24px 8px;
  }
}
.card-top {
  position: relative;
  overflow: hidden;
  .card-top-meta {
    float: left;
    .card-top-meta-title {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
      height:22px;
      line-height: 22px;
    }
    .card-top-meta-total {
      color: rgba(0, 0, 0, .85);
      font-size: 30px;
      line-height:38px;
      margin-top:4px;
    }
  }
  .dashboard-tooltip{
    position: absolute;
    right:0;
    top:0;
    font-size:16px;
    cursor: pointer;
    color:rgba(0, 0, 0, .45);
  }
}
.card-content-analysis {
  display: inline-block;
  span:last-of-type {
    color: rgba(0, 0, 0, 0.85);
    margin-left: 8px;
  }
}
.card-content {
  height: 46px;
  position: relative;
  margin-bottom:12px;
  .card-content-wrap {
    position: absolute;
    bottom:0;
    left:0;
    width: 100%;
  }
}
.card-footer{
  margin-top:8px;
  padding-top:8px;
  border-top:1px solid #e8e8e8;
}
</style>
