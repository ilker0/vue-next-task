<template>
  <div class="detail-page">
    <div class="detail-page-loading" v-if="loading">
      <Spinner />
    </div>

    <div class="detail-page-content" v-else>
      <img class="detail-page-banner" :src="formatData.image" alt="" />

      <p class="detail-page-date">{{ formatData.date }}</p>
      <p class="detail-page-name">{{ formatData.name }}</p>
      <p class="detail-page-price">{{ formatData.price }}</p>
      <p class="detail-page-promoter">{{ formatData.promoter.name }}</p>
      <p class="detail-page-limit">
        Ticket Limit: {{ formatData.ticketLimit?.info || '-' }}
      </p>
      <div class="detail-page-products">
        <div
          class="detail-page-product"
          v-for="product in formatData.products"
          :key="product.id"
        >
          {{ product.name }}

          <Button class="button-primary">Buy</Button>
        </div>
      </div>

      <img :src="formatData.seatmap?.staticUrl" alt="" />
      <!-- <p class="detail-page-code">Code: {{ formatData.code }}</p> -->
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
      const {
        code,
        dates,
        name,
        priceRanges,
        images,
        products,
        promoter,
        ticketLimit,
        seatmap
      } = this.data
      return {
        code,
        date: dayjs(dates.start.dateTime).format('MMMM DD YYYY'),
        name,
        price: `Min: $${priceRanges?.[0].min || '-'} / Max: $${
          priceRanges?.[0]?.max || '-'
        }`,
        image: images.sort((a, b) => (a.height > b.height ? -1 : 1))?.[0].url,
        products,
        promoter,
        ticketLimit,
        seatmap
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
