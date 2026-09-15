<script lang="ts" setup>
import { route } from "~~/lib/route";

defineOptions({ name: "PortfolioHomeSection" });

const { data: portfolios, pending, error } = await useLatestPortfolios(3);
</script>

<template>
  <section class="need-space" id="portfolio-home-section">
    <div class="container">
      <div class="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
        <div>
          <h2 class="mb-1">Portofolio</h2>
          <p class="mb-0 opacity-75">Beberapa proyek yang sudah saya kerjakan akhir-akhir ini.</p>
        </div>
        <nuxt-link :to="route('portfolios.index')" class="btn btn-outline-primary d-flex align-items-center gap-2">
          <span>Lihat Selengkapnya</span>
          <Icon name="fa6-solid:arrow-right" />
        </nuxt-link>
      </div>

      <ClientOnly>
        <div class="row" v-if="!pending && !error && (portfolios?.data?.length ?? 0) > 0">
          <div class="col-md-6 col-lg-4 mb-4" v-for="(item, index) in portfolios?.data" :key="index">
            <card-porto :data="item" />
          </div>
        </div>

        <template #fallback>
          <div class="row">
            <div class="col-md-6 col-lg-4 mb-4" v-for="i in 3" :key="i">
              <div class="card h-100 placeholder-glow rounded-4" style="min-height: 320px;">
                <span class="placeholder col-12 h-100 d-block"></span>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
