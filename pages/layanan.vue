<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
// SEO META
const title = computed(() => "Layanan Saya");
const description = computed(
  () => `Berikut layanan yang bisa saya berikan dan layani untuk anda.`
);
const image = computed(() => "/images/meta-image.png");
const urlRequest = useRequestURL();

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
</script>

<style>

</style>