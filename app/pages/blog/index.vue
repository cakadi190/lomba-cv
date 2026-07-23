<template>
  <div id="articles-page">
		<header-page>
			<template #title>Artikel</template>
			<template #subtitle
				>Berikut daftar artikel yang saya tulis.</template
			>
		</header-page>
  </div>
</template>

<script lang="ts" setup>
import { usePageSeo } from "~~/lib/seo";

usePageSeo({
  title: "Artikel",
  description:
    "Kumpulan artikel Mas Adi tentang pengembangan web, teknologi, desain, dan pengalaman membangun produk digital.",
  keyword: ["artikel teknologi", "pengembangan web", "desain web", "Mas Adi"],
  schemaType: "CollectionPage",
});
</script>
