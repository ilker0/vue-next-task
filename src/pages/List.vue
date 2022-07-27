<template>
  <search @onSearch="onSearch" />
  <table />
  <pagination :total="page.totalElements" @onChangePage="onChangePage" />
</template>

<script>
import EventService from '@/services/EventService'
import Search from '@/components/Search.vue'
import Pagination from '@/components/Pagination.vue'
import Table from '@/components/Table.vue'

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
      params: {},
      loading: false,
      columns: []
    }
  },

  methods: {
    async fetchList() {
      try {
        this.loading = true
        const { data } = await service.list({ ...this.params, ...this.page })

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
      console.log(value)
    }
  },

  created() {
    this.fetchList()
  }
}
</script>
