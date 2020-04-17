import { baseUrl } from '../config/baseConfig.js'
import { message } from 'antd'
import { routerPush, getCookie } from '../lib/index'
import { useHistory  } from 'react-router-dom'
import axios from 'axios'
let baseURL = baseUrl

class HttpRequse {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.query = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
        token: getCookie('token'),
        user: getCookie('user'),
        user_id: getCookie('user_id')
      },
      // withCredentials: true,
    }
    return config
  }
  interceptors (instance) {
    instance.interceptors.request.use(config => {      
      return config
    }, err => {
      return Promise.reject(err)
    })
    instance.interceptors.response.use(res => {
      if (res.data.code == '401') {
        message.warning('没有登录,正在跳转')
        setTimeout(() => {
          window.location.replace('/login')
        }, 200)        
      }
      if (res.data.code === '400') {
        message.error(res.data.msg)      
        return Promise.reject()  
      }
      return res.data
    }, err => {
      return Promise.reject(err)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}
export default HttpRequse
