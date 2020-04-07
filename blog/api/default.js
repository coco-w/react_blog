import { baseUrl } from './config'
import axios from 'axios'

//详细页面
export const getArticleById = id => {
  return new Promise(resolve => {
    axios(`${baseUrl}/default/getArticleById/${id}`).then(res => {
      resolve(res.data)
    })
  })
}

//首页
export const getArticleList = params => {
  return new Promise(resolve => {
    axios(`${baseUrl}/default/getArticleList`, {
      params: {
        ...params
      }
    }).then(res => {
      resolve(res.data)
    })
  })
}

//header 导航
export const getArticleType = () => {
  return new Promise(resolve => {
    axios(`${baseUrl}/default/getArticleType`).then(res => {
      resolve(res.data)
    })
  })
}

//根据类型查文章
export const getArticleListById = id => {
  return new Promise(resolve => {
    axios(`${baseUrl}/default/getArticleListById/${id}`).then(res => {
      resolve(res.data)
    })
  })
}