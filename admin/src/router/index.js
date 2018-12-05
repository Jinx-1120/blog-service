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
      path: '/404',
      name: '404',
      component: () => import ('../pages/404.vue')
    },
    {
      path: '/',
      name: 'index',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
        name: '首页'
      },
      component: () =>
        import('../pages/layout/index.vue'),
      children: [{
            path: '/home',
            name: 'home',
            meta: {
              // 添加该字段，表示进入这个路由是需要登录的
              requireAuth: true,
              name: 'home'
            },
            component: () =>
              import('../pages/home.vue')
          },
          {
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
          path: '/comment',
          name: 'comment',
          meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
            name: 'comment'
          },
          component: () =>
            import('../pages/comment.vue')
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
