<template>
  <a-layout-header class="layout-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="handlClick"
    />
    <breadcrumb class="header-breadcrumb" />
    <div class="right-menu">
      <search />
    </div>
  </a-layout-header>
</template>

<script>
import Search from '@/components/Search'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Search,
    Breadcrumb
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handlClick() {
      this.$emit('changeBar')
    }
  }
}

</script>
<style lang='less' scoped>
  .layout-header{
    padding:0 24px 0 0;
    background:#fff;
    display: flex;
    line-height:64px;
    .header-breadcrumb{
      flex-grow: 2;
      line-height:64px;
    }
  }
  .right-menu{
    float:right;
    height:100%;
    line-height:64px;
  }
</style>
