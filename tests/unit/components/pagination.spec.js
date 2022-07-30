import { shallowMount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'

describe('Pagination.vue', () => {
  let wrapper

  const mockCallback = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(Pagination, {
      attrs: {
        total: 200,
        onChangePage: mockCallback
      }
    })
  })

  test('If page is 1 prev & double prev buttons must be disable', async () => {
    await wrapper.setData({ page: 1 })

    const prevButton = wrapper.find('[data-testid="prev"]')
    const doublePrevButton = wrapper.find('[data-testid="double-prev"]')

    expect(prevButton.attributes().disabled).toBe('true')
    expect(doublePrevButton.attributes().disabled).toBe('true')
  })

  test('If page is not 1 prev & double prev buttons must not be disable', async () => {
    await wrapper.setData({ page: 10 })

    const prevButton = wrapper.find('[data-testid="prev"]')
    const doublePrevButton = wrapper.find('[data-testid="double-prev"]')

    expect(prevButton.attributes().disabled).toBe('false')
    expect(doublePrevButton.attributes().disabled).toBe('false')
  })

  test('If page is larger page length next & double next buttons must be disable', async () => {
    await wrapper.setData({ page: 100 })

    const nextButton = wrapper.find('[data-testid="next"]')
    const doubleNextButton = wrapper.find('[data-testid="double-next"]')

    expect(nextButton.attributes().disabled).toBe('true')
    expect(doubleNextButton.attributes().disabled).toBe('true')
  })

  test('If page is not larger page length next & double next buttons must not be disable', async () => {
    await wrapper.setData({ page: 10 })

    const prevButton = wrapper.find('[data-testid="prev"]')
    const doublePrevButton = wrapper.find('[data-testid="double-prev"]')

    expect(prevButton.attributes().disabled).toBe('false')
    expect(doublePrevButton.attributes().disabled).toBe('false')
  })

  test('Should call mock function when page change button click', async () => {
    await wrapper.setData({ page: 5 })

    wrapper.find('[data-testid="prev"]').trigger('click')
    wrapper.find('[data-testid="double-prev"]').trigger('click')
    wrapper.find('[data-testid="next"]').trigger('click')
    wrapper.find('[data-testid="double-next"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onChangePage')
  })

  test('When click next button page one increases', async () => {
    await wrapper.setData({ page: 1 })
    wrapper.find('[data-testid="next"]').trigger('click')

    expect(wrapper.vm.page).toBe(2)
  })

  test('When click prev button page one decreases', async () => {
    await wrapper.setData({ page: 5 })
    wrapper.find('[data-testid="prev"]').trigger('click')

    expect(wrapper.vm.page).toBe(4)
  })

  test('When click double next button page becomes equal page length', async () => {
    await wrapper.setData({ page: 5 })
    wrapper.find('[data-testid="double-next"]').trigger('click')

    expect(wrapper.vm.page).toBe(wrapper.vm.pageLength)
  })

  test('When click double prev button page becomes 1', async () => {
    await wrapper.setData({ page: 5 })
    wrapper.find('[data-testid="double-prev"]').trigger('click')

    expect(wrapper.vm.page).toBe(1)
  })
})
