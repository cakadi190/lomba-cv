<template>
	<div id="project-detail">
		<header-page back-to="/portofolio">
			<template #title>Detail Proyek</template>
			<template #subtitle
				>Berikut saya tampilkan detail proyek yang saya kerjakan ini.</template
			>
		</header-page>

		<section class="need-space pt-0">
			<div class="container">
				<div class="row">
					<div class="col-md-6 text-center mx-auto" v-if="status == 'pending'">
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
						v-else-if="!status && !error && !data"
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
						<card-porto-details :data="data" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
const { params } = useRoute();

// Data Fetching from Server
const { data, error, status } = useFetch<any>(
	`/api/portofolios/${params.id}`,
	{
		method: "GET",
		transform: (a) => a?.data[0],
    server: true,
    lazy: false,
	}
);

// SEO META
const title = computed(() => status.value == 'pending' ? "Sedang memuat data" : data.value?.name ?? "Portofolio Tidak Ditemukan");
const description = computed(
	() => status.value == 'pending' ? "Sedang memuat data" : data.value?.shortDesc ?? "Portofolio Tidak Ditemukan"
);
const image = computed(() => data.value?.image ?? "/images/meta-image.png");
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

<style lang="scss">
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

		&:not(:last-child) {
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