<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-model="collapsed"
      width="256"
      :trigger="null"
      collapsible
    >
      <side-bar :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout :style="{minHeight:'100vh'}">
      <layout-header :collapsed="collapsed" style="box-shadow:0 1px 4px rgba(0,21,41,.08)" @changeBar="handleClick" />
      <a-layout-content :style="{ margin: '24px' }">
        <app-main />
      </a-layout-content>
      <a-drawer
        title="系统布局配置"
        placement="right"
        width="300"
        :closable="false"
        :visible="visible"
        @close="onClose"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <div slot="handle" class="setting-drawer-handle" @click="handleDrawer">
          <a-icon type="setting" />
        </div>
      </a-drawer>
    </a-layout>
  </a-layout>
</template>

<script>
import LayoutHeader from './components/LayoutHeader'
import AppMain from './components/AppMain'
import SideBar from './components/SideBar/index'
export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    SideBar,
    AppMain
  },
  data() {
    return {
      collapsed: false,
      visible: false
    }
  },
  methods: {
    handleClick() {
      this.collapsed = !this.collapsed
    },
    handleDrawer() {
      this.visible = !this.visible
    },
    onClose() {
      this.visible = false
    }
  }
}

</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 68px;
  vertical-align: middle;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>
<style lang='less' scoped>

</style>
