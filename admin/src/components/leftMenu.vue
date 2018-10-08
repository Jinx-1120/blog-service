<template>
  <div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <menu-item v-for="(route,index) in routers" :key="index" :item="route" :base-path="route.path"></menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuItem from './common/MenuItem'
export default {
  data () {
    return {
      routers:[
        {
          title: '主页',
          path: '/home',
          icon: 'home'
        },
        // {
        //   title: '用户管理',
        //   path: '/user',
        //   icon: 'usermanager',
        //   children: [{
        //     title: '系统用户',
        //     path: '/user/admin',
        //     icon: 'superuser'
        //   },{
        //     title: '普通用户',
        //     path: '/user/common',
        //     icon: 'common'
        //   }]
        // },
        {
          title: '分类标签',
          path: '/tag',
          icon: 'tag'
        },{
          title: '文章管理',
          path: '/article',
          icon: 'article'
        }
      ]
    }
  },
  mounted() {
    // console.log(this.$store.state)
  },
  components: {
    MenuItem
  },
  computed:{
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
  }
}
</script>

<style>


</style>
