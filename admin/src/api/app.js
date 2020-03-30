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

export const getArticleList = data => {
  return axios.request({
    url: '/admin/getArticleList',
    method: 'get',    
    params: {
      ...data
    }
  })
}

export const getArticleDetail = data => {
  return axios.request({
    url: '/admin/getArticleDetail',
    method: 'get',    
    params: {
      ...data
    }
  })
}

export const deleteArticle = data => {
  return axios.request({
    url: '/admin/deleteArticle',
    method: 'delete',    
    data: {
      ...data
    }
  })
}


export const updateArticle = data => {
  return axios.request({
    url: '/admin/updateArticle',
    method: 'post',    
    data: {
      ...data
    }
  })
}