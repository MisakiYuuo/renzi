import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import store from '../store/index.js'
import router from '../router/index.js'

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  config.headers['Authorization'] = `Bearer ${getToken()}`
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const { data, success, message } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    throw new Error(message)
  }
}, function(error) {
  // 解决401token过期问题
  if (store.state.user.token && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default service
