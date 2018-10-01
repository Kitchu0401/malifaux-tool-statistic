<template>

  <div>

    <navigator />

    <div class="container" style="padding: 16px 0px;">
      <router-view class="view" />
    </div>

  </div>

</template>

<script>
import Navigator from './components/Navigator.vue'

export default {
  name: 'app',
  components: {
    Navigator
  },
  methods: {
    changeMenu: function (menu) {
      this.currentMenu = menu
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.chart-container {
  width: 100%;
  height: 560px;
}
</style>