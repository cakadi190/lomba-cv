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
					<div class="col-md-12 mx-auto" v-else-if="!pending && !error && data.data.length > 0">
            <div class="row">
              <div
                class="col-md-6 col-lg-4 mb-4"
                v-for="(item, index) in data.data"
                :key="index"
              >
                <card-porto :data="item" />
              </div>
            </div>

						<div class="d-flex justify-content-center align-items-center gap-3">
							<button
								class="btn btn-primary"
								:disabled="!data.hasPrevPage"
								@click="previous"
							>
								<Icon name="fa6-solid:chevron-left" />
							</button>

              <span>Halaman {{ data.page }} dari {{ data.totalPage }}</span>

							<button
								class="btn btn-primary"
								:disabled="!data.hasNextPage"
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
import headerPage from "~/components/header-page.vue";
import cardPorto from "~/components/card-porto.vue";
import errorSection from "~/components/error-section.vue";

const urlRequest = useRequestURL();
const route = useRoute();
const router = useRouter();
const currentPage = ref(1);

const setPage = (page: number) => {
	router.push({ query: { ...route.query, page: page.toString() } });
};

const updatePageFromQuery = () => {
	const page = parseInt(route.query.page as string, 10);
	currentPage.value = !isNaN(page) && page > 0 ? page : 1;
};

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
updatePageFromQuery();

const { data, error, pending, refresh, execute } = await useAsyncData<any>(
	"portofolio",
	() =>
		$fetch(`/api/portofolios`, {
			method: "GET",
			query: {
				page: currentPage.value,
			},
      lazy: true,
		}),
	{
		watch: [currentPage],
	}
);

// For Pagination
const previous = (): void => {
	if (currentPage.value != 1) {
		scrollToTop();
		currentPage.value = currentPage.value - 1;
	}
	setPage(currentPage.value);
};

const next = (): void => {
	if (currentPage.value + 1) {
		scrollToTop();
		currentPage.value = currentPage.value + 1;
	}
	setPage(currentPage.value);
};
</script>

<style>
</style>