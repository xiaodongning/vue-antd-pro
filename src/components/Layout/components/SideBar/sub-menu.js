import { Menu } from 'ant-design-vue'
import IconFont from '@/components/Icon'
import path from 'path'
const { Item, SubMenu } = Menu
export default {
  name: 'Menu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    this.onlyOneChild = null
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: vm => {
      const keys = []
      vm.menu.forEach(item => keys.push(item.path))
      return keys
    }
  },
  created() {
    this.updateMenu()
  },
  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    $route: function() {
      this.updateMenu()
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath, basePath) {
      return path.resolve(basePath, routePath)
    },
    renderIcon: function(h, icon) {
      return icon === 'none' || icon === undefined ? null : h(IconFont, { props: { type: icon !== undefined ? icon : '' }})
    },
    renderMenuItem: function(h, menu, pIndex, index, basePath) {
      if (menu.meta) {
        return h(Item, { key: this.resolvePath(menu.path, basePath) }, [
          h('router-link', { attrs: { to: { name: menu.name }}}, [
            this.renderIcon(h, menu.meta.icon),
            h('span', [menu.meta.title])
          ])
        ])
      }
    },
    renderSubMenu: function(h, menu, pIndex, index, basePath) {
      const this2_ = this
      let subItem = []
      const itemArr = []
      const pIndex_ = pIndex + '_' + index
      if (menu.meta) {
        subItem = [h('span', { slot: 'title' }, [this.renderIcon(h, menu.meta.icon), h('span', [menu.meta.title])])]
      }
      menu.children.forEach(function(item, i) {
        itemArr.push(this2_.renderItem(h, item, pIndex_, i, this2_.resolvePath(item.path, menu.path)))
      })
      return h(SubMenu, { key: menu.path ? this.resolvePath(menu.path, basePath) : 'submenu_' + pIndex + '_' + index }, subItem.concat(itemArr))
    },
    renderItem: function(h, menu, pIndex, index, basePath) {
      if (this.hasOneShowingChild(menu.children, menu) && (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) && !menu.alwaysShow) {
        return this.renderMenuItem(h, this.onlyOneChild, pIndex, index, basePath)
      } else {
        return this.renderSubMenu(h, menu, pIndex, index, basePath)
      }
    },
    renderMenu: function(h, menuTree) {
      const this2_ = this
      const menuArr = []
      menuTree.forEach(function(menu, i) {
        if (!menu.hidden) {
          menuArr.push(this2_.renderItem(h, menu, '0', i, menu.path))
        }
      })
      return menuArr
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    updateMenu() {
      const routes = this.$route.matched.concat()
      console.log(this.$route.path)
      // if (routes.length >= 4 && this.$route.meta.hidden) {
      //   routes.pop()
      //   this.selectedKeys = [routes[2].path]
      // } else {
      //   this.selectedKeys = [routes.pop().path]
      // }
      this.selectedKeys = [this.$route.path]
      const openKeys = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }

      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    }
  },
  render(h) {
    return h(
      Menu,
      {
        props: {
          theme: this.$props.theme,
          mode: this.$props.mode,
          openKeys: this.openKeys,
          selectedKeys: this.selectedKeys
        },
        on: {
          openChange: this.onOpenChange,
          select: obj => {
            this.selectedKeys = obj.selectedKeys
            this.$emit('select', obj)
          }
        }
      },
      this.renderMenu(h, this.menu)
    )
  }
}
