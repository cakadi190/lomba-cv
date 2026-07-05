<template>
  <div class="admin-wrapper" v-if="user">
  </div>
</template>

<script lang="ts" setup>
import { computed, watchEffect } from "vue";
import { route } from "~~/lib/route";

const { profileFetch, logout } = useAuth();
const { data: profileRes, error } = await profileFetch;
const user = computed(() => profileRes.value?.data);

watchEffect(() => {
  if (error.value || (profileRes.value && !profileRes.value.data)) {
    navigateTo(route("admin.auth.login"));
  }
});

async function handleLogout() {
  try {
    await logout();
    navigateTo(route("admin.auth.login"));
  } catch (err) {
    console.error("Gagal logout:", err);
  }
}
</script>