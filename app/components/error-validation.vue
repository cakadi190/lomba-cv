<template>
  <span v-if="errorMessage" class="invalid-feedback d-block" role="alert">
    <strong>{{ errorMessage }}</strong>
  </span>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";

const props = defineProps<{
  name: string;
}>();

// Injected reactive validation errors object from parent component/form
const errors = inject<any>("errors", null);

const errorMessage = computed(() => {
  const errorVal = errors?.value?.[props.name];
  return Array.isArray(errorVal) ? errorVal[0] : errorVal;
});
</script>
