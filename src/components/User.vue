<template>

  <ul class="list-group">
    <user-count-chart :model-list="modelList" />
    <user-faction-count-chart />
  </ul>

</template>

<script>
import UserCountChart from './chart/UserCountChart.vue'
import UserFactionCountChart from './chart/UserFactionCountChart.vue'

export default {
  name: 'user',
  props: {
    modelList: Array
  },
  components: {
    UserCountChart,
    UserFactionCountChart
  }
}
</script>