<template>
  <div class="flex">
    <div>
      <el-image
        style="width: 200px; height: 220px"
        :src="
          'http://bingjs.com:83/upload/admin/' +
            (admin.photo || 'admin_default.jpg')
        "
        fit="cover"
      ></el-image>
    </div>
    <div class="content">
      <p>账号：{{ admin.loginId }}</p>
      <p>姓名：{{ admin.name }}</p>
      <p>电话：{{ admin.phone }}</p>
      <p>角色：{{ admin.role.roleName }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    ...mapState('admin', ['admin'])
  },
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.content {
  margin-left: 10px;
  p {
    line-height: 50px;
  }
}
</style>
