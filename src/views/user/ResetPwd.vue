<template>
  <div>
    <el-form
      :model="updateForm"
      :rules="updateFormRules"
      ref="updateFormRef"
      label-width="100px"
      class="demo-ruleForm"
      style="width:500px"
    >
      <el-form-item label="原始密码" prop="oldLoginPwd">
        <el-input type="password" v-model="updateForm.oldLoginPwd"></el-input>
      </el-form-item>
      <el-form-item label="最新密码" prop="newLoginPwd">
        <el-input type="password" v-model="updateForm.newLoginPwd"></el-input>
      </el-form-item>
      <el-form-item label="错误密码" prop="newLoginPwd2">
        <el-input type="password" v-model="updateForm.newLoginPwd2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="updatePassword"
          >修改</el-button
        >
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePassword } from '../../network/user'
import { strToMd5 } from '../../utils/md5'
export default {
  name: '',
  data() {
    var checkLoginPwdOld = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'))
      } else {
        callback()
      }
    }
    var checkLoginPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入最新密码'))
      } else {
        callback()
      }
    }
    var checkLoginPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.updateForm.newLoginPwd) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      updateForm: {
        id: this.$store.state.admin.admin.id,
        oldLoginPwd: '',
        newLoginPwd: '',
        newLoginPwd2: ''
      },
      updateFormRules: {
        oldLoginPwd: [{ validator: checkLoginPwdOld, trigger: 'blur' }],
        newLoginPwd: [{ validator: checkLoginPwd, trigger: 'blur' }],
        newLoginPwd2: [{ validator: checkLoginPwd2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCancel() {
      this.$refs.updateFormRef.resetFields()
    },
    updatePassword() {
      this.$refs.updateFormRef.validate(async valid => {
        if (valid) {
          this.updateForm.newLoginPwd = strToMd5(this.updateForm.newLoginPwd)
          this.updateForm.oldLoginPwd = strToMd5(this.updateForm.oldLoginPwd)
          const { message, success } = await updatePassword(this.updateForm)
          if (success) {
            this.$message.success(message)
          } else {
            this.$message.error(message)
          }
        } else {
          this.$message.info('请输入正确的数据')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
