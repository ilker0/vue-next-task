<template>
  <div class="pagination">
    <button>Prev</button>

    <button
      class="page"
      v-for="item in pages"
      :key="item"
      :class="{
        active: page === item
      }"
      @click="onChangePageHandle"
    >
      {{ item }}
    </button>

    <button>Next</button>

    <select v-model="size" @change="onChangePageHandle">
      <option>10</option>
      <option>20</option>
      <option>30</option>
      <option>40</option>
      <option>50</option>
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
      default: 0
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
