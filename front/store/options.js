/**
 *
 * options
 */

export const state = () => {
  return {
    // 是否有侧边栏
    isAsidePage: false,

    // 是否为移动端
    isMobile: false,

    // 错误页面
    isError: false,

    isWelcome: false,

    // 移动端侧边栏
    mobileSidebar: false,
  }
}

export const mutations = {
  // 侧边栏
  setAsidePage (state, flag) {
    state.isAsidePage = flag
  },
  // 设置移动端布局状态
  setMobileLayout(state, flag) {
    console.log('flag======'+flag)
    state.mobileLayout = flag
  },
  // 设置是否移动端状态
  setMobileSidebar (state, flag) {
    state.mobileSidebar = flag
  }
  
}


