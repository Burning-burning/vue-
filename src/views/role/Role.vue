<template>
  <div>
    <div>
      <el-button type="primary" size="mini" @click="addRole"
        >添加角色</el-button
      >
    </div>
    <el-table :data="roleList" style="width:99%" stripe size="mini">
      <el-table-column prop="roleId" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button
            size="mini"
            type="warning"
            @click="editRole(scoped.row.roleId)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteRole(scoped.row.roleId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <my-drawer
      direction="rtl"
      :drawer="drawer"
      :type="type"
      @close="close"
      @handleClose="handleClose"
      :role="role"
    ></my-drawer>
  </div>
</template>
<script>
import { getRoles, deleteRole, getOneRole } from '../../network/role'
import MyDrawer from '../../components/MyDrawer.vue'
export default {
  data() {
    return {
      roleList: [],
      drawer: false,
      type: 'add',
      role: {}
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoles()
      this.roleList = res
    },
    addRole() {
      this.drawer = true
      this.type = 'add'
    },
    async editRole(id) {
      this.type = 'update'
      this.drawer = true
      const res = await getOneRole(id)
      this.role = res
    },
    close(drawer1) {
      this.drawer = drawer1
    },
    handleClose(drawer1) {
      this.drawer = drawer1
      this.getRoleList()
    },
    async deleteRole(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该角色，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        this.$message.info('已取消删除')
      } else {
        const { success, message } = await deleteRole(id)
        if (success) {
          this.$message.success(message)
          this.getRoleList()
        } else {
          this.$message.error(message)
        }
      }
    }
  },
  components: {
    MyDrawer
  }
}
</script>
<style lang="less" scoped></style>
