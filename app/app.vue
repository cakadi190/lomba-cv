<template>
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
import { nextTick } from "vue";
import { url } from "~~/lib/url";

useHead({
  htmlAttrs: {
    lang: "id",
  },
  titleTemplate: (titleChunk: any) => {
    return titleChunk ? `${titleChunk} • Mas Adi` : "Mas Adi";
  },
  link: [
    {
      rel: "apple-touch-icon-precomposed" as any,
      sizes: "57x57",
      href: url("apple-touch-icon-57x57.png"),
    },
    {
      rel: "apple-touch-icon-precomposed" as any,
      sizes: "114x114",
      href: url("apple-touch-icon-114x114.png"),
    },
    {
      rel: "apple-touch-icon-precomposed" as any,
      sizes: "72x72",
      href: url("apple-touch-icon-72x72.png"),
    },
    {
      rel: "apple-touch-icon-precomposed" as any,
      sizes: "144x144",
      href: url("apple-touch-icon-144x144.png"),
    },
    {
      rel: "apple-touch-icon-precomposed" as any,
      sizes: "60x60",
      href: url("apple-touch-icon-60x60.png"),
    },
    {
      rel: "apple-touch-icon-precomposed" as any,
      sizes: "120x120",
      href: url("apple-touch-icon-120x120.png"),
    },
    {
      rel: "apple-touch-icon-precomposed" as any,
      sizes: "76x76",
      href: url("apple-touch-icon-76x76.png"),
    },
    {
      rel: "apple-touch-icon-precomposed" as any,
      sizes: "152x152",
      href: url("apple-touch-icon-152x152.png"),
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "196x196",
      href: url("favicon-196x196.png"),
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: url("favicon-96x96.png"),
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: url("favicon-32x32.png"),
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: url("favicon-16x16.png"),
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "128x128",
      href: url("favicon-128.png"),
    },
  ],
  meta: [
    {
      name: "author",
      content: "Adi Candra",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
    {
      name: "application-name",
      content: "Catatan Mas Adi",
    },
    {
      name: "msapplication-TileColor",
      content: "#FFFFFF",
    },
    {
      name: "msapplication-TileImage",
      content: url("mstile-144x144.png"),
    },
    {
      name: "msapplication-square70x70logo",
      content: url("mstile-70x70.png"),
    },
    {
      name: "msapplication-square150x150logo",
      content: url("mstile-150x150.png"),
    },
    {
      name: "msapplication-wide310x150logo",
      content: url("mstile-310x150.png"),
    },
    {
      name: "msapplication-square310x310logo",
      content: url("mstile-310x310.png"),
    },
  ],
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
