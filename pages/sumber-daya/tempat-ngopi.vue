<template>
	<div id="porto-page">
		<header-page>
			<template #title>Tempat Ngopi</template>
			<template #subtitle
				>Berikut daftar tempat ngopi yang aku rekomendasikan.</template
			>

      <p class="text-muted mt-3"><Icon name="solar:info-square-bold" /> Dan mohon maaf, saya tidak terafiliasi terhadap salah satu kafe / warkop ini, jadi apabila ada kesalahan mohon segera hubungi saya supaya segera saya perbaharui.</p>
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
							!pending && !error && coffeeShops && coffeeShops.data.length === 0
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
					<div class="col-md-12 mx-auto" v-else>
						<div class="row">
							<div
								class="col-md-6 col-lg-4 mb-4"
								v-for="(item, index) in coffeeShops.data"
								:key="index"
							>
								<card-coffee :data="item" />
							</div>
						</div>

						<div class="d-flex justify-content-center align-items-center gap-3">
							<button
								class="btn btn-primary"
								:disabled="!coffeeShops.hasPrevPage"
								@click="previous"
							>
								<Icon name="fa6-solid:chevron-left" />
							</button>

							<span
								>Halaman {{ coffeeShops.page }} dari
								{{ coffeeShops.totalPage }}</span
							>

							<button
								class="btn btn-primary"
								:disabled="!coffeeShops.hasNextPage"
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
const title = computed(() => `Daftar Tempat Ngopi`);
const description = computed(
	() => `Berikut daftar tempat ngopi yang saya rekomendasikan.`
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
	data: coffeeShops,
	pending,
	error,
	refresh,
} = await useFetch<any>(() => `/api/coffee-shops?page=${page.value}`, {
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