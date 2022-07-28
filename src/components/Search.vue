<template>
  <div class="search">
    <input v-model.trim="searchText" />
    <Button @click="onClickSearchHandle">Search</Button>
  </div>
</template>

<script>
import Button from './Button.vue'

export default {
  name: 'Filter',

  components: {
    Button
  },

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
