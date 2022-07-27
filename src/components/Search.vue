<template>
  <div class="search">
    <input v-model.trim="searchText" />
    <button class="search-button" @click="onClickSearchHandle">Search</button>
  </div>
</template>

<script>
export default {
  name: 'Filter',

  data() {
    return {
      searchText: ''
    }
  },

  methods: {
    onClickSearchHandle() {
      if (!!this.searchText.length) {
        this.$emit('onSearch', this.searchText)
      }
    }
  }
}
</script>
