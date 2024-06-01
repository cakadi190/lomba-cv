<template>
	<div id="project-detail">
		<header-page>
			<template #title>Detail Proyek</template>
			<template #subtitle
				>Berikut saya tampilkan detail proyek yang saya kerjakan ini.</template
			>
		</header-page>

		<section class="need-space pt-0">
			<div class="container">
				<div class="row">
					<div class="col-md-6 text-center mx-auto" v-if="pending">
						<error-section
							imgSrc="/images/errors/loading.svg"
							imgAlt="Tidak Ditemukan"
							imgHeight="250"
							title="Tunggu Sebentar"
							text="Sistem sedang memuat konten dari peladen"
						/>
					</div>
					<div class="col-md-6 text-center mx-auto" v-else-if="error">
						<error-section
							imgSrc="/images/errors/404.svg"
							imgAlt="Tidak Ditemukan"
							imgHeight="250"
							title="Ups, Terjadi kesalahan"
							text="Saat ini kami sedang memperbaiki kesalahan ini"
						/>
					</div>
					<div
						class="col-md-6 text-center mx-auto"
						v-else-if="data.data.length === 0"
					>
						<error-section
							imgSrc="/images/errors/404.svg"
							imgAlt="Tidak Ditemukan"
							imgHeight="250"
							title="Ups, Terjadi kesalahan"
							text="Saat ini kami sedang memperbaiki kesalahan ini"
						/>
					</div>
					<div class="col-md-12" v-else>
						<img
							:src="data.data[0]?.image"
							class="w-100 rounded-4"
							alt="Cak Adi Website"
						/>

						<div
							class="pt-5 pb-4 flex-column flex-lg-row border-bottom mb-5 align-items-start align-items-lg-center d-flex justify-content-between gap-3"
						>
							<div>
								<h1 class="h3">
									{{ data.data[0]?.name ?? "Belum ditambahkan judul" }}
								</h1>
								<p class="opacity-75 mb-0">
									{{
										data.data[0]?.shortDesc ??
										"Belum ditambahkan deskripsi singkat"
									}}
								</p>
							</div>
							<div class="d-flex flex-shrink-0 gap-3">
								<a
                  v-if="!data.data[0].private"
									:href="data.data[0].sourceCode"
									target="_blank"
									class="d-flex gap-2 align-items-center btn btn-outline-primary"
								>
									<Icon name="fa6-brands:github" />
									<span>Source Code</span>
								</a>
								<a
									:href="data.data[0].demoLink"
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
									<div
										v-html="data.data[0]?.desc ?? `Belum ditambahkan deskripsi`"
									/>
								</div>

								<div class="mb-5">
									<h3 id="techstack">Dibangun Dengan</h3>

									<div class="d-flex gap-3 align-items-center">
										<Icon
											v-for="(item, index) in JSON.parse(
												data.data[0]?.techstack
											)"
											:key="index"
											:name="item"
											size="32"
										/>
									</div>
								</div>

                <div class="mb-5" id="rating">
                  <h3>Penilaian Proyek Ini</h3>

                  <div class="alert bg-info-subtle d-flex gap-2">
                    <Icon name="mdi:information-variant-circle" size="32" />
                    <span>Mohon bersabar ya, karena fitur ini masih saya kembangkan untuk temen-temen yang mau ngasih penilaian di proyek ini.</span>
                  </div>
                </div>
							</div>
							<div class="col-md-4">
								<div class="card sticky-top rounded-4">
									<div class="card-header p-4">
										<h4 class="mb-0">Navigasi</h4>
									</div>
									<div class="card-body">
										<!-- Tab panes Title -->
										<ul
											class="nav nav-pills flex-column align-items-stretch"
											id="myTab"
											role="tablist"
										>
											<li class="nav-item" role="presentation">
												<a
													href="#description"
													class="nav-link py-3 w-100 text-start"
												>
													Deskripsi Proyek
												</a>
											</li>
											<li class="nav-item" role="presentation">
												<a
													href="#techstack"
													class="nav-link py-3 w-100 text-start"
												>
													Dibangun Dengan
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

// Data
const { data, error, pending, refresh, execute } = useAsyncData<any>(
	"portofolio",
	() =>
		$fetch(`/api/portofolios/${route.params.id}`, {
			method: "GET",
			lazy: false,
		})
);

// SEO META
const title = computed(() => data.value.data[0].name ?? '404');
const description = computed(
	() =>
		`Seorang Fullstack Web Developer yang berbasis di Kabupaten Ngawi yang suka sekali dengan desain dan juga hal yang berbau teknologi.`
);
const image = computed(() => "/images/meta-image.png");
const urlRequest = useRequestURL();

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
	ogUrl: urlRequest.href,
});
</script>

<style scoped lang="scss">
.nav-pills {
	.nav-item {
		.nav-link {
			color: var(--bs-body-color);
			opacity: 0.75;

			&.active {
				background-color: transparent;
				box-shadow: none;
				opacity: 1;
			}
		}

		&:first-child {
			border-bottom: 1px solid var(--bs-card-border-color);
		}
	}
}

.card {
	&.sticky-top {
		position: sticky;
		top: 7.5rem;
		z-index: 1020;
	}
}
</style>