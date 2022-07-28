<template>
  <div class="list-page">
    <Search class="list-page-search" @onSearch="onSearch" />
    <Table
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      @onClickRow="onClickRow"
    />
    <Pagination
      v-if="data.length > 0"
      class="list-page-pagination"
      :total="page.totalElements"
      @onChangePage="onChangePage"
    />
  </div>
</template>

<script>
import EventService from '@/services/EventService'
import Search from '@/components/Search.vue'
import Pagination from '@/components/Pagination.vue'
import Table from '@/components/Table.vue'
import dayjs from 'dayjs'

const service = new EventService()

export default {
  name: 'List',

  components: {
    Search,
    Pagination,
    Table
  },

  data() {
    return {
      data: [],
      page: {},
      pagination: {
        page: 1,
        size: 10
      },
      params: {},
      loading: false,
      columns: [
        {
          key: 'name',
          title: 'Name'
        },
        {
          key: 'priceRanges',
          title: 'Price',
          render: (value) => {
            return `Min: $${value?.[0].min || '-'} / Max: $${
              value?.[0]?.max || '-'
            }`
          }
        },
        {
          key: 'dates',
          title: 'Date',
          render: (value) => {
            return dayjs(value?.start?.dateTime).format('MM-DD-YYYY')
          }
        },
        {
          key: 'ticketLimit',
          title: 'Ticket Limit',
          render: (value) => {
            return value?.info || '-'
          }
        }
      ]
    }
  },

  methods: {
    async fetchList() {
      try {
        this.loading = true

        const { params, pagination } = this
        const { data } = await service.list({ ...params, ...pagination })

        this.page = data?.page
        this.data = data?._embedded?.events
      } catch (error) {
        console.error('List fetch error ->', error)
      } finally {
        this.loading = false
      }
    },

    onSearch(value) {
      this.params = {
        ...this.params,
        keyword: value
      }

      this.fetchList()
    },

    onChangePage(value) {
      this.pagination = value
      this.fetchList()
    },

    onClickRow(data) {
      this.$router.push(`/detail/${data.id}`)
    }
  },

  created() {
    this.fetchList()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/pages/list.scss';
</style>
