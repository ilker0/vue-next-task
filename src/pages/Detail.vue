<template>
  <div class="detail-page">
    <div class="detail-page-loading" v-if="loading">
      <Spinner />
    </div>

    <div class="detail-page-content" v-else>
      <p class="detail-page-name">{{ formatData.name }}</p>

      <img class="detail-page-banner" :src="formatData.image" alt="" />

      <div class="detail-page-info">
        <div>
          <p class="detail-page-date">{{ formatData.date }}</p>
          <p class="detail-page-price">{{ formatData.price }}</p>
          <p class="detail-page-promoter">{{ formatData.promoter.name }}</p>
          <p class="detail-page-limit">
            Ticket Limit: {{ formatData.ticketLimit }}
          </p>
          <div class="detail-page-products">
            <div
              class="detail-page-product"
              v-for="product in formatData.products"
              :key="product.id"
            >
              {{ product.name }}

              <Button class="button-primary">Buy Now</Button>
            </div>
          </div>
        </div>

        <img :src="formatData.seatmap?.staticUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Button from '@/components/Button.vue'
import EventService from '@/services/EventService'
import dayjs from 'dayjs'

const service = new EventService()

export default {
  name: 'Detail',

  components: {
    Spinner,
    Button
  },

  data() {
    return {
      data: null,
      loading: false
    }
  },

  computed: {
    formatData() {
      return {
        code: this.data?.code || '-',
        date: dayjs(this.data?.dates.start.dateTime).format('MMMM DD YYYY'),
        name: this.data?.name || '-',
        price: `Min: $${this.data?.priceRanges?.[0].min || '-'} / Max: $${
          this.data?.priceRanges?.[0]?.max || '-'
        }`,
        image: this.data?.images.sort((a, b) =>
          a.height > b.height ? -1 : 1
        )?.[0].url,
        products: this.data?.products || [],
        promoter: this.data?.promoter || '-',
        ticketLimit: this.data?.ticketLimit?.info || '-',
        seatmap: this.data?.seatmap || '-'
      }
    }
  },

  methods: {
    async fetchDetail() {
      try {
        this.loading = true

        const { data } = await service.detail(this.$route.params.id)
        this.data = data
      } catch (error) {
        console.error('Detail fetch error ->', error)
      } finally {
        this.loading = false
      }
    }
  },

  created() {
    this.fetchDetail()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/detail.scss';
</style>
