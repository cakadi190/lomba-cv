<template>
  <div v-if="user">
    <div class="panel-wrapper" :class="{ 'sidebar-collapsed': isCollapsed, 'sidebar-open': isMobileOpen }">
      <button type="button" class="sidebar-backdrop" aria-label="Tutup sidebar" @click="closeMobileSidebar"></button>

      <partials-admin-sidebar />

      <main class="panel-content">
        <partials-admin-navbar :user="user" :user-initials="userInitials" />

        <div class="panel-body">
          <slot></slot>
        </div>

        <div class="panel-footer">
          <div>
            Hak Cipta 2024 <nuxt-link :href="route('home')">Catatan Cak Adi</nuxt-link>.
          </div>
          <div><span class="version-badge">v3.2.0-dev.20260918</span></div>
        </div>
      </main>
    </div>
  </div>
  <div v-else-if="error && error.status !== 401" class="container need-space text-center">
    <error-section :img-src="apiError.imgSrc" img-alt="Terjadi Kesalahan" img-height="250" :title="apiError.title"
      :text="apiError.text" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { route } from "~~/lib/route";

const { isCollapsed, isMobileOpen, closeMobileSidebar } = useAdminSidebar();

// Profil pengguna yang sedang login
const { profileFetch } = useAuth();
const { data: profileRes, error } = profileFetch;
const user = computed(() => profileRes.value?.data);
const apiError = computed(() => useApiErrorMessage(error.value?.statusCode));

const userInitials = computed(() => {
  const name = user.value?.name?.trim();
  if (!name) return "?";
  const parts = name.split(/\s+/);
  const initials = parts.length > 1
    ? parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    : parts[0].slice(0, 2);
  return initials.toUpperCase();
});
</script>

<style lang="scss">
@use "../assets/scss/layouts/admin";
</style>
