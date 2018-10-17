
export const state = () => ({
  // 文章
  artList: [],
  arts: [],
  details: {}
})

export const mutations = {
   setArtList(state, data) {
     state.artList = data
   },
   setArts (state, data) {
     state.arts = data
   },
   setDetails (state, data) {
     state.details = data
   },
}

