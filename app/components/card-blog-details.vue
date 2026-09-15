<template>
	<div>
		<nuxt-img
			v-if="data?.coverImage"
			preload
			:src="data.coverImage"
			class="w-100 rounded-4 border overflow-hidden"
			:alt="data?.title"
		/>

		<div
			class="pt-5 pb-4 flex-column border-bottom mb-5 align-items-start d-flex gap-3"
		>
			<div class="d-flex flex-wrap gap-2" v-if="data?.categories?.length">
				<span
					v-for="(category, index) in data.categories"
					:key="index"
					class="badge"
					:style="{ backgroundColor: category.color, color: getColorContrastText(category.color) }"
				>
					{{ category.name }}
				</span>
			</div>

			<h1 class="h3 mb-0">
				{{ data?.title ?? "Belum ditambahkan judul" }}
			</h1>

			<div class="d-flex align-items-center gap-2 opacity-75">
				<Icon name="fa6-solid:calendar" />
				<span v-if="data?.publishedAt">{{ formatDate(data.publishedAt) }}</span>
				<span v-else>Belum dipublikasikan</span>
			</div>

			<p class="opacity-75 mb-0">
				{{ data?.excerpt ?? "Belum ditambahkan deskripsi singkat" }}
			</p>
		</div>

		<div class="row flex-column-reverse flex-md-row gy-5">
			<div class="col-md-8">
				<div v-html="data?.content ?? `Belum ditambahkan konten`" />
			</div>
			<div class="col-md-4">
				<div class="card sticky-top rounded-4">
					<div class="card-header p-4">
						<h4 class="mb-0">Tag</h4>
					</div>
					<div class="card-body d-flex flex-wrap gap-2" v-if="data?.tags?.length">
						<span class="badge tag-badge" v-for="(tag, index) in data.tags" :key="index">
							{{ tag }}
						</span>
					</div>
					<div class="card-body opacity-75" v-else>
						Belum ada tag untuk artikel ini.
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
  data: any;
}>();
</script>

<script lang="ts">
export default defineComponent({
  name: 'CardBlogDetail'
});
</script>

<style scoped>
.tag-badge {
  border-radius: .5rem !important;
  background: rgba(var(--bs-body-color-rgb), .125);
  color: var(--bs-body-color);
  border: 1px solid rgba(var(--bs-body-color-rgb), .125);
  font-weight: 500;
}
</style>
