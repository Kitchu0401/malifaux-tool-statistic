<template>
  
  <ul class="list-group">
    <li class="list-group-item" id="model-relation-graph" v-show="name">
      <p class="h3">
        <span>모델 고용 관계 그래프 </span>
        <small class="description" v-show="name">({{ name }})</small>
      </p>
      <div id="model-relation-graph-container" style="width: 100%; height: 600px"></div>
    </li>
  </ul>

</template>

<script>
export default {
  name: 'graph',
  props: {
    modelList: Array
  },
  mounted: function () {
    this.initialize()

    console.log(this.nodeArray)
    console.log(this.linkArray)
  },
  data: function () {
    return {
      nodeArray: [],
      linkArray: []
    }
  },
  methods: {
    initialize: function () {
      // Add root node
      nodeArray.push({ key: 1, name: 'Ice Gamin' })

      
    }
  }
}
</script>