import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: () =>
        import ('../pages/login.vue')
    },
    {
      path: '/home',
      name: 'index',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
        name: '首页'
      },
      component: () =>
        import('../pages/layout/index.vue'),
      children: [{
          path: '/tag',
          name: 'tag',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
            name: 'tag'
          },
          component: () =>
            import('../pages/tag.vue')
        },
        {
          path: '/article',
          name: 'article',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
            name: 'article'
          },
          component: () =>
            import ('../pages/article/article.vue')
        },
        {
          path: '/addArticle',
          name: 'addArticle',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
            name: 'addArticle'
          },
          component: () =>
            import ('../pages/article/addArticle.vue')
        },
        {
          path: '/editArticle/:id',
          name: 'editArticle',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
            name: 'editArticle'
          },
          component: () =>
            import ('../pages/article/editArticle.vue')
        },
        {
          path: '/showArticle/:id',
          name: 'showArticle',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
            name: 'showArticle'
          },
          component: () =>
            import ('../pages/article/showArticle.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') {
    next({
      path: '/home'
    })
  }
  next()
})

export default router
