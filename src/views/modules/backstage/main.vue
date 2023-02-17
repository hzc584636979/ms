<template>
  <div
    class="site-wrapper"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中">
    <template v-if="!loading && userId">
      <main-sidebar />
      <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
        <main-navbar />
        <main class="site-content">
          <el-card :body-style="siteContentViewHeight">
            <component
              :is="$route.params.routeName"
            ></component>
          </el-card>
        </main>
      </div>
    </template>
  </div>
</template>

<script>
import MainNavbar from './main-navbar'
import MainSidebar from './main-sidebar'
import authorizeList from './authorizeList'
import userList from './userList'
import { clearLoginInfo } from '@/utils'

export default {
  data () {
    return {
      loading: true
    }
  },
  components: {
    MainNavbar,
    MainSidebar,
    authorizeList,
    userList
  },
  computed: {
    documentClientHeight: {
      get () { return this.$store.state.common.documentClientHeight },
      set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
    },
    userId: {
      get () { return this.$store.state.user.id },
      set (val) { this.$store.commit('user/updateId', val) }
    },
    siteContentViewHeight () {
      var height = this.documentClientHeight - 50 - 30 - 2
      return { minHeight: height + 'px' }
    }
  },
  created () {
    this.removeLoading()
    this.getUserInfo()
  },
  mounted () {
    this.resetDocumentClientHeight()
  },
  methods: {
    // 重置窗口可视高度
    resetDocumentClientHeight () {
      this.documentClientHeight = document.documentElement['clientHeight']
      window.onresize = () => {
        this.documentClientHeight = document.documentElement['clientHeight']
      }
    },
    // 获取当前管理员信息
    getUserInfo () {
      this.loading = false
      this.userId = this.$cookie.get('userId')
      if (this.userId === null || this.userId === undefined || this.userId === '') {
        // 重新发版刷新页面 当前登录用户为null的时候跳转到登录页
        clearLoginInfo()
        this.$router.push({ name: 'login' })
      }
    },
    // 移除登录页之前的loading
    removeLoading () {
      var loadingMask = document.getElementById('loadingMark')
      var loadingCss = document.getElementById('loadCss')
      if (loadingMask != null && loadingCss != null) {
        document.getElementsByTagName('head')[0].removeChild(loadingCss)
        loadingMask.parentNode.removeChild(loadingMask)
      }
    }
  }
}
</script>
