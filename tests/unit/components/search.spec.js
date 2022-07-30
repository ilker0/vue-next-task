import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('Search.vue', () => {
  let wrapper
  const mockCallback = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(Search, {
      attrs: {
        onSearch: mockCallback
      }
    })
  })

  test('Should call mock function when search button click', async () => {
    wrapper.find('[data-testid="search"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('onSearch')
  })

  test('Should call mock function when input enter', async () => {
    const input = wrapper.find('[data-testid="search-input"]')
    input.setValue('test')
    input.trigger('keyup', {
      key: 'enter'
    })

    expect(wrapper.emitted()).toHaveProperty('onSearch')
  })

  test('When input value change searchText must be equal input value', async () => {
    const input = wrapper.find('[data-testid="search-input"]')
    input.setValue('test')

    expect(wrapper.vm.searchText).toBe('test')
  })
})
