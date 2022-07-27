<template>
  <div>
    <div>asdasdads</div>
  </div>
</template>

<script>
import EventService from '@/services/EventService'

const service = new EventService()

export default {
  data() {
    return {
      loading: false
    }
  },

  methods: {
    async fetchList() {
      try {
        this.loading = true

        const result = await service.list()
      } catch {
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
