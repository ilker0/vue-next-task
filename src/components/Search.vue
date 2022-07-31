<template>
  <div class="search">
    <input
      data-testid="search-input"
      placeholder="Keyword"
      class="input"
      v-model.trim="searchText"
      v-on:keyup.enter="onClickSearchHandle"
    />
    <Button
      data-testid="search"
      class="button-primary"
      @click="onClickSearchHandle"
    >
      Search <SearchIcon class="search-icon" />
    </Button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import SearchIcon from '@/components/icons/Search.vue'

export default {
  name: 'Filter',

  emits: ['onSearch'],

  components: {
    Button,
    SearchIcon
  },

  data() {
    return {
      searchText: ''
    }
  },

  methods: {
    onClickSearchHandle() {
      this.$emit('onSearch', this.searchText)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/input.scss';
@import '@/assets/styles/components/search.scss';
</style>
