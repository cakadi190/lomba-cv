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
				<div class="row gy-4" v-if="!pending && !error">
					<div
						v-for="(item, index) in data?.data"
						:key="index"
						class="col-md-4"
					>
						<card-porto :data="item" />
					</div>

					<div class="col-md-12">
						<div class="d-flex justify-content-center gap-3">
							<button
								class="btn btn-primary"
								@click="previous()"
								v-if="currentPage > 1"
							>
								Kembali
							</button>
							<button
								class="btn btn-primary"
								@click="next()"
								v-if="data.hasNextPage"
							>
								Lanjut
							</button>
						</div>
					</div>
				</div>
				<div class="row gy-4" v-else-if="pending">
					<div class="col-md-6 text-center mx-auto">
						<nuxt-img
							src="/images/errors/loading.svg"
							alt="Tidak Ditemukan"
							height="250"
						/>
						<p class="text-center">Sedang dimuat</p>
					</div>
				</div>
				<div class="row gy-4" v-else-if="error">
					<div class="col-md-6 text-center mx-auto">
						<nuxt-img
							src="/images/errors/500.svg"
							alt="Tidak Ditemukan"
							height="250"
						/>
						<p class="text-center">Woops, Ada kesalahan di sisi peladen. Coba muat ulang halamannya.</p>
					</div>
				</div>
				<div class="row gy-4" v-else>
					<div class="col-md-6 mx-auto">
						<nuxt-img
							src="/images/errors/404.svg"
							alt="Tidak Ditemukan"
							height="250"
						/>
						<p class="text-center">Belum ada proyek yang dapat ditampilkan</p>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import headerPage from "~/components/header-page.vue";
import cardPorto from "~/components/card-porto.vue";
import {
	htmlCssJS,
	jqueryBootstrap,
	kotlinJava,
	laravelFullstackNonSPABootstrap,
	nuxt,
	php,
} from "~/components/techstack";

const route = useRoute();
const currentPage = ref(1);

// SEO META
const title = computed(() => `Daftar Portofolio`);
const description = computed(
	() =>
		`Berikut daftar portofolio yang sudah saya kerjakan dan selesaikan akhir-akhir ini.`
);
const image = computed(() => "/images/meta-image.png");
const url = ref("");

onMounted(() => {
	const baseUrl = `${window.location.protocol}//${window.location.host}`;
	url.value = `${baseUrl}${route.fullPath}`;
});

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
	ogUrl: url,
});

const { data, error, pending } = await useAsyncData<any>(
	"portofolio",
	() =>
		$fetch(`/api/portofolios`, {
			method: "GET",
			params: {
				page: currentPage.value,
			},
		}),
	{
		watch: [currentPage],
	}
);

const previous = () => {
	if (currentPage.value != 1) {
		currentPage.value = currentPage.value - 1;
	}
};

const next = () => {
	if (currentPage.value + 1) {
		currentPage.value = currentPage.value + 1;
	}
};
</script>

<style>
</style>