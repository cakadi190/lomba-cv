<template>
	<div class="border-top pt-4 mt-4" id="form-contact">
		<div class="alert bg-info-subtle d-flex gap-3">
			<Icon
				name="mdi:information-variant-circle"
				class="flex-shrink-0"
				size="32"
			/>
			<span
				>Mohon bersabar ya, karena fitur ini masih saya kembangkan untuk
				kedepannya bisa mengirimkan pesan dan menyimpan pesan yang kamu
				kirimkan.</span
			>
		</div>

		<h3>Atau Kirim Pesan Melalui Form Ini</h3>
		<p class="opacity-75">
			Gunakan formulir dibawah ini dan terhubung dengan saya supaya lebih kenal,
			akrab dan bisa dapet proyek dadakan dari saya. Mohon jangan kirimkan pesan
			lebih dari 5x, karena bisa membebani <em>server</em>!
		</p>

		<form @submit.prevent class="pt-1">
			<div class="row">
				<div class="col-md-6">
					<div class="mb-3">
						<label for="" class="input-label">Nama Lengkapmu</label>
						<input
							type="text"
							class="form-control"
							placeholder="Mis: Cak Adi"
						/>
					</div>
				</div>
				<div class="col-md-6">
					<div class="mb-3">
						<label for="" class="input-label"
							>Surat Elektronik (atau <em>E-Mail</em>)</label
						>
						<input
							type="text"
							class="form-control"
							placeholder="Mis: cakadi@email.com"
						/>
					</div>
				</div>
			</div>

			<div class="mb-3">
				<label class="input-label">Ada Perlu Apa?</label>
				<bs-dropdown v-model="selectedValue" :options="options" />
			</div>

			<div class="mb-3">
				<label for="" class="input-label">Pesan Anda</label>
				<textarea
					class="form-control"
					rows="4"
					placeholder="Tuliskan pesan anda disini&hellip;"
				/>
			</div>

			<div>
				<button
					type="submit"
					class="btn btn-primary d-flex gap-2 align-items-center"
				>
					<span>Kirim</span>
					<Icon name="fa6-solid:paper-plane" />
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts" setup>
import bsDropdown from "~/components/bs-dropdown.vue";

const selectedValue = ref("");
const options = ref<Option[]>([
	{ value: "connecting", label: "Izin Berkoneksi" },
	{
		value: "services",
		label: "Layanan",
		rightLabel: "Masih belum tersedia",
		disabled: true,
	},
	{ value: "project-collabs", label: "Kolaborasi Proyek" },
	{ value: "general", label: "Ingin Bertanya Hal Umum" },
	{ value: "others", label: "Hal Lainnya" },
]);
</script>

<script lang="ts">
export default defineComponent({
	name: "FormContact",
});
</script>

<style scoped lang="scss">
.input-label {
	font-size: 0.875rem;
	margin-bottom: 0.5rem;
	opacity: 0.75;
}
</style>