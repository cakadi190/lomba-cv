<script lang="ts" setup>
import {
	initialSlideFromBottomToTop,
	enterSlideFromBottomToTop,
} from "./motion";

defineProps<{
	data: any;
}>();
</script>

<template>
	<div class="wrapper">
		<nuxt-link
			:to="`/portofolio/${data.slug}`"
			class="card h-100 overflow-hidden rounded-4"
		>
			<nuxt-img
				:src="data.image"
				class="rounded-3 card-img-top"
				:alt="data.name"
				densities="x1 x2"
			/>

			<div class="card-body p-4">
				<div class="d-flex gap-2 mb-2 justify-content-between">
					<h5 class="card-title mb-0">{{ data.name }}</h5>
					<div v-if="data.categories.length">
						<span
							:style="{ backgroundColor: data.categories[0].category.color, color: getColorContrastText(data.categories[0].category.color) }"
							class="badge"
						>
							{{ data.categories[0].category.name }}
						</span>
					</div>
				</div>
				<div class="card-text mb-3 opacity-75">
					{{ limitWords(data.shortDesc, 25) }}
				</div>

				<div class="d-flex gap-2 pt-2">
					<Icon
						:name="item"
						size="24"
						v-for="(item, index) in JSON.parse(data.techstack || [])"
						:key="index"
					/>
				</div>
			</div>
		</nuxt-link>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: "CardPorto",
});
</script>

<style lang="scss" scoped>
.card {
	text-decoration: none;
	transition: all 0.2s ease-in-out;

	&:hover {
		transform: scale(1.025);
		border-color: var(--bs-primary);
	}
}
</style>