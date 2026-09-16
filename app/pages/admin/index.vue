<template>
  <div class="admin-wrapper">
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: "auth"
})

useSeoMeta({
  title: "Dasbor Admin"
})
</script>