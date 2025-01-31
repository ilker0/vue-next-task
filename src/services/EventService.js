import Config from '@/config'
import BaseService from './BaseService'

class EventService extends BaseService {
  constructor() {
    super(`${Config.API_URL}`, `${Config.API_KEY}`)
  }

  async list(params) {
    try {
      const result = await super.get('/events', { params })
      return result
    } catch (error) {
      throw error
    }
  }

  async detail(id) {
    try {
      const result = await super.get(`/events/${id}`)
      return result
    } catch (error) {
      throw error
    }
  }
}

export default EventService
