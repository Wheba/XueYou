import axios from 'axios'
import { Toast } from 'mint-ui';

//创建axios实例
const service = axios.create({
  baseURL: 'http://www.jiyou-tech.com/2020/522/source/front/', // url = base url + request url
  withCredentials: false, // 跨域请求时发送cookies
  timeout: 5000 // request timeout
})

//请求拦截
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
//响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
		
    if (res.code !== 200) {
			Toast(res.msg)
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
