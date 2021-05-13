<template>
  <div class="main">
    <img src="/img/404/error.jpg" @click="gotoHome" />
  </div>
</template>
<script>
export default {
  methods: {
    gotoHome() {
      this.$router.push('/layout')
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
