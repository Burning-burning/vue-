<template>
  <div>
    <div>
      客户姓名：<el-input
        v-model="guestName"
        style="width:200px;margin-right: 10px"
        size="mini"
        placeholder="请输入客户姓名"
        clearable
      ></el-input>
      结账状态：
      <el-select v-model="resideStateId" placeholder="请选择结账状态" clearable>
        <el-option
          v-for="item in resideStateList"
          :key="item.resideStateId"
          :label="item.resideStateName"
          :value="item.resideStateId"
        >
        </el-option>
      </el-select>
      <el-button style="margin-left: 10px" type="primary" @click="query"
        >查询</el-button
      >

      <el-button type="success" @click="excel" style="margin-left: 10px"
        >导出Excel</el-button
      >
      <el-button @click="addGuest">添加</el-button>
    </div>
    <el-table :data="guestList" style="width: 100%">
      <el-table-column prop="guestName" label="顾客姓名" width="80">
      </el-table-column>
      <el-table-column prop="identityId" label="身份证号" width="100">
      </el-table-column>
      <el-table-column prop="phone" label="客户电话" width="100">
      </el-table-column>
      <el-table-column prop="roomId" label="入住房间" width="80">
      </el-table-column>
      <el-table-column
        prop="room.roomType.roomTypeName"
        label="房间类型"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="room.roomType.bedNum" label="床位数" width="80">
      </el-table-column>
      <el-table-column
        prop="room.roomType.roomTypePrice"
        label="房间价格"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="resideDate" label="入住日期" width="150">
      </el-table-column>
      <el-table-column prop="leaveDate" label="离开日期" width="150">
      </el-table-column>
      <el-table-column prop="deposit" label="押金" width="60">
      </el-table-column>
      <el-table-column prop="totalMoney" label="消费" width="60">
      </el-table-column>
      <el-table-column prop="guestNum" label="入住人数" width="80">
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.resideState.resideStateId === 1 ? 'danger' : 'success'
            "
            disable-transitions
            >{{ scope.row.resideState.resideStateName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button
            size="mini"
            type="text"
            @click="editGuest(scoped.row)"
            v-if="scoped.row.resideStateId === 1"
            >编辑</el-button
          >
          <el-button
            size="mini"
            style="color: #E6A23C"
            type="text"
            @click="handleJiezhang(scoped.row)"
            v-if="scoped.row.resideStateId === 1"
            >结账</el-button
          >

          <el-button
            size="mini"
            style="color:#f56C6C"
            type="text"
            @click="deleteGuest(scoped.row)"
            v-if="scoped.row.resideStateId === 2"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="flex j-c"
      background
      layout="prev, pager, next"
      :total="count"
      @current-change="handlePageChange"
    >
    </el-pagination>
    <el-drawer
      :title="isAdd ? '添加' : '修改'"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
      size="30%"
    >
      <el-form
        :model="addForm"
        status-icon
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="guestName">
          <el-input v-model="addForm.guestName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="identityId">
          <el-input v-model="addForm.identityId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间类型" prop="roomTypeId">
          <el-select
            v-model="addForm.roomTypeId"
            placeholder="请选择房间类型"
            @change="handleRoomTypeChange"
            clearable
          >
            <el-option
              v-for="item in roomTypeList"
              :key="item.roomTypeId"
              :label="item.roomTypeName"
              :value="item.roomTypeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间" prop="roomId">
          <template>
            <el-select
              v-model="addForm.roomId"
              placeholder="请选择房间"
              clearable
            >
              <el-option
                v-for="item in roomList"
                :key="item.roomId"
                :label="item.roomId"
                :value="item.roomId"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="入住日期" prop="resideDate">
          <el-date-picker
            v-model="addForm.resideDate"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input v-model="addForm.deposit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入住人数" prop="guestNum">
          <el-input v-model="addForm.guestNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{
            isAdd ? '添加顾客' : '修改顾客'
          }}</el-button>
          <el-button @click="cancelForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {
  getGuest,
  getResideList,
  getRooms,
  addGuest,
  getOneGuest,
  updateGuest,
  deleteGuest,
  getJiezhang
} from '../../network/guest'
import { xlsx } from '../../utils/xlsx'
import { getRoomList } from '../../network/room'
export default {
  name: '',
  data() {
    var checkGuestName = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入顾客姓名'))
      } else {
        callback()
      }
    }
    var checkIdentityId = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入身份证'))
      } else {
        callback()
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入顾客电话'))
      } else {
        callback()
      }
    }
    var checkRoomTypeId = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入房间类型'))
      } else {
        callback()
      }
    }
    var checkRoomId = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入房间'))
      } else {
        callback()
      }
    }
    var checkResideDate = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入入住日期'))
      } else {
        callback()
      }
    }
    var checkDeposit = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入押金'))
      } else {
        callback()
      }
    }
    var checkGuestNum = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入入住人数'))
      } else {
        callback()
      }
    }
    return {
      guestList: [],
      count: 0,
      pageIndex: 1,
      guestName: '',
      resideStateId: '',
      resideStateList: [],
      isAdd: false,
      drawer: false,
      roomTypeList: [],
      roomList: [],
      guestId: '',
      addForm: {
        guestName: '',
        identityId: '',
        phone: '',
        roomTypeId: '',
        roomId: '',
        resideDate: '',
        deposit: '',
        guestNum: ''
      },
      addFormRules: {
        guestName: [{ validator: checkGuestName, trigger: 'blur' }],
        identityId: [{ validator: checkIdentityId, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        roomTypeId: [{ validator: checkRoomTypeId, trigger: 'change' }],
        roomId: [{ validator: checkRoomId, trigger: 'change' }],
        resideDate: [{ validator: checkResideDate, trigger: 'change' }],
        deposit: [{ validator: checkDeposit, trigger: 'blur' }],
        guestNum: [{ validator: checkGuestNum, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getGuestList() {
      const { count, data } = await getGuest(
        this.guestName,
        this.resideStateId || 0,
        this.pageIndex
      )
      this.count = count
      this.guestList = data
    },
    query() {
      this.getGuestList()
    },
    excel() {
      const json = this.guestList.map(guest => {
        return {
          guestName: guest.guestName,
          identityId: guest.identityId,
          phone: guest.phone,
          roomId: guest.roomId,
          roomTypeName: guest.room.roomType.roomTypeName,
          bedNum: guest.room.roomType.bedNum,
          price: guest.room.roomType.roomTypePrice,
          resideDate: guest.resideDate,
          leaveDate: guest.leaveDate,
          deposit: guest.deposit,

          totalMoney: guest.totalMoney,
          guestNum: guest.guestNum,
          resideStateName: guest.resideState.resideStateName
        }
      })
      const fields = {
        guestName: '顾客姓名',
        identityId: '身份证号',
        phone: '客户电话',
        roomId: '入住房间',
        roomTypeName: '房间类型',
        bedNum: '床位数',
        price: '房间价格',
        resideDate: '入住日期',
        leaveDate: '离开日期',
        deposit: '押金',
        totalMoney: '消费',
        guestNum: '入住人数',
        resideStateName: '状态'
      }
      const filename = '客户信息表'
      xlsx(json, fields, filename)
    },
    handlePageChange(pageNum) {
      this.pageIndex = pageNum
      this.getGuestList()
    },
    async getResideStateList() {
      const res = await getResideList()
      this.resideStateList = res
    },
    handleClose(done) {
      done()
      this.$refs.addFormRef.resetFields()
    },
    submitForm() {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          if (this.isAdd) {
            const { success, message } = await addGuest(this.addForm)
            if (success) {
              this.$message.success(message)
              this.drawer = false
              this.isAdd = false
              this.$refs.addFormRef.resetFields()
              this.getGuestList()
            } else {
              this.$message.error(message)
            }
          } else {
            const { success, message } = await updateGuest(this.addForm)
            if (success) {
              this.$message.success(message)
              this.drawer = false
              this.isAdd = false
              this.$refs.addFormRef.resetFields()
              this.getGuestList()
            } else {
              this.$message.error(message)
            }
          }
        } else {
          this.$message.info('输入的数据有误，请重新输入')
        }
      })
    },
    cancelForm() {
      this.$refs.addFormRef.resetFields()
    },
    addGuest() {
      this.drawer = true
      this.isAdd = true
    },
    async handleRoomTypeChange() {
      this.addForm.roomId = ''
      const roomTypeId = this.addForm.roomTypeId
      if (roomTypeId) {
        const id = this.guestId ? this.guestId : 0
        const { data } = await getRooms(roomTypeId, 1, id)
        this.roomList = data
      }
    },
    async editGuest(row) {
      this.drawer = true
      this.isAdd = false
      this.guestId = row.guestId
      const res = await getOneGuest(this.guestId)
      this.addForm = res
      this.addForm.roomTypeId = res.room.roomTypeId

      const roomTypeId = this.addForm.roomTypeId
      if (roomTypeId) {
        const id = this.guestId ? this.guestId : 0
        const { data } = await getRooms(roomTypeId, 1, id)
        this.roomList = data
      }
    },
    async deleteGuest(row) {
      this.guestId = row.guestId
      const confirmResult = await this.$confirm(
        '该操作将永久删除此顾客，是否继续?',
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
        const { message, success } = await deleteGuest(this.guestId)
        if (success) {
          this.$message.success(message)
          this.getGuestList()
        } else {
          this.$message.error(message)
        }
      }
    },
    async getRoomTypeList() {
      const res = await getRoomList()
      this.roomTypeList = res
    },
    async handleJiezhang(row) {
      this.guestId = row.guestId
      const { totalMoney } = await getJiezhang(this.guestId)
      if (totalMoney > 0) {
        this.$message.success(
          '结账成功，需要支付' + totalMoney + '元，客房费用！'
        )
        this.getGuestList()
      }
    }
  },

  created() {
    this.getGuestList()
    this.getResideStateList()

    this.getRoomTypeList()
  }
}
</script>

<style lang="less" scoped></style>
