<template>
  <ClientOnly>
    <button
      type="button"
      class="btn btn-link nav-link theme-toggle-btn d-flex align-items-center justify-content-center p-2 rounded-circle"
      @click="toggleTheme"
      :aria-label="`Ubah ke mode ${isDark ? 'terang' : 'gelap'}`"
      title="Ubah Tema"
    >
      <div class="icon-wrapper">
        <Icon
          v-if="isDark"
          name="lucide:moon"
          class="theme-icon text-warning"
          size="20"
        />
        <Icon
          v-else
          name="lucide:sun"
          class="theme-icon text-primary"
          size="20"
        />
      </div>
    </button>
    <template #fallback>
      <!-- Fallback static placeholder to avoid layout shift -->
      <div class="theme-toggle-placeholder rounded-circle" style="width: 36px; height: 36px; background-color: var(--bs-tertiary-bg);"></div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({ name: "ThemeToggler" });

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const toggleTheme = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<style lang="scss" scoped>
.theme-toggle-btn {
  border: none;
  background: transparent;
  width: 36px;
  height: 36px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  color: var(--bs-body-color);
  
  &:hover {
    background-color: var(--bs-tertiary-bg);
    transform: scale(1.05);
    
    .theme-icon {
      transform: rotate(45deg);
    }
  }

  &:active {
    transform: scale(0.95);
  }
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.theme-icon {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease;
}

.theme-toggle-placeholder {
  opacity: 0.5;
}
</style>
