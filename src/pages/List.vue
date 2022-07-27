<template>
  <Filter />
</template>

<script>
import EventService from '@/services/EventService'
import Filter from '@/components/Filter.vue'

const service = new EventService()

export default {
  name: 'List',

  components: {
    Filter
  },

  data() {
    return {
      data: [],
      page: {},
      loading: false,
      columns: []
    }
  },

  methods: {
    async fetchList(params) {
      try {
        this.loading = true
        const { data } = await service.list({ ...params })

        this.page = data?.page
        this.data = data?._embedded?.events
      } catch (error) {
        console.error('List fetch error ->', error)
      } finally {
        this.loading = false
      }
    }
  },

  created() {
    this.fetchList()
  }
}
</script>
