<template>
  <div v-if="user">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, watchEffect } from "vue";
import { route } from "~~/lib/route";

const { profileFetch } = useAuth();
const { data: profileRes, error } = await profileFetch;
const user = computed(() => profileRes.value?.data);

watchEffect(() => {
  if (error.value || (profileRes.value && !profileRes.value.data)) {
    navigateTo(route("admin.auth.login"));
  }
});
</script>