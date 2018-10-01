<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/statistic">Malifaux Korea</a>
    <button class="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation"
        aria-controls="navbarSupportedContent">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
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
</template>

<script>
export default {
  name: 'navigator'
}
</script>