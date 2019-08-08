<template>
  <div :class="{'show':show}" class="header-search">
    <icon-font class="icon-font-search" type="icon-search" @click.stop="click" />
    <a-select
      ref="searchSelect"
      class="header-search-select"
      show-search
      :value="search"
      placeholder="input search text"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      @search="querySearch"
      @change="handleChange"
    >
      <a-select-option v-for="item in options" :key="item.path" :value="item.path">{{ item.title.join(' > ') }}</a-select-option>
    </a-select>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import path from 'path'
export default {
  name: 'HeaderSearch',
  data() {
    return {
      show: false,
      search: '',
      options: [],
      searchPool: [],
      fuse: undefined
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    },
    searchPool(list) {
      this.initFuse(list)
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    click() {
      this.show = !this.show
      if (this.show) {
        this.$refs.searchSelect && this.$refs.searchSelect.focus()
      }
    },
    close() {
      this.$refs.searchSelect && this.$refs.searchSelect.blur()
      this.show = false
    },
    handleChange(value) {
      this.$router.push(value)
      this.search = ''
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      })
    },
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []
      for (const router of routes) {
        if (router.hidden) continue

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect') {
            res.push(data)
          }
        }

        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    querySearch(value) {
      if (value !== '') {
        this.options = this.fuse.search(value)
      } else {
        this.options = []
      }
    }
  }
}
</script>
<style lang='less' scoped>
.icon-font-search {
  font-size: 24px;
  vertical-align: middle;
  cursor: pointer;
}
.header-search{
  .header-search-select{
    width:0;
    transition: width .2s;
    /deep/ .ant-select-selection{
      border: 0;
      border-bottom:1px solid #d9d9d9;
      &:focus{
        box-shadow: none;
      }
    }
  }
  /deep/ .ant-select-selection{
      box-shadow: none;
  }
}

.show{
  .header-search-select{
    width:200px;
  }
}
</style>
