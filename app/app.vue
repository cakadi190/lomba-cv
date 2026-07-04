<template>
	<nuxt-loading-indicator />

	<nuxt-layout>
		<nuxt-page />
	</nuxt-layout>
</template>

<style lang="scss">
.need-space {
  min-height: 7.5rem;
  padding: 7rem 0;
}

body {
  overflow-x: hidden;
}
</style>

<script lang="ts" setup>
import { computed, nextTick } from "vue";

const colorMode = useColorMode();

useHead({
  titleTemplate: (titleChunk: any) => {
    return titleChunk ? `${titleChunk} • Mas Adi` : "Mas Adi";
  },
  htmlAttrs: {
    "data-bs-theme": computed(() => colorMode.value),
  },
});

const initTooltipAndPopover = () => {
  if (typeof window === "undefined" || !window.bootstrap) {
    return;
  }

  // Clean up any stale tooltips from the DOM to avoid orphaned elements
  const orphanedTooltips = document.querySelectorAll(".tooltip");
  for (const el of Array.from(orphanedTooltips)) {
    el.remove();
  }

  const tooltipTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="tooltip"]'),
  );
  for (const el of tooltipTriggerList) {
    const existing = window.bootstrap.Tooltip.getInstance(el);
    if (existing) {
      existing.dispose();
    }
    new window.bootstrap.Tooltip(el);
  }

  const popoverTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="popover"]'),
  );
  for (const el of popoverTriggerList) {
    const existing = window.bootstrap.Popover.getInstance(el);
    if (existing) {
      existing.dispose();
    }
    new window.bootstrap.Popover(el);
  }
};

onMounted(initTooltipAndPopover);

const route = useRoute();

watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    initTooltipAndPopover();
  },
);
</script>

<style lang="scss" scoped>
.bg-body {
  background-color: var(--bs-body-bg) !important;
}
.bg-body-rgb {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity, 1)) !important;
}
.color-body {
  background-color: var(--bs-color-bg) !important;
}
.color-body-rgb {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-color-bg-rgb), var(--bs-color-opacity, 1)) !important;
}
</style>
