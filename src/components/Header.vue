<template>
  <div class="header">
    <router-link to="/">
      <Logo />
    </router-link>
  </div>
</template>

<script>
import Logo from '@/components/icons/Logo.vue'

export default {
  name: 'Header',

  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/header.scss';
</style>
