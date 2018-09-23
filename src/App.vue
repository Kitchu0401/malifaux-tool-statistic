<template>

  <div>

    <navigator :change-menu="changeMenu" :current-menu="currentMenu" />

    <div class="container" style="padding: 16px 0px;">
      <model  :model-list="modelList" v-if="currentMenu === 'model'" />
      <user   :model-list="modelList" v-if="currentMenu === 'user'" />
      <user   :model-list="modelList" v-if="currentMenu === 'graph'" />
    </div>

  </div>

</template>

<script>
import modelList from './data/modelList.json'

import Navigator from './components/Navigator.vue'
import Model from './components/Model.vue'
import User from './components/User.vue'
import Graph from './components/Graph.vue'

export default {
  name: 'app',
  components: {
    Navigator,
    Model,
    User,
    Graph
  },
  data: function () {
    return {
      currentMenu: 'user',
      modelList: modelList
    }
  },
  methods: {
    changeMenu: function (menu) {
      this.currentMenu = menu
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.chart-container {
  width: 100%;
  height: 560px;
}
</style>