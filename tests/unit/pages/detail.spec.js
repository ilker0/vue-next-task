import { mount } from '@vue/test-utils'
import Detail from '@/pages/Detail'
import { mockDetailData } from '../../mocks'
import * as axios from 'axios'

jest.mock('axios')
jest.useFakeTimers()

describe('Detail.vue', () => {
  let wrapper

  const mockRoute = {
    params: {
      id: 1
    }
  }

  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockDetailData))

    wrapper = await mount(Detail, {
      global: {
        provide: {
          eventService: {
            detail: jest.fn(() => {
              return axios.get('/detail')
            })
          }
        },
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    })
  })

  test('If data didnt load yet spinner must be show', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockDetailData))

    wrapper = mount(Detail, {
      global: {
        provide: {
          eventService: {
            detail: jest.fn(() => {
              return axios.get('/detail')
            })
          }
        }
      }
    })

    const loading = await wrapper.vm.loading
    expect(loading).toBe(true)
  })

  test('If data is loaded spinner must not be show', async () => {
    jest.advanceTimersByTime(5000)

    const loading = await wrapper.vm.loading
    expect(loading).toBe(false)
  })

  test('When data fetch if there is error message must show', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject())

    wrapper = await mount(Detail, {
      global: {
        provide: {
          eventService: {
            detail: jest.fn(() => {
              return axios.get('/detail')
            })
          }
        }
      }
    })

    jest.advanceTimersByTime(5000)

    const errorMessage = wrapper.find('[data-testid="something-wrong"]')
    expect(Object.keys(errorMessage).length).not.toBe(0)
  })
})
