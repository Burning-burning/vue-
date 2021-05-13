<template>
  <div>
    <div class="logo">Bing</div>
    <el-menu
      class="el-menu-vertical-demo"
      :background-color="bgColor"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/layout/role">角色管理</el-menu-item>
        <el-menu-item index="/layout/admin">账号管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-office-building"></i>
          <span>客房管理</span>
        </template>
        <el-menu-item index="/layout/roomType">类型管理</el-menu-item>
        <el-menu-item index="/layout/room">客房管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>客户管理</span>
        </template>
        <el-menu-item index="/layout/guest">客户管理</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="4-1">权限管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: localStorage.getItem('theme') || '#101f30'
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.logo {
  width: 90%;
  color: white;
  border: 1px solid white;
  font-size: 18px;
  margin: 10px auto;
  text-align: center;
  padding: 8px 0;
}
</style>
