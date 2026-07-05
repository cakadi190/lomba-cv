<script setup lang="ts">
import elkuslaSection from "~/components/partials/home/elkusla.vue";
import HeaderHome from "~/components/partials/home/header-home.vue";
import { usePageSeo } from "~~/lib/seo";

// SEO META
usePageSeo({
  title: "Beranda",
  description:
    "Seorang Fullstack Web Developer yang berbasis di Kabupaten Ngawi yang suka sekali dengan desain dan juga hal yang berbau teknologi.",
});
</script>

<template>
  <div id="homepage">
    <header-home />
    <elkusla-section />
  </div>
</template>

<style lang="scss" scoped>
</style>
