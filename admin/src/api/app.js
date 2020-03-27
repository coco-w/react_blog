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

export const getTypeInfo = () => {
  return axios.request({
    url: '/admin/getTypeInfo',
    method: 'get',    
  })
}

export const addArticle = data => {
  return axios.request({
    url: '/admin/addArticle',
    method: 'post',    
    data: {
      ...data
    }
  })
}