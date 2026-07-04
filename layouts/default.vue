<template>
  <div id="base-layout">
    <navbar-main />
    <slot />
    <footer-main />
    <back-to-top />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
#base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
