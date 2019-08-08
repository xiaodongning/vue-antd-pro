<template>
  <div class="menu">
    <logo />
    <sub-menu
      style="padding:12px 0"
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      theme="dark"
      :menu="permission_routes"
      :inline-collapsed="collapsed"
    />
  </div>
</template>

<script>
import SubMenu from './sub-menu'
import Logo from '@/components/Logo'
import { mapGetters } from 'vuex'
export default {
  components: {
    SubMenu,
    Logo
  },
  props: {
    collapsed: {
      type: Boolean
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  created() {

  }
}

</script>
<style scoped>
.icons-list >>> .anticon {
  margin-right: 6px;
  font-size: 24px;
}
</style>
