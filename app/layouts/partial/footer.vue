<template>
  <footer class="border-top py-4 mt-auto">
    <div class="container py-4">
      <div class="row gy-5">
        <div class="col-md-6">
          <h5 class="h6">Tentang Saya</h5>
          <p class="opacity-75">
            Saya adalah seorang fullstack developer yang suka sekali dengan
            desain dan juga tertarik di dunia teknologi. Saya adalah orang
            kelahiran Klaten, Jawa Tengah dan berdomisili di Ngawi, Jawa Timur.
          </p>
          <div class="d-flex gap-3 mt-4">
            <a aria-label="Mas Adi's Facebook" class="duration-200 transition-all"
              href="https://www.facebook.com/cakadi190">
              <Icon size="20" name="fa6-brands:facebook" />
            </a>
            <a aria-label="Mas Adi's Twitter" class="duration-200 transition-all"
              href="https://www.twitter.com/cakadi190">
              <Icon size="20" name="fa6-brands:twitter" />
            </a>
            <a aria-label="Mas Adi's Figma" class="duration-200 transition-all" href="https://www.figma.com/@cakadi190">
              <Icon size="20" name="fa6-brands:figma" />
            </a>
            <a aria-label="Mas Adi's Instagram" class="duration-200 transition-all"
              href="https://www.instagram.com/cakadi190">
              <Icon size="20" name="fa6-brands:instagram" />
            </a>
            <a aria-label="Mas Adi's Linkedin" class="duration-200 transition-all"
              href="https://www.linkedin.com/in/cakadi190">
              <Icon size="20" name="fa6-brands:linkedin-in" />
            </a>
          </div>
        </div>

        <div class="col-lg-2 col-6">
          <h5 class="h6">Ke(-rjaan/gabut)-an Saya</h5>
          <ul class="list-unstyled">
            <li><nuxt-link :to="route('about.education')">Pendidikan</nuxt-link></li>
            <li><nuxt-link :to="route('about.achievement')">Penghargaan</nuxt-link></li>
            <li><nuxt-link :to="route('about.skills')">Skill & Perkakas</nuxt-link></li>
            <li><nuxt-link :to="route('services')">Layanan</nuxt-link></li>
            <li><nuxt-link :to="route('portfolios.index')">Portofolio Saya</nuxt-link></li>
            <li><nuxt-link :to="route('about.career')">Karir</nuxt-link></li>
          </ul>
        </div>

        <div class="col-lg-2 col-6">
          <h5 class="h6">Sumber Daya</h5>
          <ul class="list-unstyled">
            <li><nuxt-link :href="route('blog.index')">Blog Pribadi</nuxt-link></li>
            <li>
              <!-- biome-ignore lint/a11y/useValidAnchor: placeholder link -->
              <a href="#">Referensi Ngoding</a>
            </li>
            <li>
              <!-- biome-ignore lint/a11y/useValidAnchor: placeholder link -->
              <a href="#">Contekan Kode</a>
            </li>
            <li><nuxt-link :to="route('resources.coffee-shops.index')">Tempat Ngopi</nuxt-link></li>
          </ul>
        </div>

        <div class="col-md-2">
          <h5 class="h6">Tautan Lain-lain</h5>
          <ul class="list-unstyled">
            <li><nuxt-link :to="route('about.site')">Tentang Situs</nuxt-link></li>
            <li>
              <!-- biome-ignore lint/a11y/useValidAnchor: placeholder link -->
              <a href="#">Kredit</a>
            </li>
            <li>
              <!-- biome-ignore lint/a11y/useValidAnchor: placeholder link -->
              <a href="#">Donasi di trakteer.id</a>
            </li>
            <li>
              <!-- biome-ignore lint/a11y/useValidAnchor: placeholder link -->
              <a href="#">Donasi di ko-fi.com</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6 text-center text-lg-start">
          <p class="mb-0">
            Hak cipta &copy; 2024 Mas Adi.
          </p>
        </div>
        <div class="col-md-6 text-center text-lg-end">
          <p class="mb-0">Made with ❤ in Ngawi, Indonesia.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { route } from "~~/lib/route";
</script>

<script lang="ts">
export default defineComponent({
  name: "FooterMain",
});
</script>

<style lang="scss" scoped>
/* Di dalam <style> */
.social-icons a {
  margin-right: 10px;
  /* Atur jarak antar ikon */
}

.list-unstyled {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin-bottom: 0;

  a {
    text-decoration: none;
    color: var(--bs-body-color);
    opacity: .75;
  }
}
</style>