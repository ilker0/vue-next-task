<template>
  <table class="data-table">
    <thead class="data-table-thead">
      <tr>
        <th v-for="column in columns" :key="column.key">
          <div>
            <span> {{ column.title }}</span>
            <div v-if="sort && sort.key === column.key" class="table-sort">
              <DownIcon v-if="sort.type === 'ASC'" />
              <UpIcon v-else />
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="data-table-body">
      <tr v-for="(data, index) in formatData" :key="index" class="table-row">
        <td v-for="column in columns" :key="column.key">
          {{ getValue(column, data) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DownIcon from '@/components/icons/Down.vue'
import UpIcon from '@/components/icons/Up.vue'

export default {
  name: 'Table',

  components: {
    DownIcon,
    UpIcon
  },

  data() {
    return {
      sort: null
    }
  },

  props: {
    columns: {
      type: Array,
      default: [],
      required: true
    },

    dataSource: {
      type: Array,
      default: [],
      required: true
    }
  },

  computed: {
    formatData() {
      return this.dataSource
    }
  },

  methods: {
    getValue(column, data) {
      const { key, render } = column
      return render ? render(data[key], data) : data[key]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/table.scss';
</style>
