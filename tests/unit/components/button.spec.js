import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button.vue', () => {
  test('Should call mock function when button click', async () => {
    const mockCallback = jest.fn()
    const wrapper = await shallowMount(Button, {
      attrs: {
        onClick: mockCallback
      }
    })

    wrapper.find('button').trigger('click')
    expect(mockCallback).toHaveBeenCalled()
  })
})
