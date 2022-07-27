<template>
  <div class="pagination">
    <button @click="page = page - 1" :disabled="page === 2">Prev</button>

    <button
      class="page"
      v-for="item in pages"
      :key="item"
      :class="{
        active: page === item
      }"
      @click="onChangePageHandle"
      v-show="!(item > page + 1 || item < page - 1) && item < pages"
    >
      {{ item }}
    </button>

    <button @click="page = page + 2" :disabled="page === pages">Next</button>

    <select v-model="size" @change="onChangePageHandle">
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
      page: 2
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
    onChangePageHandle() {
      const { page, size } = this
      this.$emit('onChangePage', { page, size })
    }
  }
}
</script>
