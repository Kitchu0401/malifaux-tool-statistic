<template>
  
  <ul class="list-group">
    <li class="list-group-item" id="model-relation-graph">
      <p class="h3">
        <span>모델 고용 관계 그래프</span>
      </p>
      <div :id="containerId" :style="containerCss"></div>
    </li>
  </ul>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'graph',
  props: {
    modelList: Array
  },
  mounted: function () {
    this.graphObject = Vue.graph.initializeGraphObject(this.containerId, this.modelList)
    this.draw()
  },
  data: function () {
    return {
      containerId: 'model-relation-graph-container',
      containerCss: { width: '100%', height: '840px' },
      graphObject: null,
      targetFaction: 'Guild',
      targetModel: 'Sonnia'
    }
  },
  methods: {
    change: function (faction, model) {
      this.targetFaction = faction
      this.targetModel = model
      this.draw()
    },
    draw: function () {
      if (!!this.graphObject) {
        Vue.graph.drawGraph(
          this.graphObject,
          this.targetFaction,
          this.targetModel)
      }
    }
  }
}
</script>