<script setup lang="ts">
import elkuslaSection from "~/components/partials/home/elkusla.vue";
import HeaderHome from "~/components/partials/home/header-home.vue";

const title = computed(() => "Beranda");
const description = computed(
	() => `Seorang Fullstack Web Developer yang berbasis di Kabupaten Ngawi yang suka sekali dengan desain dan juga hal yang berbau teknologi.`
);
const image = computed(() => "/images/meta-image.png");

useSeoMeta({
	title,
	ogTitle: title,
	ogImage: image,
	twitterImage: image,
	twitterCard: "summary_large_image",
	twitterTitle: title,
	description,
	ogDescription: description,
	twitterDescription: description,
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
