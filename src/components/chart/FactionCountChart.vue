<template>
  <li class="list-group-item" id="faction-count">
    <p class="h3">
      <span>팩션 별 크루 공유 횟수</span>
    </p>
    <div class="chart-container"></div>
  </li>
</template>

<script>
import Vue from 'vue'
import AmCharts from 'amcharts3'
import AmPie from 'amcharts3/amcharts/pie'

import util from '../../util/common'

export default {
  name: 'factionCountChart',
  mounted: function () {
    this.render()
  },
  props: {
    modelList: Array
  },
  data: function () {
    return {
      chartInstance: null
    }
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
          color: util.getFactionColor(d.faction),
          pulled: result.length === 0
        })
        
        return result
      }, [])
      .sort((prev, next) => (prev.count - next.count) * -1)
    },
    configParams: function () {
      return {
        type: 'pie',
        titleField: 'faction',
        valueField: 'count',
        colorField: 'color',
        dataProvider: this.factionCount,
        pullOutDuration: 0,
        pullOutOnlyOne: true,
        creditsPosition: 'bottom-right',
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
    },
    requestRenderModelCountChart: function (faction) {
      Vue.event.$emit('render-chart-model-count', faction)
    }
  }
}
</script>