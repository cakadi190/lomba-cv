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
				class="rounded-3 nuxt-img-top"
				:alt="data.name"
				densities="x1 x2"
			/>

			<div class="card-body p-4">
				<div class="d-flex gap-2 mb-2 justify-content-between">
					<h5 class="card-title mb-0">{{ data.name }}</h5>
					<!-- Place Category Here -->
					<div v-if="data.categories.length">
						<span
							:style="{ backgroundColor: data.categories[0].category.color }"
							class="badge text-white"
						>
							{{ data.categories[0].category.name }}
						</span>
					</div>
				</div>
        <div>{{ data.shortDesc.length }}</div>
				<div class="card-text mb-3 opacity-75">
					{{ data.shortDesc.substring(0, 150) }}
          <span v-if="data.shortDesc.length > 150">
            &hellip;
          </span>
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
import { defineComponent } from "vue";

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