<template>
  <li class="list-group-item" id="user-faction-count" v-show="author">
    <p class="h3">
      <span>선택 플레이어의 팩션 별 크루 공유 횟수 </span>
      <small class="description" v-show="author">({{ author }})</small>
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
  name: 'userFactionCountChart',
  data: function () {
    return {
      author: null,
      faction: null
    }
  },
  mounted: function () {
    Vue.event.$on('render-chart-user-faction-count', this.render)

    // this.render()
  },
  computed: {
    userFactionCount: function () {
      // Expected:
      // {
      //   faction  - 팩션 명
      //   count    - 팩션 당 크루 공유 횟수
      //   color    - PieSlice 색상
      // }
      
      return this.faction.map(d => {
        d.color = util.getFactionColor(d.faction)
        return d
      })
    },
    configParams: function () {
      return {
        type: 'pie',
        titleField: 'faction',
        valueField: 'count',
        colorField: 'color',
        dataProvider: this.userFactionCount,
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
    render: function (data) {
      this.author = data.author
      this.faction = data.faction

      console.log(this.faction)

      this.chartInstance = window.AmCharts.makeChart(
        document.querySelector(`#user-faction-count .chart-container`),
        this.configParams)
    }
  }
}
</script>