<template>
  <div></div>
</template>
<script>
import { login } from '../network/login'
export default {
  async created() {
    const loginId = localStorage.getItem('loginId')
    const loginPWD = localStorage.getItem('loginPWD')
    if (!loginId || !loginPWD) {
      this.$router.push('/login')
    } else {
      const loginForm = { loginId, loginPWD }
      const { message, success, token } = await login(loginForm)
      if (success) {
        this.$message.succcess(message)
        window.sessionStorage.setItem('token', token)
      } else {
        this.$router.push('/layout')
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
