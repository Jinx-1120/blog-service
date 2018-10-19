<template>
    <div class="login_page fillcontain">
        <canvas ref="canvas"></canvas>
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
                          <span @click="dialogFormVisible = true">注册</span>
                      </el-form-item>
                  </el-form>
                </div>
            </section>
        </transition>
        <el-dialog title="创建账号" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input type="text" v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input type="password" v-model="form.passWord" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="createAccount">确 定</el-button>
          </div>
        </el-dialog>
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
      },
      form: {
        userName: '',
        passWord: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  mounted() {
    document.addEventListener('touchmove', function (e) {
        e.preventDefault()
    })
    var c = this.$refs.canvas,
        x = c.getContext('2d'),
        pr = window.devicePixelRatio || 1,
        w = window.innerWidth,
        h = window.innerHeight,
        f = 160,
        q,
        m = Math,
        r = 100,
        u = m.PI*2,
        v = m.sin,
        z = m.random
    c.width = w*pr
    c.height = h*pr
    x.scale(pr, pr)
    x.globalAlpha = 0.6
    function i(){
        x.clearRect(0,0,w,h)
        q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
        while(q[1].x<w+f) d(q[0], q[1])
    }
    function d(i,j){
        x.beginPath()
        x.moveTo(i.x, i.y)
        x.lineTo(j.x, j.y)
        var k = j.x + (z()*2-0.25)*f,
            n = y(j.y)
        x.lineTo(k, n)
        x.closePath()
        r-=u/-50
        x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
        x.fill()
        q[0] = q[1]
        q[1] = {x:k,y:n}
    }
    function y(p){
        var t = p + (z()*2-1.1)*f
        return (t>h||t<0) ? y(p) : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()
  },
  methods: {
    submit () {
      this.http({method:'post',url:'/login', data: this.loginForm}).then(info => {
        this.$router.push('/')
      }).catch(err => {
        console.error(err)
      })
    },
    createAccount () {
      this.http({method: 'post', url: '/register',data: this.form}).then(info => {
        console.log(info)
        this.dialogFormVisible = false
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
canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
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
