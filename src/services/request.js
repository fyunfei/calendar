import axios from 'axios'
import qs from 'qs'
import config from './config'

const Axios = axios.create(config)

// POST 传参序列化
Axios.interceptors.request.use(
  (config) => {
    if (config.method === 'post') config.data = qs.stringify(config.data)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 返回结果处理
Axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
  },
  (error) => {
    //此处进行异常处理
    return Promise.reject(error)
  }
)

export default Axios
