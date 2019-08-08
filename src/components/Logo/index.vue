<template>
  <div class="logo">
    <a href="#">
      <img src="../../assets/logo.svg" alt>
      <h1>Ant Design Pro</h1>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang='less' scoped>
.logo {
  height: 64px;
  line-height: 64px;
  background: #002140;
  padding-left: 24px;
  overflow: hidden;
  img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  h1 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 0 12px;
    vertical-align: middle;
    display: inline-block;
    color: #fff;
  }
}
</style>
