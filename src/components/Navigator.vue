<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">Malifaux Korea</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item @click="changeMenu('user')" :class="currentMenu === 'user' ? 'active' : ''">플레이어 기준 통계보기</b-nav-item>
        <b-nav-item @click="changeMenu('model')" :class="currentMenu === 'model' ? 'active' : ''">모델 기준 통계보기</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'navigator',
  props: {
    changeMenu: Function,
    currentMenu: String
  }
}
</script>