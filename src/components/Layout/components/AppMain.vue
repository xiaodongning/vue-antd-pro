<template>
  <main class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedView">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </main>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    cachedView() {
      console.log(this.$store.state.cachedView.cachedView)
      return this.$store.state.cachedView.cachedView
    },
    key() {
      return this.$route.path
    }
  }
}

</script>
<style lang='less' scoped>
.app-main {
 width: 100%;
  height: 100%;
  min-height: 100%;
  transition: .3s;
}
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
