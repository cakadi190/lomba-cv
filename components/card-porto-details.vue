<template>
	<div>
		<nuxt-img 
      preload
			:src="data?.image"
			class="w-100 rounded-4 border overflow-hidden"
			alt="Cak Adi Website"
		/>

		<div
			class="pt-5 pb-4 flex-column flex-lg-row border-bottom mb-5 align-items-start align-items-lg-center d-flex justify-content-between gap-3"
		>
			<div>
				<h1 class="h3">
					{{ data?.name ?? "Belum ditambahkan judul" }}
				</h1>
				<p class="opacity-75 mb-0">
					{{ data?.shortDesc ?? "Belum ditambahkan deskripsi singkat" }}
				</p>
			</div>
			<div class="d-flex flex-shrink-0 gap-3">
				<a
					v-if="!data.private && data.sourceCode"
					:href="data.sourceCode"
					target="_blank"
					class="d-flex gap-2 align-items-center btn btn-outline-primary"
				>
					<Icon name="fa6-brands:github" />
					<span>Source Code</span>
				</a>
				<a
          v-if="data.demoLink"
					:href="data.demoLink"
					target="_blank"
					class="d-flex gap-2 align-items-center btn btn-primary"
				>
					<Icon name="fa6-solid:link" />
					<span>Live Demo</span>
				</a>
			</div>
		</div>

		<div class="row flex-column-reverse flex-md-row gy-5">
			<div class="col-md-8">
				<div class="mb-5">
					<h3 id="description">Deskripsi Proyek</h3>
					<div v-html="data?.desc ?? `Belum ditambahkan deskripsi`" />
				</div>

				<div class="mb-5">
					<h3 id="techstack">Dibangun Dengan</h3>

					<div class="d-flex gap-3 align-items-center">
						<Icon
							v-for="(item, index) in JSON.parse(data?.techstack)"
							:key="index"
							:name="item"
							size="32"
						/>
					</div>
				</div>

				<div class="mb-5" id="gallery">
					<h3>Galeri dan Pratinjau Proyek</h3>

					<div class="alert bg-info-subtle d-flex gap-3">
						<Icon
							name="mdi:information-variant-circle"
							class="flex-shrink-0"
							size="32"
						/>
						<span
							>Mohon bersabar ya, karena fitur ini masih saya kembangkan untuk
							temen-temen yang <em>mau ngeliat</em> pratinjau proyek
							ini.</span
						>
					</div>
				</div>

				<div id="rating">
					<h3>Penilaian Proyek Ini</h3>

					<div class="alert bg-info-subtle mb-0 d-flex gap-3">
						<Icon
							name="mdi:information-variant-circle"
							class="flex-shrink-0"
							size="32"
						/>
						<span
							>Mohon bersabar ya, karena fitur ini masih saya kembangkan untuk
							temen-temen yang <em>mau ngasih</em> penilaian di proyek
							ini.</span
						>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card sticky-top rounded-4">
					<div class="card-header p-4">
						<h4 class="mb-0">Navigasi</h4>
					</div>
					<div class="card-body">
						<ul
							class="nav nav-pills flex-column align-items-stretch"
							id="myTab"
							role="tablist"
						>
							<li class="nav-item" role="presentation">
								<a href="#description" class="nav-link py-3 w-100 text-start">
									Deskripsi Proyek
								</a>
							</li>
							<li class="nav-item" role="presentation">
								<a href="#techstack" class="nav-link py-3 w-100 text-start">
									Dibangun Dengan
								</a>
							</li>
							<li class="nav-item" role="presentation">
								<a href="#gallery" class="nav-link py-3 w-100 text-start">
									Galeri
								</a>
							</li>
							<li class="nav-item" role="presentation">
								<a href="#rating" class="nav-link py-3 w-100 text-start">
									Penilaian
								</a>
							</li>
						</ul>
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
  name: 'CardPortoDetail'
});
</script>


<style>
</style>