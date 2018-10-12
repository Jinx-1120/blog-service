
export const state = () => ({
  // 文章
  artList: [],
})

export const mutations = {
   setArtList(state, data) {
     state.artList = data
   }
}

