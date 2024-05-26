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
</style>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk: any) => {
    return titleChunk ? `${titleChunk} • Cak Adi` : 'Cak Adi';
  },
  meta: [
    { name: 'og:image', key: 'og:image', content: '/images/va-ogImg.png' },
  ]
});

const colorMode = useColorMode();
const theme = ref('light');

const applyTheme = (themes: string) => {
  document.documentElement.setAttribute('data-bs-theme', themes);
  theme.value = themes;
};

const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  applyTheme(e.matches ? 'dark' : 'light');
};

onMounted(() => {
  const mediamode = localStorage.getItem('mediamode');
  const colorModePreference = colorMode.preference;

  if (colorModePreference === 'system') {
    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (mediamode === 'dark' || mediamode === 'light') {
      applyTheme(mediamode);
    } else {
      applyTheme(systemThemeQuery.matches ? 'dark' : 'light');
      systemThemeQuery.addEventListener('change', handleSystemThemeChange);
    }

    return () => {
      systemThemeQuery.removeEventListener('change', handleSystemThemeChange);
    };
  } else {
    applyTheme(colorModePreference);
  }
});

const initTooltipAndPopover = () => {
	var tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]')
	);
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new window.bootstrap.Tooltip(tooltipTriggerEl);
	});

	var popoverTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="popover"]')
	);
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new window.bootstrap.Popover(popoverTriggerEl);
	});
};

onMounted(initTooltipAndPopover);
onUpdated(initTooltipAndPopover);

const route = useRoute();

watch(
  () => route.fullPath, 
  () => {
    initTooltipAndPopover();
  }
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
