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
				<div class="row gy-4" v-if="!pending && !error && data.data.length > 0">
					<div
						v-for="(item, index) in data?.data"
						:key="index"
						class="col-md-4"
					>
						<card-porto :data="item" />
					</div>

					<div class="col-md-12">
						<div class="d-flex justify-content-center gap-3">
							<nuxt-link
								:to="
									currentPage == 2
										? `/portofolio`
										: `/portofolio?page=${currentPage - 1}`
								"
								class="btn btn-primary"
								:class="{ disabled: !data?.hasPrevPage }"
							>
								<Icon name="fa6-solid:chevron-left" />
							</nuxt-link>
							<nuxt-link
								:to="`/portofolio?page=${currentPage + 1}`"
								class="btn btn-primary"
								:class="{ disabled: !data?.hasNextPage }"
							>
								<Icon name="fa6-solid:chevron-right" />
							</nuxt-link>
						</div>
					</div>
				</div>
				<div class="row gy-4" v-else>
					<nuxt-img
						src="/images/errors/404.svg"
						alt="Tidak Ditemukan"
						height="250"
					/>
					<p class="text-center">Belum ada proyek yang dapat ditampilkan</p>
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
const currentPage = ref(parseInt(route.query.page as string) || 1);

// SEO META
const title = computed(() => `Daftar Portofolio${currentPage.value > 1 ? ` - Halaman ${currentPage.value}` : ''}`);
const description = computed(
  () => `Berikut daftar portofolio yang sudah saya kerjakan dan selesaikan akhir-akhir ini.`
);
const image = computed(() => "/images/meta-image.png");

const url = ref('');

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
  ogUrl: url, // Gunakan URL dinamis
});

interface PortfolioItem {
	id: string;
	name: string;
	slug: string;
	image: string;
	techstack: any;
	desc: string;
	created_at: Date;
	updated_at: Date;
}

const { data, pending, error, refresh } = await useAsyncData<any>(() => $fetch(`/api/portofolios?page=${currentPage.value || 1}`));

watch(
	() => route.fullPath,
	() => {
		currentPage.value = parseInt(route.query.page as string) || 1;
		refresh();
	}
);
</script>

<style>
</style>