import axios from './index'

export const userLogin = params => {
  return axios.request({
    url: '/admin/login',
    method: 'post',
    data: {
      ...params
    }
  })
}

export const testToken = params => {
  return axios.request({
    url: '/admin/test',
    method: 'post',    
  })
}