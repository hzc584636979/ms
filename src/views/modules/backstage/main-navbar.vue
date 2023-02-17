<template>
  <nav class="site-navbar">
    <div class="site-navbar__body clearfix">
      {{ account }},<span class="pointer danger-color" @click="logoutHandle()">退出登录</span>
    </div>
  </nav>
</template>

<script>
import { clearLoginInfo } from '@/utils'
export default {
  data () {
    return {
      account: this.$cookie.get('account')
    }
  },
  methods: {
    // 退出
    logoutHandle () {
      this.$confirm(`确定进行 <strong>退出</strong> 操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        clearLoginInfo()
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>
<style lang="scss">
.avatar {
  padding: 1px;
  border: 1px solid #ffd700; //#e7bf94
  border-radius: 50%;
  background: rgba(207, 30, 34,.9);
  box-shadow: 0 0 8px #ffd700;
}

</style>
