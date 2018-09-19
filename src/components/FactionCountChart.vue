<template>
  <li class="list-group-item" id="faction-count">
    <p class="h3">
      <span>Faction mentioned ranking</span>
    </p>
    <div class="chart-container"></div>
  </li>
</template>

<script>
import Vue from 'vue'
import AmCharts from 'amcharts3'
import AmPie from 'amcharts3/amcharts/pie'

export default {
  name: 'factionCountChart',
  mounted: function () {
    this.render()
  },
  props: {
    modelList: Array
  },
  computed: {
    factionCount: function () {
      let lastCrewIndex = -1
      return this.modelList.reduce((result, d) => {
        // Distinct duplicated crew models
        if (isNaN(d.crewIndex) || lastCrewIndex >= d.crewIndex ) return result
        lastCrewIndex = d.crewIndex

        for (let i = 0; i < result.length; i++) {
          if (result[i].faction === d.faction) {
            result[i].count = result[i].count + 1
            return result
          }
        }

        result.push({
          faction: d.faction,
          count: 1,
          color: Vue.util.getFactionColor(d.faction),
          default: result.length === 0
        })
        
        return result
      }, [])
      .sort((prev, next) => (prev.count - next.count) * -1)
      .map((d, i) => { d.default = i === 0; return d })
    },
    configParams: function () {
      return {
        type: 'pie',
        titleField: 'faction',
        valueField: 'count',
        colorField: 'color',
        dataProvider: this.factionCount,
        pulledField: 'default',
        pullOutDuration: 0,
        pullOutOnlyOne: true,
        innerRadius: '50%',
        legend: {
          align: 'center',
          maxColumns: 4
        },
        listeners: [
          {
            event: 'clickSlice',
            method: (e) => {
              this.requestRenderModelCountChart(e.dataItem.dataContext.faction)
            }
          }
        ]
      }
    }
  },
  methods: {
    render: function () {
      window.AmCharts.makeChart(
        document.querySelector('#faction-count .chart-container'),
        this.configParams)
      
      this.requestRenderModelCountChart(this.factionCount[0].faction)
    },
    requestRenderModelCountChart: function (faction) {
      Vue.event.$emit('render-chart-model-count', faction)
    }
  }
}
</script>
