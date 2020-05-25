import axios from './index'

export const getAD = params => {
  return axios.request({
    url: '/admin/getAD',
    method: 'get'
  })
}

export const updateAD = data => {
  return axios.request({
    url: '/ad/updateAD',
    method: 'post',
    data: {
      ...data
    }
  })
}
