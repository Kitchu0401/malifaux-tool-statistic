<template>
  <li class="list-group-item" :id="containerId">
    <p class="h3">
      <span v-if="type === 'Master'">Master model top usage </span>
      <span v-if="type === ''">Non-master model top usage top 20 </span>
      <small class="description" v-show="faction">({{ faction }})</small>
    </p>
    <div class="chart-container"></div>
  </li>
</template>

<script>
import Vue from 'vue'
import AmCharts from 'amcharts3'
import AmPie from 'amcharts3/amcharts/pie'

export default {
  name: 'modelCountChart',
  props: {
    modelList: Array,
    type: String
  },
  data: function () {
    return {
      faction: null
    }
  },
  mounted: function () {
    Vue.event.$on('render-chart-model-count', this.render)
    
    this.render(this.faction)
  },
  computed: {
    containerId: function () {
      return `model${!!this.type ? '-' + this.type : ''}-count`
    },
    modelCount: function () {
      return this.modelList
        .filter(d => (this.faction === null || this.faction === d.faction) && this.type === d.type)
        .reduce((result, d) => {
          for (let i = 0; i < result.length; i++) {
            if (result[i].name === d.name) {
              result[i].count = result[i].count + 1
              return result
            }
          }

          result.push({
            name: d.name,
            count: 1,
            color: Vue.util.getFactionColor(d.faction)
          })
          
          return result
        }, [])
        .sort((prev, next) => (prev.count - next.count) * -1)
        .filter((c, index) => index < 20)
    },
    configParams: function () {
      return {
        type: 'pie',
        titleField: 'name',
        valueField: 'count',
        baseColor: this.modelCount[0].color,
        dataProvider: this.modelCount,
        brightnessStep: 35,
        pullOutOnlyOne: true,
        innerRadius: '50%',
        legend: {
          align: 'center',
          maxColumns: 5
        },
        listeners: [
          {
            event: 'clickSlice',
            method: this.requestRenderModelFrequencyChart
          }
        ]
      }
    }
  },
  methods: {
    render: function (faction) {
      this.faction = faction
      
      window.AmCharts.makeChart(
        document.querySelector(`#${this.containerId} .chart-container`),
        this.configParams)
    },
    requestRenderModelFrequencyChart: function (e) {
      Vue.event.$emit(
        'render-chart-model-frequency',
        e.dataItem.dataContext.name,
        e.dataItem.dataContext.color)
    }
  }
}
</script>
