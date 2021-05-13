<template>
  <div>
    <div>
      <el-button type="primary" style="margin-bottom:10px" @click="addRoomType"
        >添加客房类型</el-button
      >
    </div>
    <el-table stripe :data="roomList" style="width: 100%">
      <el-table-column prop="roomTypeId" label="类型编号" width="180">
      </el-table-column>
      <el-table-column prop="roomTypeName" label="类型名称" width="180">
      </el-table-column>
      <el-table-column prop="bedNum" label="床位数" width="180">
      </el-table-column>
      <el-table-column prop="roomTypePrice" label="价格" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scoped">
          <el-button
            type="warning"
            size="mini"
            @click="editRoom(scoped.row.roomTypeId)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteRoom(scoped.row.roomTypeId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :title="isAdd ? '添加客房类型' : '修改客房类型'"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
      size="45%"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="类型名称" prop="roomTypeName">
          <el-input v-model="addForm.roomTypeName"></el-input>
        </el-form-item>
        <el-form-item label="床位数" prop="bedNum">
          <el-input v-model.number="addForm.bedNum"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="roomTypePrice">
          <el-input v-model.number="addForm.roomTypePrice"></el-input>
        </el-form-item>
        <el-form-item
          style="margin-bottom:100px"
          label="描述"
          prop="typeDescription"
        >
          <quill-editor
            v-model="addForm.typeDescription"
            ref="myQuillEditor"
            style="height: 300px"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{
            isAdd ? '添加' : '修改'
          }}</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import {
  getRoomList,
  addRoom,
  deleteRoom,
  getOneRoom,
  updateRoom
} from '../../network/room'
export default {
  data() {
    var checkRoomTypeName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入类型名称'))
      } else {
        callback()
      }
    }
    var checkBeNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入床位数'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    var checkTypeDescription = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入描述'))
      } else {
        callback()
      }
    }
    var checkRoomTypePrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入类型价格'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }

    return {
      roomList: [],
      drawer: false,
      isAdd: false,
      addForm: {
        roomTypeName: '',
        bedNum: '',
        typeDescription: '',
        roomTypePrice: ''
      },
      addFormRules: {
        roomTypeName: [{ validator: checkRoomTypeName, trigger: 'blur' }],
        bedNum: [{ validator: checkBeNum, trigger: 'blur' }],
        typeDescription: [{ validator: checkTypeDescription, trigger: 'blur' }],
        roomTypePrice: [{ validator: checkRoomTypePrice, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getRoomList() {
      const res = await getRoomList()
      this.roomList = res
    },
    async deleteRoom(id) {
      const confirmResult = await this.$confirm(
        '该操作将永久删除此客房类型，是否继续？',
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
        const { success, message } = await deleteRoom(id)
        if (success) {
          this.$message.success(message)
          this.getRoomList()
        } else {
          this.$message.error(message)
        }
      }
    },
    async editRoom(id) {
      this.isAdd = false
      this.drawer = true
      const res = await getOneRoom(id)
      this.addForm = res
    },
    handleClose(done) {
      done()
      this.$refs.addFormRef.resetFields()
    },
    addRoomType() {
      this.drawer = true
      this.isAdd = true
    },
    handleCancel() {
      this.$refs.addFormRef.resetFields()
    },
    submitForm() {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          if (this.isAdd) {
            const { success, message } = await addRoom(this.addForm)
            if (success) {
              this.$message.success(message)
              this.getRoomList()
              this.drawer = false
              this.isAdd = false
              this.$refs.addFormRef.resetFields()
            } else {
              this.$message.error(message)
            }
          } else {
            const { success, message } = await updateRoom(this.addForm)
            if (success) {
              this.$message.success(message)
              this.getRoomList()
              this.drawer = false
              this.isAdd = false
            } else {
              this.$message.error(message)
            }
          }
        } else {
          this.$message.info('输入的数据有误，请重新输入')
        }
      })
    }
  },
  created() {
    this.getRoomList()
  }
}
</script>
<style lang="less" scoped></style>
