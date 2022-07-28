<template>
  <div class="search">
    <input placeholder="Keyword" class="input" v-model.trim="searchText" />
    <Button class="button-primary" @click="onClickSearchHandle">
      Search <SearchIcon class="search-icon" />
    </Button>
  </div>
</template>

<script>
import Button from './Button.vue'
import SearchIcon from './icons/Search.vue'

export default {
  name: 'Filter',

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
      if (!!this.searchText.length) {
        this.$emit('onSearch', this.searchText)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/input.scss';
@import '../assets/styles/components/search.scss';
</style>
