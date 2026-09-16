<template>
  <div v-if="user">
    <div class="panel-wrapper">
      <aside class="sidebar">
        <div class="sidebar-inner">
          <header class="sidebar-header">
            <nuxt-link href="/">
              <app-brand />
            </nuxt-link>
          </header>
        </div>
      </aside>

      <main class="panel-content">
        <nav class="navbar"></nav>

        <div class="panel-body">
          <slot></slot>
        </div>

        <div class="panel-footer"></div>
      </main>
    </div>
  </div>
  <div v-else-if="error && error.statusCode !== 401" class="container need-space text-center">
    <error-section :img-src="apiError.imgSrc" img-alt="Terjadi Kesalahan" img-height="250" :title="apiError.title"
      :text="apiError.text" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const { profileFetch } = useAuth();
const { data: profileRes, error } = profileFetch;
const user = computed(() => profileRes.value?.data);
const apiError = computed(() => useApiErrorMessage(error.value?.statusCode));
</script>

<style lang="scss">
.panel-wrapper {
  --panel-sidebar-width: 320px;

  background: #fdfdfd;
  display: flex;
  min-height: 100svh;

  [data-bs-theme=dark] & {
    background: #010111;
  }

  aside.sidebar {
    --panel-sidebar-margin: 1rem;
    --panel-sidebar-border-radius: 1rem;

    height: 100svh;
    width: var(--panel-sidebar-width);

    .sidebar-inner {
      background: var(--bs-body-bg);
      padding: 1rem;
      border: 1px solid var(--bs-border-color);
      margin: var(--panel-sidebar-margin);
      border-radius: var(--panel-sidebar-margin);
      min-height: calc(100svh - (var(--panel-sidebar-margin) * 2));
    }
  }
}
</style>