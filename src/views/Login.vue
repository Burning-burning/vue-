<template>
  <div class="main">
    <div class="login">
      <p class="title">Bing酒店管理系统</p>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="40px"
        size="mini"
      >
        <el-form-item label="账户" prop="loginId">
          <el-input v-model="loginForm.loginId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="loginPWD">
          <el-input
            type="password"
            @keydown.native.enter="loginPWDEnter"
            v-model="loginForm.loginPWD"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.checked">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <canvas id="particle-canvas" width="967" height="937"> </canvas>
  </div>
</template>
<script>
import { login } from '../network/login'
import { strToMd5 } from '../utils/md5'
import { start } from '../assets/js/login'
export default {
  mounted() {
    start()
  },
  data() {
    var checkLoginId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var checkLoginPWD = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginId: '',
        checked: false,
        loginPWD: ''
      },
      loginFormRules: {
        loginId: [{ validator: checkLoginId, trigger: 'blur' }],
        loginPWD: [{ validator: checkLoginPWD, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          this.loginForm.loginPWD = strToMd5(this.loginForm.loginPWD)
          const { message, success, token } = await login(this.loginForm)
          if (success) {
            this.$message.success(message)
            window.sessionStorage.setItem('token', token)
          } else {
            this.$message.error(message)
            localStorage.setItem('loginId', this.loginForm.loginId)
            if (this.loginForm.checked) {
              localStorage.setItem('loginPWD', this.loginForm.loginPWD)
            }
            this.$router.push('/layout')
          }
        } else {
          this.$message.error('请重新输入')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    loginPWDEnter() {
      this.submitForm()
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  .login {
    width: 440px;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: absolute;
    z-index: 999;
    padding: 20px;
    font-family: gjm;
    .title {
      color: white;
      font-size: 18px;
      text-align: center;

      margin-bottom: 20px;
    }
  }
}
html,
body {
  margin: 0;
}

#particle-canvas {
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgb(10, 10, 50) 0%,
    rgb(60, 10, 60) 100%
  );
  vertical-align: middle;
}
</style>
