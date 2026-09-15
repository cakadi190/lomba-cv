<script lang="ts" setup>
import { route } from "~~/lib/route";

defineOptions({ name: "BlogHomeSection" });

const { data: posts, pending, error } = await useLatestPosts(3);
</script>

<template>
  <section class="need-space" id="blog-home-section">
    <div class="container">
      <div class="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
        <div>
          <h2 class="mb-1">Blog</h2>
          <p class="mb-0 opacity-75">Artikel terbaru yang sudah saya tulis.</p>
        </div>
        <nuxt-link :to="route('blog.index')" class="btn btn-outline-primary d-flex align-items-center gap-2">
          <span>Lihat Selengkapnya</span>
          <Icon name="fa6-solid:arrow-right" />
        </nuxt-link>
      </div>

      <ClientOnly>
        <div class="row" v-if="!pending && !error && (posts?.data?.length ?? 0) > 0">
          <div class="col-md-6 col-lg-4 mb-4" v-for="(item, index) in posts?.data" :key="index">
            <card-blog :data="item" />
          </div>
        </div>

        <div v-else-if="!pending && !error && (posts?.data?.length ?? 0) === 0" class="text-center opacity-75">
          Belum ada artikel yang tersedia saat ini.
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
