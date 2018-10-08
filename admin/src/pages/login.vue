<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <!-- <p>管理系统</p> -->
                    <el-form :model="loginForm" ref="loginForm">
                      <el-form-item prop="username">
                          <el-input size="small" type="text" v-model="loginForm.userName"
                                    placeholder="用户名"></el-input>
                      </el-form-item>
                      <el-form-item prop="password">
                          <el-input size="small" type="password" placeholder="密码"
                                    v-model="loginForm.passWord"></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-button @click="submit" type="primary" :disabled="!(loginForm.userName && loginForm.passWord)" class="submit_btn">登陆</el-button>
                      </el-form-item>
                  </el-form>
                </div>
            </section>
        </transition>
    </div>
</template>

<script>

export default {
  data() {
    return {
      showLogin: true,
      adminCookieKey: 'manager_login_token',
      loginForm: {
        userName: '',
        passWord: ''
      }
    }
  },
  created() {

  },
  methods: {
    submit () {
      this.http({method:'post',url:'/login', data: this.loginForm}).then(info => {
        this.$router.push('/')
      }).catch(err => {
        console.error(err)
      })
    }
  },
  watch: {}
}
</script>

<style lang="scss">
.loginLoding {
  .el-loading-text, i {
    color: #fff;
  }
}
.login_page {
  display: flex;
  justify-content: center;
  align-items: center;
  .form_contianer {
    padding: 45px;
    border-radius: 5px;
    background: #695f5fb5;
    text-align: center;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }
  .tip {
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
}
</style>
