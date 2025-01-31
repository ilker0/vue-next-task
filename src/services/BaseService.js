import axios from 'axios'

class BaseService {
  constructor(baseURL, apiKey) {
    this.http = axios.create({
      baseURL,
      params: {
        apikey: apiKey
      }
    })
  }

  async get(url, data) {
    return this.http.get(url, data)
  }

  async post(url, data, config) {
    return this.http.post(url, data, config)
  }

  async put(url, data, config) {
    return this.http.put(url, data, config)
  }

  async delete(url, config) {
    return this.http.delete(url, config)
  }
}

export default BaseService
