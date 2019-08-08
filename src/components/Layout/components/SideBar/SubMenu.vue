<template>
  <a-menu-item v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow" :key="item.path">
    <a-icon :type="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" />
    <span>{{ onlyOneChild.meta.title }}</span>
  </a-menu-item>
  <a-sub-menu
    v-else
    :key="item.path"
    v-bind="$props"
    v-on="$listeners"
  >
    <span slot="title">
      <a-icon type="mail" /><span>{{ item.title }}</span>
    </span>
    <template v-for="child in item.children">
      <sub-menu
        :key="child.path"
        :item="child"
      />
    </template>
  </a-sub-menu>
</template>
<script>
import { Menu } from 'ant-design-vue'
export default {
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })

      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }
  }
}
</script>
