<template>
  <div id="articles-page">
    <header-page>
      <template #title>Artikel</template>
      <template #subtitle>Berikut daftar artikel yang saya tulis.</template>
    </header-page>

    <section class="need-space pt-0">
      <div class="container">
        <div class="row">
          <ClientOnly>
            <div class="col-md-6 text-center mx-auto" v-if="pending">
              <error-section img-src="/images/errors/loading.svg" img-alt="Tidak Ditemukan" img-height="250"
                title="Tunggu Sebentar" text="Sistem sedang memuat konten dari peladen" />
            </div>
            <div class="col-md-6 text-center mx-auto" v-else-if="error">
              <error-section :img-src="apiError.imgSrc" img-alt="Tidak Ditemukan" img-height="250"
                :title="apiError.title" :text="apiError.text" />
            </div>
            <div class="col-md-6 text-center mx-auto" v-else-if="
              !pending && !error && (!posts?.data || posts.data.length === 0)
            ">
              <error-section img-src="/images/errors/404.svg" img-alt="Tidak Ditemukan" img-height="250"
                title="Belum Ada Artikel" text="Belum ada artikel yang tersedia saat ini" />
            </div>
            <div class="col-md-12 mx-auto" v-else-if="!pending && !error && posts?.data?.length > 0">
              <div class="row">
                <div class="col-md-6 col-lg-4 mb-4" v-for="(item, index) in posts.data" :key="index">
                  <card-blog :data="item" />
                </div>
              </div>

              <div class="d-flex justify-content-center align-items-center gap-3">
                <button class="btn btn-square btn-primary" type="button" :disabled="!posts?.hasPrevPage"
                  @click="previous">
                  <Icon name="fa6-solid:chevron-left" />
                </button>

                <span>Halaman {{ posts?.page }} dari
                  {{ posts?.totalPage }}</span>

                <button class="btn btn-square btn-primary" type="button" :disabled="!posts?.hasNextPage"
                  @click="next">
                  <Icon name="fa6-solid:chevron-right" />
                </button>
              </div>
            </div>

            <template #fallback>
              <div class="col-md-6 text-center mx-auto">
                <error-section img-src="/images/errors/loading.svg" img-alt="Tidak Ditemukan" img-height="250"
                  title="Tunggu Sebentar" text="Sistem sedang memuat konten dari peladen" />
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { usePageSeo } from "~~/lib/seo";

const currentRoute = useRoute();

const page = computed({
  get() {
    return Number(currentRoute.query.page?.toString()) || 1;
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
usePageSeo({
  title: "Artikel",
  description:
    "Kumpulan artikel Cak Adi tentang pengembangan web, teknologi, desain, dan pengalaman membangun produk digital.",
  keyword: ["artikel teknologi", "pengembangan web", "desain web", "Cak Adi"],
  schemaType: "CollectionPage",
});

// Fetch Data
const {
  data: posts,
  pending,
  error,
  refresh,
} = await usePostsList(page);

const apiError = computed(() => useApiErrorMessage(error.value?.statusCode));

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

<style></style>
