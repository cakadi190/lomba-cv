<template>
	<div class="dropdown w-100">
		<button
			class="btn dropdown-toggle w-100 justify-content-between d-flex align-items-center"
			:class="[`btn-${variant}`, `btn-${size}`]"
			type="button"
			:id="`select-menu-${refId}`"
			data-bs-toggle="dropdown"
			aria-haspopup="true"
			aria-expanded="false"
		>
			{{ selectedLabel }}
		</button>
		<ul class="dropdown-menu w-100" :aria-labelledby="`select-menu-${refId}`">
			<li v-for="option in options" :key="option.value">
				<a
					class="dropdown-item d-flex gap-3 justify-content-between"
					:class="{ disabled: option.disabled ?? false, active: isSelected(option) }"
					:disabled="option.disabled ?? false"
					href="#"
					@click.prevent="selectOption(option)"
				>
					<span>{{ option.label }}</span>
					<span v-if="option.rightLabel">{{ option.rightLabel }}</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';

const refId = ref(generateRandomString(16));

const props = withDefaults(
	defineProps<{
		modelValue: string;
		options: Option[];
		size?: "sm" | "md" | "lg" | "xl";
		placeholder?: string;
		variant?:
			| "primary"
			| "secondary"
			| "success"
			| "danger"
			| "warning"
			| "info"
			| "light"
			| "dark"
			| "link";
	}>(),
	{
		size: "md",
		placeholder: "Pilih opsi dibawah ini.",
		variant: "link",
	}
);

const emit = defineEmits(["update:modelValue"]);

const selectedLabel = computed(() => {
	const selectedOption = props.options.find(
		(option) => option.value === props.modelValue
	);
	return selectedOption ? selectedOption.label : props.placeholder;
});

function selectOption(option: Option) {
	emit("update:modelValue", option.value);
}

function isSelected(option: Option): boolean {
	return option.value === props.modelValue;
}
</script>

<script lang="ts">
export default defineComponent({
	name: "BsDropdown",
});
</script>

<style lang="scss" scoped>
.dropdown {
	.dropdown-toggle {
		border-color: var(--bs-border-color);
		text-decoration: none;
		color: var(--bs-body-color);
	}
}
</style>
