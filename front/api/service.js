import ajax from './axios'

export function getArtList () {
  return ajax.get('articleList').then(res => res.data)
}


