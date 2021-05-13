<template>
  <div>
    <div>
      客房类型：
      <el-select v-model="roomTypeId" placeholder="请选择客房类型">
        <el-option
          v-for="item in roomTypeList"
          :key="item.roomTypeId"
          :label="item.roomTypeName"
          :value="item.roomTypeId"
        >
        </el-option>
      </el-select>
      客房状态：
      <el-select v-model="roomStateId" placeholder="请选择客房状态类型">
        <el-option
          v-for="item in roomStateList"
          :key="item.roomStateId"
          :label="item.roomStateName"
          :value="item.roomStateId"
        >
        </el-option> </el-select
      ><el-button @click="queryInfo" style="margin-left:10px" type="success"
        >查询</el-button
      >
      <el-button type="success" @click="excel">导出Excel</el-button>
      <el-button type="primary" @click="addRoom">添加</el-button>
    </div>
    <el-table :data="roomList" style="width: 100%">
      <el-table-column prop="roomId" label="房间号" width="180">
      </el-table-column>
      <el-table-column
        prop="roomType.roomTypeName"
        label="房间类型"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="roomType.bedNum" label="床位数" width="180">
      </el-table-column>
      <el-table-column prop="roomType.roomTypePrice" label="价格" width="180">
      </el-table-column>
      <el-table-column
        prop="roomState.roomStateName"
        label="房间状态"
        width="180"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button type="warning" size="mini" @click="editRoom(scoped.row)"
            >编辑</el-button
          >
          <el-button
            type="success"
            size="mini"
            @click="handleShowImg(scoped.row)"
            >图片</el-button
          >
          <el-button type="danger" size="mini" @click="deleteRoom(scoped.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="flex j-c"
      style="margin-top:5px"
      background
      layout="prev, pager, next"
      :total="count"
      @current-change="handlechange"
    >
    </el-pagination>

    <el-drawer
      :title="isAdd ? '添加客房' : '修改客房'"
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
        <el-form-item label="客房编号" prop="roomId">
          <el-input v-model.number="addForm.roomId"></el-input>
        </el-form-item>
        <el-form-item label="客房类型" prop="roomTypeId">
          <el-select v-model="addForm.roomTypeId" placeholder="请选择客房类型">
            <el-option
              v-for="item in roomTypeList"
              :key="item.roomTypeId"
              :label="item.roomTypeName"
              :value="item.roomTypeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房状态" prop="roomStateId">
          <el-select
            v-model="addForm.roomStateId"
            placeholder="请选择客房状态类型"
          >
            <el-option
              v-for="item in roomUpdateState"
              :key="item.roomStateId"
              :label="item.roomStateName"
              :value="item.roomStateId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="margin-bottom:150px"
          label="客房描述"
          prop="description"
        >
          <quill-editor
            v-model="addForm.description"
            style="height: 300px"
            ref="myQuillEditor"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{
            isAdd ? '添加' : '修改'
          }}</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-dialog
      title="房间图片"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleDialogClose"
    >
      <el-upload
        action="http://bingjs.com:83/RoomImg/UploadImg/"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog append-to-body :visible.sync="dialogVisible2">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoom,
  getRoomList,
  getRoomState,
  getRoomUpdateState,
  tianjiaRoom,
  getARoom,
  xiugaiRoom,
  deleteOneRoom,
  getImgByRoomId,
  addImg,
  deleteImg
} from '../../network/room'
import { xlsx } from '../../utils/xlsx'
export default {
  name: '',
  data() {
    var checkRoomId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入房间号'))
      } else if (!parseInt(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    var checkRoomStateId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入房间状态'))
      } else {
        callback()
      }
    }
    var checkRoomTypeId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入房间类型'))
      } else {
        callback()
      }
    }
    return {
      roomList: [],
      count: 0,
      dialogVisible: false,
      pageIndex: 1,
      roomTypeList: [],
      dialogVisible2: false,
      roomTypeId: '',
      roomStateList: [],
      roomStateId: '',
      drawer: false,
      isAdd: false,
      roomUpdateState: [],
      dialogImageUrl: '',
      fileList: [],
      roomId: '',
      addForm: {
        roomId: '',
        roomTypeId: '',
        roomStateId: '',
        description: ''
      },
      addFormRules: {
        roomId: [{ validator: checkRoomId, trigger: 'blur' }],
        roomTypeId: [{ validator: checkRoomTypeId, trigger: 'change' }],
        roomStateId: [{ validator: checkRoomStateId, trigger: 'change' }]
      }
    }
  },
  created() {
    this.getRoomList()
    this.getRoomTypeList()
    this.getRoomStateList()
    this.getUpdateStateList()
  },

  methods: {
    async getRoomList() {
      const { data, count } = await getRoom(
        this.roomTypeId || 0,
        this.roomStateId || 0,
        this.pageIndex
      )
      this.roomList = data
      this.count = count
    },
    async editRoom(row) {
      const res = await getARoom(row.roomId)

      this.addForm = res
      this.addForm.id = res.roomId
      this.drawer = true
      this.isAdd = false
    },
    handleDialogClose(done) {
      this.fileList = []
      done()
    },
    async handleRemove(file) {
      const { roomImgId, name } = file
      const { success, message } = await deleteImg(roomImgId, name)
      if (success) {
        this.$message.success(message)
      } else {
        this.$message.error(message)
      }
    },
    excel() {
      // const json = [
      //   {
      //     id: 1,
      //     name: '张杰',
      //     age: 20
      //   },
      //   {
      //     id: 2,
      //     name: '谢娜',
      //     age: 30
      //   }
      // ]
      // const fields = { id: '编号', name: '姓名', age: '年龄' }
      const json = this.roomList.map(r => {
        return {
          roomId: r.roomId,
          roomType: r.roomType.roomTypeName,
          bedNum: r.roomType.bedNum,
          price: r.roomType.roomTypePrice,
          roomState: r.roomState.roomStateName
        }
      })
      const fields = {
        roomId: '房间号',
        roomType: '房间类型',
        bedNum: '床位数',
        price: '价格',
        roomState: '房间状态'
      }
      const filename = '客房信息表'
      xlsx(json, fields, filename)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible2 = true
    },
    async deleteRoom(row) {
      const confirmResult = await this.$confirm(
        '该操作将永久删除此房间，是否继续？',
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
        const { message, success } = await deleteOneRoom(row.roomId)
        if (success) {
          this.$message.success(message)
          this.getRoomList()
        } else {
          this.$message.error(message)
        }
      }
    },
    addRoom() {
      this.drawer = true
      this.isAdd = true
    },
    async getUpdateStateList() {
      const res = await getRoomUpdateState()
      this.roomUpdateState = res
    },
    handlechange(pageNum) {
      this.pageIndex = pageNum
      this.getRoomList()
    },
    submitForm() {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          if (this.isAdd) {
            const { success, message } = await tianjiaRoom(this.addForm)
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
            const { success, message } = await xiugaiRoom(this.addForm)
            if (success) {
              this.$message.success(message)
              this.getRoomList()
              this.drawer = false
              this.isAdd = false
              this.$refs.addFormRef.resetFields()
            } else {
              this.$message.error(message)
            }
          }
        } else {
          this.$message.info('输入的数据有误，请重新输入')
        }
      })
    },
    async handleShowImg(row) {
      this.dialogVisible = true
      this.roomId = row.roomId
      const res = await getImgByRoomId(this.roomId)
      this.fileList = res.map(r => {
        return {
          roomImgId: r.roomImgId,
          name: r.imgUrl,
          url: 'http://bingjs.com:83/upload/room/' + r.imgUrl
        }
      })
    },
    async getRoomTypeList() {
      const res = await getRoomList()
      this.roomTypeList = res
    },
    async getRoomStateList() {
      const res = await getRoomState()
      this.roomStateList = res
    },
    async queryInfo() {
      this.getRoomList()
    },
    handleClose(done) {
      done()
      this.$refs.addFormRef.resetFields()
    },
    cancel() {
      this.$refs.addForm.resetFields()
    },
    async handleAvatarSuccess(res, file) {
      const { success, filename } = res
      if (success) {
        const xx = await addImg(this.roomId, filename)
        console.log(xx)
        if (xx.success) {
          this.$message.success(xx.message)
          const qq = await getImgByRoomId(this.roomId)
          this.fileList = qq.map(r => {
            return {
              roomImgId: r.roomImgId,
              name: r.imgUrl,
              url: 'http://bingjs.com:83/upload/room/' + r.imgUrl
            }
          })
          console.log(this.fileList)
        } else {
          this.$message.error(xx.message)
        }
      }
    },
    beforeAvatarUpload(file) {
      const img_type_list = ['image/jpeg', 'image/gif', 'image/png']
      const isJPG = img_type_list.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传客房图片只能是 JPG PNG GIF 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传客房图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped></style>
