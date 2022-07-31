import { mount, shallowMount } from '@vue/test-utils'
import List from '@/pages/List'
import Search from '@/components/Search.vue'
import * as axios from 'axios'
import { mockEventData } from '../../mocks'

jest.mock('axios')
jest.useFakeTimers()

describe('List.vue', () => {
  let wrapper

  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockEventData))

    wrapper = await mount(List, {
      global: {
        provide: {
          eventService: {
            list: jest.fn(() => {
              return axios.get('/list')
            })
          }
        },
        mocks: {
          $router: mockRouter
        }
      }
    })
  })

  test('If data didnt load yet spinner must be show', async () => {
    wrapper = mount(List, {
      global: {
        provide: {
          eventService: {
            list: jest.fn(() => {
              return axios.get('/list')
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

    wrapper = await mount(List, {
      global: {
        provide: {
          eventService: {
            list: jest.fn(() => {
              return axios.get('/list')
            })
          }
        }
      }
    })

    jest.advanceTimersByTime(5000)

    const errorMessage = wrapper.find('[data-testid="something-wrong"]')
    expect(Object.keys(errorMessage).length).not.toBe(0)
  })

  test('If there is not events not found message must show', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          _embedded: {
            events: []
          }
        }
      })
    )

    wrapper = await mount(List, {
      global: {
        provide: {
          eventService: {
            list: jest.fn(() => {
              return axios.get('/list')
            })
          }
        }
      }
    })

    jest.advanceTimersByTime(5000)

    const botFound = wrapper.find('[data-testid="not-found"]')
    expect(Object.keys(botFound).length).not.toBe(0)
  })

  test('Table columns length must be 4', async () => {
    const columns = await wrapper.findAll('[data-testid="column"]')
    expect(columns.length).toBe(4)
  })

  test('Should emit function when input enter', async () => {
    const wrapper = await shallowMount(Search)
    const input = wrapper.find('[data-testid="search-input"]')

    input.setValue('test')
    input.trigger('keyup', {
      key: 'enter'
    })

    expect(wrapper.emitted('onSearch')[0]).toEqual(['test'])
    expect(wrapper.emitted()).toHaveProperty('onSearch')
  })

  test('If there is searchText data must be filtered', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockEventData))

    wrapper = await mount(List, {
      global: {
        provide: {
          eventService: {
            list: jest.fn(() => {
              return axios.get('/list')
            })
          }
        }
      }
    })

    const searchWrapper = await shallowMount(Search)
    const input = searchWrapper.find('[data-testid="search-input"]')
    const button = searchWrapper.find('[data-testid="search"]')

    input.setValue('name')
    button.trigger('click')

    const filteredData = mockEventData.data._embedded.events.filter(
      (object) => {
        return object.name.includes('name')
      }
    )

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          _embedded: {
            events: mockEventData.data._embedded.events.filter((object) => {
              return object.name.includes('name')
            })
          }
        }
      })
    )

    wrapper = await mount(List, {
      global: {
        provide: {
          eventService: {
            list: jest.fn(() => {
              return axios.get('/list')
            })
          }
        }
      }
    })

    expect(wrapper.vm.data).toEqual(filteredData)
  })

  test('When row click redirect detail page', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockEventData))

    const row = wrapper.find('[data-testid="row"]')
    row.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
  })
})
