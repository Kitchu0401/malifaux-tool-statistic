<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/statistic/model">플레이어 기준 통계 보기</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/statistic/user">모델 기준 통계 보기</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/statistic/graph">모델 관계 보기</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <!--
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">Malifaux Korea</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <router-link to="/model">플레이어 기준 통계 보기</router-link>
        <router-link to="/user">모델 기준 통계 보기</router-link>
        <router-link to="/graph">모델 관계 보기</router-link>
        
        <b-nav-item @click="changeMenu('user')" :class="currentMenu === 'user' ? 'active' : ''">플레이어 기준 통계 보기</b-nav-item>
        <b-nav-item @click="changeMenu('model')" :class="currentMenu === 'model' ? 'active' : ''">모델 기준 통계 보기</b-nav-item>
        <b-nav-item @click="changeMenu('graph')" :class="currentMenu === 'graph' ? 'active' : ''">모델 관계 보기</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
  -->
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