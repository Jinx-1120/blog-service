<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <left-menu class="sidebar-container"></left-menu>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <div>
        <section class="app-main">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view :key="key"></router-view>
            </keep-alive>
          </transition>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/navbar'
import tagsView from '../../components/tagview'
import LeftMenu from '../../components/leftMenu'
import ResizeHandle from '../../lib/ResizeHandle.js'
export default {
  mixins: [ResizeHandle],
  data () {
    return {

    }
  },
  components: {
    Navbar,
    LeftMenu,
    tagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss">
@import "../../style/layout.scss";
.admin-wrap{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  .el-header{
    width: 100%;
  }
  .el-container{
    flex:1;
    width: 100%;
    background: #333;
    display: flex;
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      flex:1;
      text-align: center;
      line-height: 200px;
    }
    .el-main{
      flex:5
    }
  }
}
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
}
</style>
