<template>
  <div>
    <div style="margin-bottom:10px">
      角色：
      <el-select v-model="roleId" placeholder="请选择角色">
        <el-option
          v-for="item in roleList"
          :key="item.roleId"
          :label="item.roleName"
          :value="item.roleId"
        >
        </el-option>
      </el-select>

      <el-button style="margin-left: 10px" type="success" @click="queryInfo"
        >查询</el-button
      >
      <el-button type="primary" @click="addAdmin"> 添加账号</el-button>
    </div>
    <el-table stripe border :data="adminList" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="loginId" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="180"> </el-table-column>
      <el-table-column label="头像" width="180" prop="photo">
        <template slot-scope="scoped">
          <el-image
            style="width: 60px; height: 60px"
            :src="
              'http://bingjs.com:83/upload/admin/' +
                (scoped.row.photo || 'admin_default.jpg')
            "
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="role.roleName" label="角色" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button
            type="warning"
            size="mini"
            @click="editAdmin(scoped.row.loginId)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="deleteAdmin(scoped.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:5px"
      class="flex j-c"
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="8"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-drawer
      :title="isAdd ? '添加账号' : '修改账号'"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="头像" prop="photo"
          ><el-upload
            class="avatar-uploader"
            :action="uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="addForm.photo !== ''"
              :src="'http://bingjs.com:83/upload/admin/' + addForm.photo"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> </el-form-item
        ><el-form-item label="账号" prop="loginId">
          <el-input v-model="addForm.loginId"></el-input> </el-form-item
        ><el-form-item v-show="isAdd" label="密码" prop="loginPwd">
          <el-input
            type="password"
            v-model="addForm.loginPwd"
          ></el-input> </el-form-item
        ><el-form-item v-show="isAdd" label="确认密码" prop="loginPwd2">
          <el-input
            type="password"
            v-model="addForm.loginPwd2"
          ></el-input> </el-form-item
        ><el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input> </el-form-item
        ><el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input> </el-form-item
        ><el-form-item label="角色" prop="roleId">
          <el-select
            clearable=""
            v-model="addForm.roleId"
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{
            isAdd ? '添加' : '编辑'
          }}</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item></el-form
      >
    </el-drawer>
  </div>
</template>
<script>
import {
  getAdmin,
  addOneAdmin,
  getOneAdmin,
  deleteAdmin,
  updateAdmin
} from '../../network/admin'
import { getRoles } from '../../network/role'
import { strToMd5 } from '../../utils/md5'
export default {
  data() {
    var checkLoginId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var checkLoginPWD = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var checkLoginPWD2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (this.addForm.loginPwd !== value) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话'))
      } else {
        callback()
      }
    }
    var checkRoleId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择角色'))
      } else {
        callback()
      }
      callback()
    }
    return {
      adminList: [],
      roleList: [],
      isAdd: false,
      drawer: false,
      addForm: {
        photo: '',
        loginId: '',
        loginPwd: '',
        loginPwd2: '',
        roleId: '',
        name: '',
        phone: ''
      },
      count: 0,
      pageSize: 0,
      roleId: '',
      pageIndex: 1,
      addFormRules: {
        loginId: [{ validator: checkLoginId, trigger: 'blur' }],
        loginPwd: [{ validator: checkLoginPWD, trigger: 'blur' }],
        loginPwd2: [{ validator: checkLoginPWD2, trigger: 'blur' }],
        name: [{ validator: checkName, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        roleId: [{ validator: checkRoleId, trigger: 'change' }]
      },
      uploadImg: 'http://bingjs.com:83/Admin/UploadImg/'
    }
  },
  created() {
    /* eslint-disable */
    this.getAdminList(), this.getRoleList()
  },
  methods: {
    async getAdminList() {
      const { count, data } = await getAdmin(
        this.roleId || 0,
        this.pageIndex,
        8
      )
      console.log(count, data)
      this.count = count

      this.adminList = data
    },
    addAdmin() {
      this.drawer = true
      this.isAdd = true
    },
    queryInfo() {
      this.getAdminList()
    },
    handleClose(done) {
      done()
      this.$refs.addFormRef.resetFields()
    },
    async getRoleList() {
      const res = await getRoles()
      // console.log(res)
      this.roleList = res
    },
    handleCancel() {
      this.$refs.addFormRef.resetFields()
    },
    submitForm() {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          if (this.isAdd) {
            this.addForm.loginPwd = strToMd5(this.addForm.loginPwd)
            this.addForm.loginPwd2 = strToMd5(this.addForm.loginPwd2)
            const { message, success } = await addOneAdmin(this.addForm)
            if (success) {
              this.$message.success(message)
              this.getAdminList()
              this.drawer = false
              this.isAdd = false
              this.$refs.addFormRef.resetFields()
            } else {
              this.$message.error(message)
            }
          } else {
            const { success, message } = await updateAdmin(this.addForm)
            if (success) {
              this.$message.success(message)
              this.drawer = false
              this.isAdd = false
              this.getAdminList()
            } else {
              this.$message.error(message)
            }
          }
        } else {
          this.$message.error('输入数据有误，请重新输入')
        }
      })
    },
    handleAvatarSuccess(res, file) {
      const { success, filename } = res
      if (success) {
        this.addForm.photo = filename
      }
    },
    beforeAvatarUpload(file) {
      const img_type_list = ['image/jpeg', 'image/gif', 'image/png']
      const isJPG = img_type_list.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG PNG GIF 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
    },
    handleCurrentChange(pageNum) {
      this.pageIndex = pageNum
      this.getAdminList()
    },
    async editAdmin(id) {
      this.isAdd = false
      this.drawer = true
      const res = await getOneAdmin(id)
      console.log(res)

      this.addForm = res
      this.addForm.loginPwd2 = this.addForm.loginPwd
    },
    async deleteAdmin(row) {
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
        const { success, message } = await deleteAdmin(row.id, row.photo)

        if (success) {
          this.$message.success(message)
          this.getAdminList()
        } else {
          this.$message.error(message)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  // border: 1px dashed #ccc;
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #ccc;

  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
