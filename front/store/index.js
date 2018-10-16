import http from '../api'

export const actions = {
  nuxtServerInit(store, { params, route, req }) {
    // console.log(isServer)
    const userAgent = req.headers['user-agent']
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    console.log(isMobile)
    store.commit('options/setMobileLayout', isMobile)

    const initAppData = [
      // store.dispatch('getArtList')
      store.dispatch('getTagList')
    ]

    return Promise.all(initAppData)
  },
  async getArtList ({commit}, payload) {
    // console.log('payload====' + JSON.stringify(payload))
    const res = await http.getArtList(payload).catch(err => console.error(err))
    // console.log(res)
    commit('article/setArtList', res.data.data)
    if(payload.isAll) {
      let artList = []
      res.data.data.map(item => {
        
      })
    }
  },
  async getArts ({commit}) {

    const res = await http.getArtList({isAll: true}).catch(err => console.error(err))
    commit('article/setArts', res.data)
  },
  async getTagList ({commit}) {
    const res = await http.getTagList().catch(err => console.error(err))
    console.log(res.data)
    commit('tag/setTagList', res.data)
  }
}




