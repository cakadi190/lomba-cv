<template>
	<div id="porto-page">
		<header-page>
			<template #title>Portofolio</template>
			<template #subtitle
				>Daftar semua proyek dan portofolio saya yang sudah diselesaikan maupun
				belum.</template
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
						v-else-if="
							!pending && !error && portofolios && portofolios.data.length === 0
						"
					>
						<error-section
							imgSrc="/images/errors/404.svg"
							imgAlt="Tidak Ditemukan"
							imgHeight="250"
							title="Ups, Terjadi kesalahan"
							text="Saat ini kami sedang memperbaiki kesalahan ini"
						/>
					</div>
					<div
						class="col-md-12 mx-auto"
						v-else-if="!pending && !error && portofolios?.data?.length > 0"
					>
						<div class="row">
							<div
								class="col-md-6 col-lg-4 mb-4"
								v-for="(item, index) in portofolios.data"
								:key="index"
							>
								<card-porto :data="item" />
							</div>
						</div>

						<div class="d-flex justify-content-center align-items-center gap-3">
							<button
								class="btn btn-primary"
								:disabled="!portofolios.hasPrevPage"
								@click="previous"
							>
								<Icon name="fa6-solid:chevron-left" />
							</button>

							<span
								>Halaman {{ portofolios.page }} dari
								{{ portofolios.totalPage }}</span
							>

							<button
								class="btn btn-primary"
								:disabled="!portofolios.hasNextPage"
								@click="next"
							>
								<Icon name="fa6-solid:chevron-right" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
const urlRequest = useRequestURL();
const route = useRoute();

const page = computed({
	get() {
		return Number(route.query.page?.toString()) || 1;
	},
	set(newPage: number) {
		navigateTo({
			query: {
				page: newPage,
			},
		});
	},
});

// SEO META
const title = computed(() => `Daftar Portofolio`);
const description = computed(
	() =>
		`Berikut daftar portofolio yang sudah saya kerjakan dan selesaikan akhir-akhir ini.`
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
	ogUrl: urlRequest.href,
});

// Fetch Data
const {
	data: portofolios,
	pending,
	error,
	refresh,
} = await useFetch<any>(() => `/api/portofolios?page=${page.value}`, {
	method: "GET",
	lazy: true,
	server: false,
});

const next = () => {
	page.value++;
	refresh();
  scrollToTop();
};
const previous = () => {
	page.value--;
	refresh();
  scrollToTop();
};
</script>

<style>
</style>