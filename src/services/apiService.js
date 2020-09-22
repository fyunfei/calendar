import Axios from './request'

export class ApiService {
  constructor(url) {
    this.baseUrl = url
  }

  //获取列表数据
  get(query) {
    return Axios({
      url: this.baseUrl,
      method: 'get',
      params: query
    })
  }

  //新增数据
  post(data) {
    return Axios({
      url: this.baseUrl,
      method: 'post',
      data
    })
  }
}
