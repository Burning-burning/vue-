<template>
  <div class="main">
    <div
      class="left"
      :style="{ background: bgColor, width: isCollapse ? 'auto' : '200px' }"
    >
      <left-menu :isCollapse="isCollapse" :bgColor="bgColor"></left-menu>
    </div>
    <div class="right">
      <div class="nav">
        <right-menu
          @changeColor="changeColor"
          @changeCollapse="changeCollapse"
        ></right-menu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import LeftMenu from '../components/layout/LeftMenu'
import RightMenu from '../components/layout/RightMenu'
import { getOne } from '../network/role.js'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      bgColor: localStorage.getItem('theme') || '#101f30',
      isCollapse: false
    }
  },
  components: {
    LeftMenu,
    RightMenu
  },
  methods: {
    ...mapMutations('admin', ['setAdmin']),
    changeColor(color) {
      this.bgColor = color
    },
    changeCollapse(isCollapse) {
      this.isCollapse = isCollapse
    }
  },
  async created() {
    const loginId = localStorage.getItem('loginId')
    if (!loginId) {
      this.$router.push('/login')
    } else {
      const res = await getOne(loginId)
      this.setAdmin(res)
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  .left {
  }
  .right {
    flex: 1;
    .nav {
      height: 60px;
    }
    .content {
      padding: 8px;
    }
  }
}
</style>
