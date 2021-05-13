<template>
  <div class="nav" :style="{ background: bgColor }">
    <div class="icon" @click="handleCollapse">
      <i v-if="!isCollapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="navbar">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :background-color="bgColor"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/layout">
          <i class="el-icon-s-home"></i>Home</el-menu-item
        >
        <el-menu-item index="/layout/message">
          <i class="el-icon-s-comment"></i>Message</el-menu-item
        >
        <el-menu-item index="/layout/email">
          <i class="el-icon-message"></i>Email</el-menu-item
        >
        <el-submenu index="4">
          <template slot="title"> <i class="el-icon-help"></i>Theme</template>
          <el-menu-item
            @click="changeTheme(item.value)"
            v-for="(item, index) in theme"
            :key="index"
            >{{ item.name }}</el-menu-item
          >
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-user-solid"></i>{{ admin.name }}</template
          >
          <el-menu-item index="/layout/mine">个人中心</el-menu-item>
          <el-menu-item index="/layout/resetPwd">修改密码</el-menu-item>
          <el-menu-item @click="logout">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      bgColor: localStorage.getItem('theme') || '#101f30',
      isCollapse: false
    }
  },
  methods: {
    changeTheme(color) {
      this.bgColor = color
      localStorage.setItem('theme', color)
      this.$emit('changeColor', color)
    },
    handleCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit('changeCollapse', this.isCollapse)
    },
    logout() {
      window.sessionStorage.clear()
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState('theme', ['theme']),
    ...mapState('admin', ['admin'])
  }
}
</script>
<style lang="less" scoped>
.nav {
  display: flex;
  min-width: 700px;
  // width: 100vw;
  justify-content: space-between;
  align-items: center;
  .icon {
    color: white;
    font-size: 20px;
    padding-left: 5px;
  }
}
</style>
