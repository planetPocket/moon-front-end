import axios from 'axios'
// import router from '../router'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// axios 配置
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.headers[ 'Content-Type'] ='application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.baseURL = ;
// http request 拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.token = getToken()
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    return response
    // @todo 制定code规则
    if (res.code !== 1000 && res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 3001 || res.code === 3000 || res.code === 3002) {
      // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
