<template>
  <table class="data-table">
    <thead class="data-table-thead">
      <tr>
        <th
          v-for="column in columns"
          :key="column.key"
          @click="onClickColumnHandle(column)"
          data-testid="column"
        >
          <div class="data-table-column">
            <span> {{ column.title }}</span>
            <div
              v-if="sort && sort.column.key === column.key"
              class="table-sort"
            >
              <DownIcon
                data-testid="down-icon"
                width="14px"
                height="14px"
                v-if="sort.type === 'ASC'"
              />
              <UpIcon data-testid="up-icon" width="14px" height="14px" v-else />
            </div>
          </div>
        </th>
      </tr>
    </thead>

    <tbody class="data-table-body">
      <tr v-if="loading">
        <div class="data-table-loading">
          <Spinner data-testid="loading" />
        </div>
      </tr>

      <p
        v-else-if="!loading && !formatData.length"
        class="data-table-notfound"
        data-testid="not-found"
      >
        Data not found
      </p>

      <tr
        v-else
        v-for="(data, index) in formatData"
        :key="index"
        class="table-row"
        @click="onClickRowHandle(data)"
        data-testid="row"
      >
        <td v-for="column in columns" :key="column.key">
          {{ getValue(column, data) }}
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination
    v-if="dataSource.length > 0"
    :total="dataSource.length"
    @onChangePage="onChangePage"
  />
</template>

<script>
import DownIcon from '@/components/icons/Down.vue'
import UpIcon from '@/components/icons/Up.vue'
import Spinner from '@/components/Spinner.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Table',

  emits: ['onClickRow'],

  components: {
    DownIcon,
    UpIcon,
    Spinner,
    Pagination
  },

  data() {
    return {
      sort: null,
      size: 10,
      page: 1
    }
  },

  props: {
    columns: {
      type: Array,
      default: [],
      required: true
    },

    dataSource: {
      type: Array,
      default: [],
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    formatData() {
      let copyData = [...this.dataSource]
      const { size, page } = this

      if (this.sort) {
        const { column, type } = this.sort

        copyData = copyData.sort((a, b) => {
          const aValue = this.getValue(column, a)
          const bValue = this.getValue(column, b)

          return type === 'ASC'
            ? aValue.toUpperCase().localeCompare(bValue)
            : bValue.toUpperCase().localeCompare(aValue)
        })
      }

      return copyData.slice((page - 1) * size, page * size)
    }
  },

  methods: {
    getValue(column, data) {
      const { key } = column
      return column?.render ? column?.render(data[key], data) : data[key]
    },

    onClickColumnHandle(column) {
      if (this.sort && this.sort?.type === 'DESC') {
        this.sort = null
        return
      }

      this.sort = {
        column,
        type: this.sort && this.sort?.type === 'ASC' ? 'DESC' : 'ASC'
      }
    },

    onClickRowHandle(data) {
      this.$emit('onClickRow', data)
    },

    onChangePage(value) {
      const { size, page } = value

      this.size = size
      this.page = page
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/table.scss';
</style>
