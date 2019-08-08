<template>
  <div class="chart-mini-progress">
    <div class="target" :style="{left:target+'%'}">
      <span :style="{backgroundColor: color}" />
      <span :style="{backgroundColor: color}" />
    </div>
    <div class="progress-wrap">
      <div class="progress" :style="{backgroundColor:color,width:percentage+'%',height:'10px'}" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiniProgress',
  props: {
    target: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#13c2c2'
    },
    percentage: {
      type: Number,
      default: 0
    }
  }
}

</script>
<style lang='less' scoped>
.chart-mini-progress{
  padding: 5px 0;
  position: relative;
  .target{
    position: absolute;
    top:0;
    bottom: 0;
    span{
      position: absolute;
      top:0;
      left:0;
      width:2px;
      height:4px;
      &:last-of-type{
        top:auto;
        bottom:0;
      }
    }
  }
  .progress-wrap{
    background-color: #f5f5f5;
  }
}
</style>
