import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import util from './util'

Vue.config.productionTip = false
Vue.event = new Vue()
Vue.util = util

new Vue({
  render: h => h(App)
}).$mount('#app')
