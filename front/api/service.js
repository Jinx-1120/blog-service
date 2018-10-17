import ajax from './axios'

export function getArtList (params) {
  return ajax.get('articleList', { params }).then(res => res.data)
}

export function getTagList() {
  return ajax.get('tagList').then(res => res.data)
}

export function getArt(params) {
  return ajax.get(`article/${params.id}`).then(res => res.data)
}


