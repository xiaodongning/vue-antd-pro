import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import ECharts from 'vue-echarts'
import '@/styles/index.less'
import IconFont from '@/components/Icon'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import './permission'
import * as filters from './filters' // global filters
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Antd)
Vue.component('v-chart', ECharts)
Vue.component('IconFont', IconFont)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
