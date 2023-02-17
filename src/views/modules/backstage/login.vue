<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="login-main">
          <div class="login-title-all">
            <h3 class="login-title">墨水激活后台系统</h3>
          </div>
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            @keyup.enter.native="dataFormSubmit()"
            status-icon
          >
            <el-form-item prop="account">
              <el-input
                v-model.trim="dataForm.account"
                clearable
                placeholder="请输入8-16位字母和数字"
              >
                <div class="input-pre-text" slot="prepend">账号</div>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model.trim="dataForm.password"
                type="password"
                clearable
                show-password
                placeholder="请输入8-16位字母和数字"
              >
                <div class="input-pre-text" slot="prepend">密码</div>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-btn-submit"
                type="primary"
                :loading="loading"
                @click="dataFormSubmit()"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { adminLoginIn } from '@/api/account'
import { isUserName, isPassWord } from '@/utils/validate'
export default {
  data () {
    let validateAccount = (rule, value, callback) => {
      if (!isUserName(value)) {
        callback(new Error('请输入8-16位字母和数字的账号'))
      } else {
        callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (!isPassWord(value)) {
        callback(new Error('请输入8-16位字母和数字的密码'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dataForm: {
        account: '',
        password: ''
      },
      dataRule: {
        account: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: validateAccount, trigger: 'blur', min: 8, max: 16 }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur', min: 8, max: 16 }
        ]
      }
    }
  },
  created () {
    this.removeLoading()
  },
  methods: {
    // 提交表单
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$cookie.set('token', 'token')
          this.$cookie.set('userId', 'userId')
          this.$cookie.set('account', this.dataForm.account)
          this.$router.replace({ path: '/backstage/authorizeList' })
          // const params = { ...this.dataForm }
          // this.loading = true
          // adminLoginIn(params).then(({ data }) => {
          //   if (data && data.success === true) {
          //     this.$cookie.set('token', data.data.token)
          //     this.$cookie.set('userId', data.data.employeeId)
          //     this.$router.replace({ path: '/backstage/authorizeList' })
          //   } else {
          //     this.loading = false
          //     this.$message.error(data.message)
          //   }
          // }).catch(({err}) => {
          //   console.log(err)
          //   if (err === undefined) {
          //     this.$message.error('网络错误，请检查网络之后重试')
          //   }
          //   this.loading = false
          // })
        }
      })
    },
    removeLoading () {
      // 移除登录页之前的loading
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

<style lang="scss" scope>
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/img/login_bg.jpg);
    background-size: cover;
  }
  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }
  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }
  .login-main {
    position: absolute;
    top: 50%;
    margin-top: -200px;
    left: 50%;
    margin-left: -235px;
    padding: 30px 60px 20px;
    width: 470px;
    background: rgba(0, 0, 0, 0.3) !important;
    border-radius: 5px;
    input::-webkit-input-placeholder{
        color:#909399;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#909399;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#909399;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#909399;
    }
  }
  .login-title-all {
    color: rgb(244, 220, 1);
    .login-title {
      text-align: center;
      margin: 10px 0 20px;
      font-size: 26px;
      font-weight: 400;
      text-transform: uppercase;
    }
  }
  .login-btn-submit {
    width: 100%;
    margin-top: 10px;
  }
  .input-pre-text {
    width: 40px;
    text-align: justify;
    text-align-last: justify;
  }
}

</style>
