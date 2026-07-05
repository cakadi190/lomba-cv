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
import contactMeComponent from "~/components/partials/contact-me/main.vue";
import { usePageSeo } from "~~/lib/seo";

// SEO META
usePageSeo({
  title: "Hubungi Saya",
  description:
    "Berikut kontak yang dapat dihubungi apabila anda tertarik dengan skill saya maupun ingin bekerjasama dengan saya.",
});
</script>
