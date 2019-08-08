import store from './store'

// store.dispatch('permission/generateRoutes', [])
store.commit('cachedView/SET_CACHED_VIEW')
store.commit('permission/SET_ROUTES', [])
