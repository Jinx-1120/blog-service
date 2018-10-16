
export const state = () => ({
  // 文章
  artList: [],
  arts: []
})

export const mutations = {
   setArtList(state, data) {
     state.artList = data
   },
   setArts (state, data) {
     state.arts = data
   }
}

