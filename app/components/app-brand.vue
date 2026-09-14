<template>
  <nuxt-link :to="to" :class="linkClass" class="d-inline-flex">
    <!-- Logo Berwarna untuk Mode Terang -->
    <!-- SVG dilayani langsung (bukan lewat nuxt-img/_ipx): vector tidak
         butuh resize raster, dan menghindari ipx yang salah set
         Content-Type untuk SVG di bawah runtime Bun. -->
    <img
      class="site-logo logo-light"
      src="/images/brands/logo-color.svg"
      :height="elementHeight"
      :width="elementWidth"
      alt="Logo Mas Adi"
    />
    <!-- Logo Putih untuk Mode Gelap -->
    <img
      class="site-logo logo-dark"
      src="/images/brands/logo-white.svg"
      :height="elementHeight"
      :width="elementWidth"
      alt="Logo Mas Adi"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
import { toPx } from '~~/lib/number';

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

const elementWidth = computed(() => {
  return Math.round((300 / 65) * toPx(String(props.height)));
});

const elementHeight = computed(() => toPx(String(props.height)));
</script>

<style lang="scss" scoped>
// Secara default (mode terang), sembunyikan logo gelap
.logo-dark {
  display: none !important;
}

// Saat root HTML menggunakan tema gelap, sembunyikan logo terang dan tampilkan logo gelap secara instan
[data-bs-theme="dark"] {
  .logo-light {
    display: none !important;
  }
  .logo-dark {
    display: inline-block !important;
  }
}
</style>
