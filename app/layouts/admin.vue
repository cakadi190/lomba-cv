<template>
  <div v-if="user">
    <slot />
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