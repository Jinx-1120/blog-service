export const state = () => ({
  // 标签
  tagList: [],
})

export const mutations = {
  setTagList(state, data) {
    state.tagList = data
  }
}
