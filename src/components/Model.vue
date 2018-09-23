<template>
  
  <ul class="list-group">
    <faction-count-chart :model-list="modelList" />
    <model-count-chart :model-list="modelList" :type="'Master'" />
    <model-count-chart :model-list="modelList" :type="''" />
    <model-frequency-chart :model-list="modelList" />
  </ul>

</template>

<script>
import FactionCountChart from './chart/FactionCountChart.vue'
import ModelCountChart from './chart/ModelCountChart.vue'
import ModelFrequencyChart from './chart/ModelFrequencyChart.vue'

export default {
  name: 'model',
  props: {
    modelList: Array
  },
  components: {
    FactionCountChart,
    ModelCountChart,
    ModelFrequencyChart
  }
}
</script>