import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('../pages/HelloWorld.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/login.vue')
    }
  ]
})
