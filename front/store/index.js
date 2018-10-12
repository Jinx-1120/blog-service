import http from '../api'

export const actions = {
  nuxtServerInit(store, { params, route, req }) {
    // console.log(isServer)
    const userAgent = req.headers['user-agent']
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    console.log(isMobile)
    store.commit('options/setMobileLayout', isMobile)

    const initAppData = [
      store.dispatch('getArtList')
    ]

    return Promise.all(initAppData)
  },
  async getArtList ({commit}) {
    const res = await http.getArtList().catch(err => console.error(err))
    console.log(res)
    commit('article/setArtList', res.data)
  }
}


