<template>
  <div id="base-layout">
    <navbar-main />
    <slot />
    <footer-main />
    <back-to-top />
  </div>
</template>

<script lang="ts" setup>
import backToTop from '~/components/back-to-top.vue';
import navbarMain from './partial/navbar.vue';
import footerMain from './partial/footer.vue';
</script>

<style lang="scss" scoped>
#base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
