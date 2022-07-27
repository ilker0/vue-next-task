<template>
  <div class="pagination">
    <button @click="onClickPrevHandle" :disabled="page === 1">Prev</button>

    <button
      class="page"
      v-for="item in pages"
      :key="item"
      :class="{
        active: page === item
      }"
      @click="onClickPageHandle(item)"
      v-show="!(item > page + 4 || item < page) && item < pages"
    >
      {{ item }}
    </button>

    <button @click="onClickNextHandle" :disabled="page === pages">Next</button>

    <select v-model="size" @change="onChangeSizeHandle">
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="30">30</option>
      <option :value="40">40</option>
      <option :value="50">50</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

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
      return Math.ceil(this.total / this.size)
    }
  },

  methods: {
    onChangeSizeHandle() {
      const { page, size } = this
      this.$emit('onChangePage', { page, size: +size })
    },

    onClickPageHandle(item) {
      this.page = item
      const { page, size } = this

      this.$emit('onChangePage', { page, size: +size })
    },

    onClickNextHandle() {
      this.page = this.page + 1
      const { page, size } = this

      this.$emit('onChangePage', { page, size: +size })
    },

    onClickPrevHandle() {
      this.page = this.page - 1
      const { page, size } = this

      this.$emit('onChangePage', { page, size: +size })
    }
  }
}
</script>
