<template>
  <li class="list-group-item" id="user-count">
    <p class="h3">
      <span>플레이어 별 크루 공유 횟수</span>
    </p>
    <div class="chart-container"></div>
  </li>
</template>

<script>
import Vue from 'vue'
import AmCharts from 'amcharts3'
import AmPie from 'amcharts3/amcharts/pie'

import util from '../../util'

export default {
  name: 'userCountChart',
  props: {
    modelList: Array
  },
  mounted: function () {
    this.render()
  },
  computed: {
    userCount: function () {
      // Expected:
      // {
      //   author   - 크루 작성자
      //   faction  - 팩션 별 공유 횟수
      //   total    - 총 공유 횟수
      // }
      
      let lastCrewIndex = -1
      return this.modelList
        .reduce((result, d) => {
          // Distinct duplicated crew models
          if (isNaN(d.crewIndex) || lastCrewIndex >= d.crewIndex ) return result
          lastCrewIndex = d.crewIndex

          for (let i = 0; i < result.length; i++) {
            if (result[i].author === d.crewAuthor) {
              if (result[i].faction.every(f => f.faction !== d.faction)) {
                result[i].faction.push({ faction: d.faction, count: 0 })
              }

              for (let j = 0; j < result[i].faction.length; j++) {
                if (result[i].faction[j].faction === d.faction) {
                  result[i].faction[j].count = result[i].faction[j].count + 1
                  result[i].total = result[i].total + 1
                  return result
                }
              }
            }
          }

          result.push({
            author: d.crewAuthor,
            faction: [{
              faction: d.faction,
              count: 1
            }],
            total: 1
          })
          
          return result
        }, [])
        .map(d => {
          d.faction = d.faction.sort((prev, next) => (prev.count - next.count) * -1)
          d.color = util.getFactionColor(d.faction[0].faction)
          return d
        })
        .sort((prev, next) => (prev.total - next.total) * -1)
    },
    configParams: function () {
      return {
        type: 'pie',
        titleField: 'author',
        valueField: 'total',
        colorField: 'color',
        dataProvider: this.userCount,
        pullOutOnlyOne: true,
        creditsPosition: 'bottom-right',
        innerRadius: '50%',
        legend: {
          align: 'center',
          maxColumns: 5
        },
        listeners: [
          {
            event: 'clickSlice',
            method: this.requestRenderUserFactionCountChart
          }
        ]
      }
    }
  },
  methods: {
    render: function () {
      window.AmCharts.makeChart(
        document.querySelector(`#user-count .chart-container`),
        this.configParams)
    },
    requestRenderUserFactionCountChart: function (e) {
      Vue.event.$emit(
        'render-chart-user-faction-count',
        e.dataItem.dataContext)
    }
  }
}
</script>