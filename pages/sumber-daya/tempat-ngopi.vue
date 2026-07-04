<template>
	<div id="porto-page">
		<header-page>
			<template #title>Tempat Ngopi</template>
			<template #subtitle
				>Berikut daftar tempat ngopi yang aku rekomendasikan.</template
			>

      <p class="text-muted mt-3"><Icon name="solar:info-square-bold" /> Dan mohon maaf, saya tidak terafiliasi terhadap salah satu kafe / warkop ini, jadi apabila ada kesalahan mohon segera hubungi saya supaya segera saya perbaharui.</p>
		</header-page>

		<section class="need-space pt-0 position-relative">
			<div class="container">
        <div class="py-3 position-sticky bg-white border-bottom" :style="{ top: '4.5rem', zIndex: 1000 }">
          <div class="btn-group">
            <nuxt-link class="btn btn-primary">Rekomendasi</nuxt-link>
            <nuxt-link class="btn btn-outline-primary">Jakarta Selatan</nuxt-link>
            <nuxt-link class="btn btn-outline-primary">Klaten</nuxt-link>
            <nuxt-link class="btn btn-outline-primary">Kota Yogyakarta</nuxt-link>
            <nuxt-link class="btn btn-outline-primary">Kota Madiun</nuxt-link>
            <nuxt-link class="btn btn-outline-primary">Malang</nuxt-link>
            <nuxt-link class="btn btn-outline-primary">Kota Semarang</nuxt-link>
          </div>
        </div>
        
				<div class="row pt-5">
					<ClientOnly>
						<div class="col-md-6 text-center mx-auto" v-if="pending">
							<error-section
								img-src="/images/errors/loading.svg"
								img-alt="Tidak Ditemukan"
								img-height="250"
								title="Tunggu Sebentar"
								text="Sistem sedang memuat konten dari peladen"
							/>
						</div>
						<div class="col-md-6 text-center mx-auto" v-else-if="error">
							<error-section
								img-src="/images/errors/404.svg"
								img-alt="Tidak Ditemukan"
								img-height="250"
								title="Ups, Terjadi kesalahan"
								text="Saat ini kami sedang memperbaiki kesalahan ini"
							/>
						</div>
						<div
							class="col-md-6 text-center mx-auto"
							v-else-if="
								!pending && !error && (!coffeeShops?.data || coffeeShops.data.length === 0 || coffeeShops.code === 500)
							"
						>
							<error-section
								img-src="/images/errors/404.svg"
								img-alt="Tidak Ditemukan"
								img-height="250"
								title="Ups, Terjadi kesalahan"
								text="Saat ini kami sedang memperbaiki kesalahan ini"
							/>
						</div>
						<div class="col-md-12 mx-auto" v-else-if="!pending && !error && coffeeShops?.data?.length > 0">
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
									class="btn btn-primary btn-square"
									type="button"
									:disabled="!coffeeShops?.hasPrevPage"
									@click="previous"
								>
									<Icon name="fa6-solid:chevron-left" />
								</button>

								<span
									>Halaman {{ coffeeShops?.page }} dari
									{{ coffeeShops?.totalPage }}</span
								>

								<button
									class="btn btn-primary btn-square"
									type="button"
									:disabled="!coffeeShops?.hasNextPage"
									@click="next"
								>
									<Icon name="fa6-solid:chevron-right" />
								</button>
							</div>
						</div>

						<template #fallback>
							<div class="col-md-6 text-center mx-auto">
								<error-section
									img-src="/images/errors/loading.svg"
									img-alt="Tidak Ditemukan"
									img-height="250"
									title="Tunggu Sebentar"
									text="Sistem sedang memuat konten dari peladen"
								/>
							</div>
						</template>
					</ClientOnly>
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
  () => `Berikut daftar tempat ngopi yang saya rekomendasikan.`,
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