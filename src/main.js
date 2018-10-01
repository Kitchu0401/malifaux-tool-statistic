import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import VueBootstrap from 'bootstrap-vue'

import App from './App.vue'
import graph from './graph'
import util from './util'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.event = new Vue()
Vue.graph = graph
Vue.util = util

Vue.use(VueBootstrap)

new Vue({
  render: h => h(App)
}).$mount('#app')