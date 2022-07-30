<template>
  <div class="pagination">
    <Button data-testid="double-prev" @click="page = 1" :disabled="page === 1">
      <DoubleLeftIcon />
    </Button>

    <Button data-testid="prev" @click="page = page - 1" :disabled="page === 1">
      <LeftIcon />
    </Button>

    <Button
      data-testid="page"
      class="page"
      v-for="item in pages"
      :key="item"
      :class="{
        'button-outline': page === item
      }"
      @click="page = item"
    >
      {{ item }}
    </Button>

    <Button
      data-testid="next"
      @click="page = page + 1"
      :disabled="page + 1 > pageLength"
    >
      <RightIcon />
    </Button>

    <Button
      data-testid="double-next"
      @click="page = pageLength"
      :disabled="page + 1 > pageLength"
    >
      <DoubleRightIcon />
    </Button>

    <select
      data-testid="page-size"
      class="select"
      v-model="size"
      @change="page = 1"
    >
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="30">30</option>
      <option :value="40">40</option>
      <option :value="50">50</option>
    </select>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import LeftIcon from '@/components/icons/Left.vue'
import RightIcon from '@/components/icons/Right.vue'
import DoubleRightIcon from '@/components/icons/DoubleRight.vue'
import DoubleLeftIcon from '@/components/icons/DoubleLeft.vue'

export default {
  name: 'Pagination',

  components: {
    Button,
    LeftIcon,
    RightIcon,
    DoubleRightIcon,
    DoubleLeftIcon
  },

  data() {
    return {
      size: 10,
      page: 1
    }
  },

  props: {
    total: {
      type: Number,
      default: 0,
      required: true
    }
  },

  computed: {
    pages() {
      let pages = []

      for (let i = 1; i <= this.pageLength; i++) {
        pages.push(i)
      }

      let start = this.page - 1

      if (this.pageLength < 5) {
        start = 1
      }

      if (this.page + 5 > this.pageLength) {
        start = this.page - (this.page % 5 === 0 ? 5 : this.page % 5)
      }

      return pages.slice(start, start + 5)
    },

    pageLength() {
      return Math.ceil(this.total / this.size)
    }
  },

  watch: {
    page() {
      const { page, size } = this
      this.$emit('onChangePage', { page, size: +size })
    },

    size() {
      const { page, size } = this
      this.$emit('onChangePage', { page, size: +size })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/pagination.scss';
@import '@/assets/styles/components/select.scss';
</style>
