<template>
  <nuxt-link :to="to" :class="linkClass" class="d-inline-flex">
    <!-- Logo Berwarna untuk Mode Terang -->
    <nuxt-img
      class="site-logo logo-light"
      src="/images/brands/logo-color.svg"
      :height="height"
      alt="Logo Mas Adi"
    />
    <!-- Logo Putih untuk Mode Gelap -->
    <nuxt-img
      class="site-logo logo-dark"
      src="/images/brands/logo-white.svg"
      :height="height"
      alt="Logo Mas Adi"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
  to?: string;
  linkClass?: string;
  height?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  to: "/",
  linkClass: "",
  height: 32,
});
</script>

<style lang="scss" scoped>
// Secara default (mode terang), sembunyikan logo gelap
.logo-dark {
  display: none !important;
}

// Saat root HTML menggunakan tema gelap, sembunyikan logo terang dan tampilkan logo gelap secara instan
:global([data-bs-theme="dark"]) {
  .logo-light {
    display: none !important;
  }
  .logo-dark {
    display: inline-block !important;
  }
}
</style>
