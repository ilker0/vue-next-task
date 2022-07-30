<template>
  <div class="list-page">
    <Search class="list-page-search" @onSearch="onSearch" />
    <Table
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      @onClickRow="onClickRow"
    />
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import Table from '@/components/Table.vue'
import dayjs from 'dayjs'

export default {
  name: 'List',

  inject: ['eventService'],

  components: {
    Search,
    Table
  },

  data() {
    return {
      data: [],
      pagination: {
        size: 200
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
            return value?.info
              ? `${
                  value?.info.length > 50
                    ? value?.info.slice(0, 50) + '...'
                    : value?.info
                }`
              : '-'
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
        const { data } = await this.eventService.list({
          ...params,
          ...pagination
        })

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
@import '@/assets/styles/pages/list.scss';
</style>
