import { shallowMount } from '@vue/test-utils'
import Detail from '@/pages/Detail'
import { EventService } from '../../mocks'

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

  beforeEach(() => {
    wrapper = shallowMount(Detail, {
      global: {
        provide: {
          eventService: new EventService()
        },
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    })
  })

  test('If data didnt load yet loading is true', () => {
    const loading = wrapper.vm.loading
    expect(loading).toBe(true)
  })
})
