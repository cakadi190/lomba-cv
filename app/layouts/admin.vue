<template>
  <div v-if="user">
    <div class="panel-wrapper">
      <aside class="sidebar">
        <header class="sidebar-header">
          <nuxt-link href="/">
            <app-brand />
          </nuxt-link>
        </header>
      </aside>
      
      <main class="panel-content">
        <nav class="navbar"></nav>

        <div class="panel-body"></div>

        <div class="panel-footer"></div>
      </main>
    </div>
  </div>
  <div v-else-if="error && error.statusCode !== 401" class="container need-space text-center">
    <error-section :img-src="apiError.imgSrc" img-alt="Terjadi Kesalahan" img-height="250"
      :title="apiError.title" :text="apiError.text" />
  </div>
</template>

<script lang="ts" setup>
import { computed, watchEffect } from "vue";
import { route } from "~~/lib/route";

const { profileFetch } = useAuth();
const { data: profileRes, error } = await profileFetch;
const user = computed(() => profileRes.value?.data);
const apiError = computed(() => useApiErrorMessage(error.value?.statusCode));

watchEffect(() => {
  if (error.value?.statusCode === 401 || (profileRes.value && !profileRes.value.data)) {
    navigateTo(route("auth.login"));
  }
});
</script>

<style lang="scss">
.panel-wrapper {
  display: flex;
  min-height: 100svh;

  aside.sidebar {
    height: 100svh;
    width: 320px;
  }
}
</style>