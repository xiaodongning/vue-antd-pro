<template>

  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <span v-if="item.redirect==='noRedirect' || index==levelList.length-1">{{ item.meta.title }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </a-breadcrumb-item>
  </a-breadcrumb>

</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isHome(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isHome(route) {
      const name = route && route.name
      if (!name) return false
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // 作用：快速填充 url 字符串的参数值。
      // var url = '/user/:id/:name'
      // var data = {id: 10001, name: 'bob'}
      // console.log(pathToRegexp.compile(url)(data))
      const { params } = this.$route
      return pathToRegexp.compile(path)(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}

</script>
<style lang='less' scoped>

</style>
