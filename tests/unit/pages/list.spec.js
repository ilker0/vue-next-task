import { shallowMount } from '@vue/test-utils'
import List from '@/pages/List'
import { EventService } from '../../mocks'

describe('List.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(List, {
      global: {
        provide: {
          eventService: new EventService()
        }
      }
    })
  })

  test('If data didnt load yet loading is true', async () => {
    const loading = wrapper.vm.loading
    expect(loading).toBe(true)
  })
})
