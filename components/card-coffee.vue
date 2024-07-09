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
		<a
			href="javascript:void(0)"
			data-bs-toggle="modal"
			:data-bs-target="`#${data.id}`"
			class="card h-100 overflow-hidden rounded-4"
		>
			<nuxt-img
				preload
				:src="data.image ?? '/images/coffee-default.webp'"
				class="rounded-3 card-img-top"
				:alt="data.name"
				densities="x1 x2"
			/>

			<div class="card-body p-4">
				<div class="d-flex gap-2 mb-2 justify-content-between">
					<h5 class="card-title mb-0">{{ data.name }}</h5>
					<div>
						<span
							:style="{
								backgroundColor: 'rgba(var(--bs-body-color-rgb), .125)',
							}"
              v-if="data.recomended"
							class="badge rounded-pill"
						>
							Direkomendasikan
						</span>
					</div>
				</div>

				<p class="card-text mb-0 text-muted">
					{{ truncate(data.description, 100) }}
				</p>
			</div>
		</a>
	</div>

	<teleport to="body">
		<div
			class="modal fade"
			:id="data.id"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">{{ data.name }}</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<nuxt-img
							preload
							:src="data.image ?? '/images/coffee-default.webp'"
							class="rounded-3 w-100 border"
							:alt="data.name"
							densities="x1 x2"
						/>

            <div class="row mt-2 g-3">
              <div class="col-md-6">
                <div class="card card-body">
                  <p class="text-muted mb-2">Nama Kafe / Warkop</p>
                  <h5 class="mb-0">{{ data.name }}</h5>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card card-body">
                  <p class="text-muted mb-2">Wilayah</p>
                  <h5 class="mb-0">{{ data.region }}</h5>
                </div>
              </div>
              <div class="col-md-12">
                <div class="card card-body">
                  <p class="text-muted mb-2">Alamat</p>
                  <h5 class="mb-0">{{ data.address }}.&nbsp;&nbsp;<a :href="data.map_url" target="_blank" rel="noopener noreferrer">Arahkan Saya <Icon name="humbleicons:external-link" /></a></h5>
                </div>
              </div>
            </div>
					</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script lang="ts">
export default defineComponent({
	name: "CardCoffee",
});
</script>

<style lang="scss" scoped>
.wrapper > .card {
	text-decoration: none;
	transition: all 0.2s ease-in-out;

	&:hover {
		transform: scale(1.025);
		border-color: var(--bs-primary);
	}
}
</style>