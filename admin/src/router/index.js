import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: () => import('../pages/HelloWorld.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/login.vue')
    }
  ]
})
