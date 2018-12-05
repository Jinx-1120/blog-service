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
        {
          title: '评论管理',
          path: '/comment',
          icon: 'comment'
        },
        {
          title: '分类标签',
          path: '/tag',
          icon: 'tag'
        },
        {
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
