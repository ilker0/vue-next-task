<template>
  <button v-bind="$attrs" class="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/components/button.scss';
</style>
