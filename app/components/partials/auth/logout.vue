<script setup lang="ts">
import { route } from "~~/lib/route";

interface Props {
  as?: any;
}

withDefaults(defineProps<Props>(), {
  as: "button",
});

const { logout } = useAuth();

async function handleLogout() {
  try {
    await logout();
    navigateTo(route("auth.login"));
  } catch (err) {
    console.error("Gagal logout:", err);
  }
}
</script>

<template>
  <!-- biome-ignore lint/a11y/noStaticElementInteractions: dynamic component behaves as an interactive element -->
  <component :is="as" @click="handleLogout">
    <slot />
  </component>
</template>