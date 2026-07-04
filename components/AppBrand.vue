<template>
  <nuxt-link :to="to" :class="linkClass">
    <nuxt-img
      class="site-logo"
      :src="logoSrc"
      :height="height"
      alt="Logo Mas Adi"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";

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

const colorMode = useColorMode();

const logoSrc = computed(() => {
  return `/images/brands/logo-${colorMode.value === "dark" ? "white" : "color"}.svg`;
});
</script>
