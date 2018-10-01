<template>
  
  <ul class="list-group">
    <li class="list-group-item" id="model-relation-graph">
      <div class="row">
        <div class="col-9">
          <p class="h3">
            <span>모델 고용 관계</span>
          </p>
        </div>
        <div class="col-3">
          <select class="form-control" v-model="targetFaction" @change="drawGraph">
            <option v-for="faction in factionList" :key="faction" :value="faction">
                {{ faction }}
            </option>
          </select>
        </div>
      </div>
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
    this.targetFaction = this.factionList[0]
    this.drawGraph()
  },
  data: function () {
    return {
      containerId: 'model-relation-graph-container',
      containerCss: { width: '100%', height: '840px' },
      factionList: ['Neverborn', 'Gremlins', 'Resurrectionists', 'Guild', 'Arcanists', 'Outcasts', 'TenThunders'],
      targetFaction: null,
      graphObject: null
    }
  },
  methods: {
    drawGraph: function () {
      if (!!this.graphObject) {
        Vue.graph.drawGraph(this.graphObject, this.targetFaction)
      }
    }
  }
}
</script>