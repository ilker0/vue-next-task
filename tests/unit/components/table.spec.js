import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'
import { mockTabledata as dataSource } from '../../mocks'

const columns = [
  {
    key: 'personCode',
    title: 'Person Code'
  },

  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'surname',
    title: 'Surname'
  },
  {
    key: 'department',
    title: 'Department'
  },
  {
    key: 'salary',
    title: 'Salary'
  },
  {
    key: 'level',
    title: 'Level',
    render: (value) => {
      if (value === 0) {
        return 'Junior'
      }

      if (value === 1) {
        return 'Middle'
      }

      if (value === 2) {
        return 'Senior'
      }
    }
  }
]

describe('Table.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Table, {
      attrs: {
        columns,
        dataSource
      }
    })
  })

  test('If loading attr is true document must show spinner in table', async () => {
    await wrapper.setProps({ loading: true })
    const loading = wrapper.find('[data-testid="loading"]')

    expect(Object.keys(loading).length).not.toBe(0)
  })

  test("If loading is false and data source's length is 0 document must show data not found text in table", async () => {
    await wrapper.setProps({ loading: false, dataSource: [] })
    const notFound = wrapper.find('[data-testid="not-found"]')

    expect(Object.keys(notFound).length).not.toBe(0)
  })

  test('When click column sort is null sort must be ASC', async () => {
    const column = wrapper.find('[data-testid="column"]')
    await column.trigger('click')

    expect(wrapper.vm.sort.type).toBe('ASC')
  })

  test('When double click column sort is ASC sort must be DESC', async () => {
    const column = wrapper.find('[data-testid="column"]')
    wrapper.setData({
      sort: {
        type: 'ASC'
      }
    })
    await column.trigger('click')

    expect(wrapper.vm.sort.type).toBe('DESC')
  })

  test('When click column sort is DESC sort must be null', async () => {
    const column = wrapper.find('[data-testid="column"]')
    wrapper.setData({
      sort: {
        type: 'DESC'
      }
    })
    await column.trigger('click')

    expect(wrapper.vm.sort).toBe(null)
  })

  test('Should call mock function when row click', async () => {
    const row = wrapper.find('[data-testid="row"]')
    row.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onClickRow')
  })
})
