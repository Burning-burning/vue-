<template>
  <div>
    <el-drawer
      :title="type === 'add' ? '添加角色' : '编辑角色'"
      :visible.sync="drawer1"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <div style="padding: 0 10px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addForm.roleName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">{{
              type === 'add' ? '添加' : '修改'
            }}</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { addRole, updateOneRole } from '../network/role'
export default {
  props: {
    direction: {
      type: String,
      default: 'rtl'
    },
    drawer: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    role: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    var checkRoleName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入角色名称'))
      } else {
        callback()
      }
    }
    return {
      drawer1: this.drawer,
      addForm: {
        roleName: this.role.roleName || ''
      },
      addFormRules: {
        roleName: [{ validator: checkRoleName, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose(done) {
      done()
      this.drawer1 = false
      this.$emit('close', this.drawer1)
      this.$refs.addFormRef.resetFields()
    },

    submitForm() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('输入数据有误')
        } else {
          if (this.type == 'add') {
            const { success, message } = await addRole(this.addForm)
            if (success) {
              this.$message.success(message)
              this.drawer1 = false
              this.$emit('handleClose', this.drawer1)
              this.$refs.addFormRef.resetFields()
            } else {
              this.$message.error(message)
            }
          } else {
            const { success, message } = await updateOneRole(this.addForm)
            if (success) {
              this.$message.success(message)
              this.drawer1 = false
              this.$emit('handleClose', this.drawer1)
              this.$refs.addFormRef.resetFields()
            } else {
              this.$message.error(message)
            }
          }
        }
      })
    },
    resetForm() {
      this.$refs.addFormRef.resetFields()
    }
  },
  watch: {
    drawer(newValue, oldValue) {
      console.log(newValue)
      this.drawer1 = newValue
    },
    role(newValue, oldValue) {
      this.addForm = this.role
    }
  }
}
</script>
<style lang="less" scoped></style>
