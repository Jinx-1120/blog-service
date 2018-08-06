import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import ('../pages/login.vue')
    },
    {
      path: '/',
      name: 'index',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: () => import('../pages/layout/index.vue'),
      children: [
        {
          path: '/tag',
            name: 'tag',
            meta: {
              // 添加该字段，表示进入这个路由是需要登录的
              requireAuth: true,
              name: '标签管理'
            },
            component: () => import('../pages/tag.vue')
        },
        {
          path: '/article',
          name: 'article',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
            name: '文章管理'
          },
          component: () =>
            import ('../pages/article.vue')
        },
        {
          path: '/user/admin',
          name: 'admin',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
            name: '超级用户'
          },
          component: () =>
            import ('../pages/user/admin.vue')
        },
        {
          path: '/user/common',
          name: 'common',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
            name: '普通用户'
          },
          component: () =>
            import ('../pages/user/common.vue')
        }
      ]
    }
  ]
})
