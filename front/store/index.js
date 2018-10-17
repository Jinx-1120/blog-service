import http from '../api'

export const actions = {
  nuxtServerInit(store, { params, route, req }) {
    // console.log(isServer)
    const userAgent = req.headers['user-agent']
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    console.log(isMobile)
    store.commit('options/setMobileLayout', isMobile)

    const initAppData = [
      store.dispatch('getTagList')
    ]
    return Promise.all(initAppData)
  },
  async getArtList ({commit}, payload) {
    const res = await http.getArtList(payload).catch(err => console.error(err))
    commit('article/setArtList', res.data.data)
    if (payload.isAll != undefined && payload.isAll) {
      let artList = []
      let arts = getMonthList(res.data.data)
      commit('article/setArts', arts)
    }
  },
  async getArt({commit}, payload) {
    const res = await http.getArt(payload).catch(err => console.error(err))
    commit('article/setDetails', res.data)
  },
  async getTagList ({commit}) {
    const res = await http.getTagList().catch(err => console.error(err))
    commit('tag/setTagList', res.data)
  }
}
/**
 *
 * @param {*} list 基本art数组数据
 * return 年月划分的多维数组
 */
function getMonthList(list) {
  let monthList = []
  list.map(item => {
    let itemYear = new Date(item.createTime).getFullYear()
    let itemMonth = new Date(item.createTime).getMonth()
    if (!monthList.find((value) => {
        return value.year == itemYear
      })) {
      monthList.push({
        year: itemYear,
        months: [{
          month: itemMonth,
          data: [item]
        }]
      })
    } else {
      monthList.map(month => {
        if (month.year === itemYear) {
          if (!month.months.find((val => {
              return val.month == itemMonth
            }))) {
            month.months.push({
              month: itemMonth,
              data: [item]
            })
          } else {
            month.months.map(cli => {
              cli.data.push(item)
            })
          }
        }
      })
    }
  })
  return monthList;
}




