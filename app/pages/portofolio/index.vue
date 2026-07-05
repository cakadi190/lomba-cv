<template>
  <div id="porto-page">
    <header-page>
      <template #title>Portofolio</template>
      <template #subtitle>Daftar semua proyek dan portofolio saya yang sudah diselesaikan maupun
        belum.</template>
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
              <error-section img-src="/images/errors/404.svg" img-alt="Tidak Ditemukan" img-height="250"
                title="Ups, Terjadi kesalahan" text="Saat ini kami sedang memperbaiki kesalahan ini" />
            </div>
            <div class="col-md-6 text-center mx-auto" v-else-if="
              !pending && !error && (!portofolios?.data || portofolios.data.length === 0 || portofolios.code === 500)
            ">
              <error-section img-src="/images/errors/404.svg" img-alt="Tidak Ditemukan" img-height="250"
                title="Ups, Terjadi kesalahan" text="Saat ini kami sedang memperbaiki kesalahan ini" />
            </div>
            <div class="col-md-12 mx-auto" v-else-if="!pending && !error && portofolios?.data?.length > 0">
              <div class="row">
                <div class="col-md-6 col-lg-4 mb-4" v-for="(item, index) in portofolios.data" :key="index">
                  <card-porto :data="item" />
                </div>
              </div>

              <div class="d-flex justify-content-center align-items-center gap-3">
                <button class="btn btn-square btn-primary" type="button" :disabled="!portofolios?.hasPrevPage"
                  @click="previous">
                  <Icon name="fa6-solid:chevron-left" />
                </button>

                <span>Halaman {{ portofolios?.page }} dari
                  {{ portofolios?.totalPage }}</span>

                <button class="btn btn-square btn-primary" type="button" :disabled="!portofolios?.hasNextPage"
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
import { route as router } from "~~/lib/route";

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
  title: "Daftar Portofolio",
  description:
    "Berikut daftar portofolio yang sudah saya kerjakan dan selesaikan akhir-akhir ini.",
});

// Fetch Data
const {
  data: portofolios,
  pending,
  error,
  refresh,
} = await useFetch<any>(() => router("api.portfolios.index", { page: page.value }), {
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

<style></style>