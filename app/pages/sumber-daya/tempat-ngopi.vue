<template>
  <div id="porto-page">
    <header-page>
      <template #title>Tempat Ngopi</template>
      <template #subtitle>Berikut daftar tempat ngopi yang aku rekomendasikan.</template>

      <p class="text-muted mt-3">
        <Icon name="solar:info-square-bold" /> Dan mohon maaf, saya tidak terafiliasi terhadap salah satu kafe / warkop
        ini,
        jadi apabila ada kesalahan mohon segera hubungi saya supaya segera saya perbaharui.
      </p>
    </header-page>

    <section class="need-space pt-0 position-relative">
      <div class="container">
        <div class="metadata">
          <div class="dropdown d-inline-block">
            <button :class="filterPlace ? 'btn-primary' : 'btn-outline-primary'" class="btn dropdown-toggle"
              type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ filterPlace ?? "Pilih Kota" }}
            </button>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" type="button" @click="selectCity(null)">
                  Semua Kota
                </button>
              </li>
              <li v-for="region in regions?.data" :key="region">
                <button class="dropdown-item" :class="{ active: filterPlace === region }" type="button"
                  @click="selectCity(region)">
                  {{ region }}
                </button>
              </li>
            </ul>
          </div>

          <div class="input-group ms-auto">
            <input v-model="searchQuery" type="text" class="form-control" placeholder="Cari kafe atau lokasi"
              @keyup.enter="handleSearch" />
            <button class="btn btn-primary" type="button" aria-label="Cari" @click="handleSearch">
              <Icon name="solar:magnifer-bold" />
            </button>
          </div>
        </div>

        <div class="row pt-5">
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
              !pending && !error && coffeeShops?.code === 500
            ">
              <error-section img-src="/images/errors/404.svg" img-alt="Terjadi Kesalahan" img-height="250"
                title="Ups, Terjadi kesalahan" text="Saat ini kami sedang memperbaiki kesalahan ini" />
            </div>
            <div class="col-md-6 text-center mx-auto" v-else-if="
              !pending && !error && (!coffeeShops?.data || coffeeShops.data.length === 0)
            ">
              <error-section img-src="/images/errors/404.svg" img-alt="Tidak Ditemukan" img-height="250"
                title="Tempat Ngopi Tidak Ditemukan"
                text="Kami tidak dapat menemukan tempat ngopi dengan kriteria tersebut." />
            </div>
            <div class="col-md-12 mx-auto" v-else-if="!pending && !error && coffeeShops?.data?.length > 0">
              <div class="row">
                <div class="col-md-6 col-lg-4 mb-4" v-for="(item, index) in coffeeShops.data" :key="index">
                  <card-coffee :data="item" />
                </div>
              </div>

              <div class="d-flex justify-content-center align-items-center gap-3">
                <button class="btn btn-primary btn-square" type="button" :disabled="!coffeeShops?.hasPrevPage"
                  @click="previous">
                  <Icon name="fa6-solid:chevron-left" />
                </button>

                <span>Halaman {{ coffeeShops?.page }} dari
                  {{ coffeeShops?.totalPage }}</span>

                <button class="btn btn-primary btn-square" type="button" :disabled="!coffeeShops?.hasNextPage"
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

const filterPlace = computed(() => currentRoute.query.city ?? null);

const page = computed({
  get() {
    return Number(currentRoute.query.page?.toString()) || 1;
  },
  set(newPage: number) {
    navigateTo({
      query: {
        ...currentRoute.query,
        page: newPage,
      },
    });
  },
});

const searchQuery = ref((currentRoute.query.search as string) || "");
let debounceTimeout: NodeJS.Timeout | null = null;

watch(searchQuery, (newVal) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    navigateTo({
      query: {
        ...currentRoute.query,
        page: 1,
        search: newVal || undefined,
      },
    });
  }, 500);
});

watch(
  () => currentRoute.query.search,
  (newVal) => {
    if (searchQuery.value !== (newVal || "")) {
      searchQuery.value = (newVal as string) || "";
    }
  },
);

const handleSearch = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  navigateTo({
    query: {
      ...currentRoute.query,
      page: 1,
      search: searchQuery.value || undefined,
    },
  });
};

onBeforeUnmount(() => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
});

const selectCity = (city: string | null) => {
  navigateTo({
    query: {
      ...currentRoute.query,
      page: 1,
      city: city || undefined,
    },
  });
};

// SEO META
usePageSeo({
  title: "Daftar Tempat Ngopi",
  description: "Berikut daftar tempat ngopi yang saya rekomendasikan.",
});

// Fetch Regions
const { data: regions } = await useCoffeeRegions();

// Fetch Data
const {
  data: coffeeShops,
  pending,
  error,
  refresh,
} = await useCoffeeShops({
  page: () => page.value,
  city: () => filterPlace.value,
  search: () => currentRoute.query.search,
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

<style lang="scss" scoped>
.metadata {
  position: sticky;
  top: 4.5rem;
  background: var(--bs-body-bg);
  z-index: 1000;
  padding: 1rem 0;
  border-bottom: 1px solid var(--bs-border-color);
  display: flex;
  gap: 1rem;

  >* {
    width: calc(25% - .5rem);

    @media (width <=992px) {
      width: calc(50% - .5rem);
    }
  }
}
</style>