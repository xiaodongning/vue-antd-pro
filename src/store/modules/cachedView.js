// 缓存逻辑
import { constantRoutes } from '@/router'

function getCache(data) {
  let result = []
  for (const item of data) {
    if (item.meta && (item.meta.cache === true)) {
      result.push(item.name)
    }
    if (item.children) {
      result = result.concat(getCache(item.children))
    }
  }
  return result
}

const state = {
  cachedView: []
}

const mutations = {
  SET_CACHED_VIEW: (state) => {
    console.log(getCache(constantRoutes))
    state.cachedView = getCache(constantRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
