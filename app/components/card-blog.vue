<script lang="ts" setup>
import { route } from '~~/lib/route';

defineProps<{
  data: any;
}>();
</script>

<template>
  <div class="wrapper">
    <nuxt-link :to="route('blog.show', { slug: data.slug })" class="card h-100 overflow-hidden rounded-4">
      <nuxt-img v-if="data.coverImage" loading="lazy" :src="data.coverImage" class="rounded-3 card-img-top"
        :alt="data.title" :placeholder="[16, 9]" sizes="sm:100vw md:50vw lg:33vw" densities="x1 x2" />

      <div class="card-body p-4">
        <div class="d-flex gap-2 mb-2 justify-content-between">
          <h5 class="card-title mb-0">{{ data.title }}</h5>
          <div v-if="data.categories?.length">
            <span
              :style="{ backgroundColor: data.categories[0].color, color: getColorContrastText(data.categories[0].color) }"
              class="badge">
              {{ data.categories[0].name }}
            </span>
          </div>
        </div>
        <div class="card-text mb-3 opacity-75">
          {{ limitWords(data.excerpt, 20) }}
        </div>

        <div class="d-flex flex-wrap gap-2" v-if="data.tags?.length">
          <span class="badge tag-badge" v-for="(tag, index) in data.tags" :key="index">
            {{ tag }}
          </span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "CardBlog",
});
</script>

<style lang="scss" scoped>
.card {
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.025);
    border-color: var(--bs-primary);
  }

  .tag-badge {
    border-radius: .5rem !important;
    background: rgba(var(--bs-body-color-rgb), .125);
    color: var(--bs-body-color);
    border: 1px solid rgba(var(--bs-body-color-rgb), .125);
    font-weight: 500;
  }
}
</style>
