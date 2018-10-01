import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueBootstrap from 'bootstrap-vue'

import App from './App.vue'
import Model from './components/Model.vue'
import User from './components/User.vue'
import Graph from './components/Graph.vue'

import modelList from './data/modelList'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.event = new Vue()

Vue.use(VueRouter)
Vue.use(VueBootstrap)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/statistic',       component: Model, props: { modelList: modelList } },
    { path: '/statistic/model', component: Model, props: { modelList: modelList } },
    { path: '/statistic/user',  component: User,  props: { modelList: modelList } },
    { path: '/statistic/graph', component: Graph, props: { modelList: modelList } }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')