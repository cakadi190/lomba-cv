<template>
  <div id="contact-page">
    <header-page>
      <template #title>Hubungi Saya</template>
      <template #subtitle>Berikut kontak yang dapat dihubungi apabila anda tertarik dengan skill saya maupun ingin bekerjasama dengan saya.</template>
    </header-page>

    <contact-me-component />
  </div>
</template>

<script lang="ts" setup>
import contactMeComponent from '~/components/partials/contact-me/main.vue';

// SEO META
const title = computed(() => "Hubungi Saya");
const description = computed(
  () => `Berikut kontak yang dapat dihubungi apabila anda tertarik dengan skill saya maupun ingin bekerjasama dengan saya.`
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
