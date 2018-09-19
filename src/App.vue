<template>
  <div class="container" style="padding: 16px 0px;">
    <ul class="list-group">
      <faction-count-chart :model-list="modelList" />
      <model-count-chart :model-list="modelList" :type="'Master'" />
      <model-count-chart :model-list="modelList" :type="''" />
      <model-frequency-chart :model-list="modelList" />
    </ul>
  </div>
</template>

<script>
import modelList from './data/modelList.json'

import FactionCountChart from './components/FactionCountChart.vue'
import ModelCountChart from './components/ModelCountChart.vue'
import ModelFrequencyChart from './components/ModelFrequencyChart.vue'

export default {
  name: 'app',
  components: {
    FactionCountChart,
    ModelCountChart,
    ModelFrequencyChart
  },
  data: function () {
    return {
      modelList: modelList
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
  height: 400px;
}
</style>
