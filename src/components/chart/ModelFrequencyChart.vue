<template>
  <li class="list-group-item" id="model-frequency" v-show="name">
    <p class="h3">
      <span>Model mentioned frequency over months </span>
      <small class="description">({{ name }})</small>
    </p>
    <div class="chart-container"></div>
  </li>
</template>

<script>
import Vue from 'vue'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'

export default {
  name: 'modelFrequencyChart',
  props: {
    modelList: Array
  },
  data: function () {
    return {
      name: null,
      color: null,
      metaPeriod: null
    }
  },
  mounted: function () {
    Vue.event.$on('render-chart-model-frequency', this.render)
  },
  computed: {
    modelFrequency: function () {
      // Initialize period array (YYYYMM) if has not been initialized.
      if (this.metaPeriod === null) {
        this.metaPeriod = Array.from(this.modelList.reduce((s, d) => s.add(d.datetime.substring(0, 6)), new Set())).sort()
      }

      return Array.from(this.metaPeriod)
        .map(datetime => {
          return {
            datetime: datetime,
            count: this.modelList.filter(d => d.name === this.name && d.datetime.startsWith(datetime)).length
          }
        })
        .sort((prev, next) => prev.datetime - next.datetime)
    },
    configParams: function () {
      return {
        type: 'serial',
        dataDateFormat: 'YYYYMMDD',
        categoryField: 'datetime',
        creditsPosition: 'bottom-right',
        graphs: [{
          type: 'column',
          valueField: 'count',
          fillAlphas: 0.8,
          lineAlpha: 0.2,
          lineColor: this.color
        }],
        valueAxes: [
          {
            id: "count",
            integersOnly: true,
            axisAlpha: 0,
          }, {
            id: "datetime",
            type: "date",
            position: "bottom",
            axisAlpha: 0
          }
        ],
        dataProvider: this.modelFrequency
      }
    }
  },
  methods: {
    render: function (name, color) {
      this.name = name
      this.color = color
      
      window.AmCharts.makeChart(
        document.querySelector(`#model-frequency .chart-container`),
        this.configParams)
    }
  }
}
</script>