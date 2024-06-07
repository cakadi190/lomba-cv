<template>
	<div class="text-center">
		<nuxt-img preload class="mb-4" :src="imgSrc" :alt="imgAlt" :height="imgHeight" />
		<h3>{{ title }}</h3>
		<p class="text-muted">{{ text }}</p>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: "ErrorSection",
	props: {
		imgSrc: {
			type: String,
			required: true,
		},
		imgAlt: {
			type: String,
			required: true,
		},
		imgHeight: {
			type: [String, Number] as PropType<string | number>,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
	},
});
</script>