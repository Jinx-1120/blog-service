<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <!-- <p>管理系统</p> -->
                </div>
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
    this.http({method:'get',url:'/tagList'}).then(info => {
      // console.log(info)
    })
  },
  methods: {
    submit () {
      this.http.post('/login', this.loginForm).then(info => {
        this.$router.push('/')
      }).catch(err => {
        console.error(err)
      })
    }
  },
  watch: {}
}
</script>

<style lang="less">
.ctp(@width, @height) {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -@height/2;
  margin-left: -@width/2;
}
.loginLoding {
  .el-loading-text, i {
    color: #fff;
  }
}
.login_page {
  background-color: #11a63f;
  .manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p {
      font-size: 32px;
      color: #ffffff;
    }
  }
  .form_contianer {
    width: 320px;
    height: 210px;
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
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
