<template>
  <nuxt-link :to="to" :class="linkClass" class="d-inline-flex">
    <!-- Icon Berwarna untuk Mode Terang -->
    <nuxt-img
      class="site-icon icon-light"
      src="/images/brands/icon-color.svg"
      format="svg"
      :height="elementHeight"
      :width="elementWidth"
      alt="Icon Cak Adi"
      :placeholder="[elementWidth, elementHeight]"
    />
    <!-- Icon Putih untuk Mode Gelap -->
    <nuxt-img
      class="site-icon icon-dark"
      src="/images/brands/icon-white.svg"
      format="svg"
      :height="elementHeight"
      :width="elementWidth"
      alt="Icon Cak Adi"
      :placeholder="[elementWidth, elementHeight]"
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

const elementWidth = computed(() => toPx(String(props.height)));

const elementHeight = computed(() => toPx(String(props.height)));
</script>

<style lang="scss" scoped>
// Secara default (mode terang), sembunyikan icon gelap
.icon-dark {
  display: none !important;
}

// Saat root HTML menggunakan tema gelap, sembunyikan icon terang dan tampilkan icon gelap secara instan
[data-bs-theme="dark"] {
  .icon-light {
    display: none !important;
  }
  .icon-dark {
    display: inline-block !important;
  }
}
</style>
