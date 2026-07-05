<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h1 class="display-1">{{ error.statusCode }}</h1>
      <p class="lead">{{ error.message }}</p>

      <nuxt-link :to="route('home')" class="btn btn-primary">Kembali</nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { route } from "~~/lib/route";

defineProps({
  error: {
    type: Object,
    required: true,
  },
});

definePageMeta({
  layout: "default",
});
</script>