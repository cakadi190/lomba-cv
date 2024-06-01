<template>
	<section id="contact-details">
		<div class="mb-3">
			<div class="alert bg-warning-subtle d-flex gap-3">
				<Icon
					name="gravity-ui:triangle-exclamation-fill"
					class="flex-shrink-0"
					size="32"
				/>
				<div class="content">
					Sebagai peringatan keras! Informasi yang saya berikan dibawah ini
					hanya untuk <strong>Kebutuhan Bisnis Saja</strong>. Selebihnya jika
					kamu ingin terhubung, bisa langsung kirimkan pesan ke sosial media
					saya dengan syarat harus sopan dan memperkenalkan diri dan dari
					instansi, institusi, perusahaan dan atau daerah mana. Insyaallah saya
					akan menjawab secepatnya.
				</div>
			</div>
			<p>
				Saya sangat menghargai kamu apabila menggunakan fitur ini dengan penuh
				tanggungjawab.
			</p>
		</div>

		<div class="mt-4 border-top pt-4" id="information">
			<h4 class="mb-3">Informasi Kontak</h4>

			<div class="card mb-4 overflow-hidden">
				<div class="table-responsive">
					<table class="table mb-0 table-padded">
						<thead>
							<tr>
								<th class="w-25 text-nowrap">Kontak</th>
								<th>Detail</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="text-nowrap w-25">Alamat</td>
								<td>
									Ngawi, Jawa Timur&nbsp;&nbsp;<span
										data-bs-toggle="tooltip"
										data-bs-title="Maaf, saya tidak bisa memberikan alamat lengkap rumah saya dengan alasan privasi. Mohon untuk menghargainya!"
										><Icon size="14" name="bi:info-circle-fill"
									/></span>
								</td>
							</tr>
							<tr>
								<td class="text-nowrap w-25">Zona Waktu</td>
								<td>GMT+07:00 (Indonesian Western Time / UTC+7)</td>
							</tr>
							<tr>
								<td class="w-25 text-nowrap">Surat Elektronik</td>
								<td>
									<div class="d-flex gap-1 flex-wrap">
										<a
											class="text-decoration-line-through disabled"
											:href="`mailto:${email}`"
											>{{ email }}</a
										>
										<span
											data-bs-toggle="tooltip"
											data-bs-title="Sementara belum bisa karena hosting saya belum saya perpanjang wkwkwk."
											><Icon size="14" name="bi:info-circle-fill"
										/></span>
										<span>/</span>
										<a :href="`mailto:${altEmail}`">{{ altEmail }}</a>
									</div>
								</td>
							</tr>
							<tr>
								<td class="w-25 text-nowrap">Whatsapp (hanya chat)</td>
								<td>
									<a :href="convertToWhatsAppLink(phone)">{{ phone }}</a>
								</td>
							</tr>
							<tr>
								<td class="w-25 text-nowrap">Website</td>
								<td>
									<a :href="website">{{ website }}</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<p>
				Jika Anda membutuhkan informasi lebih lanjut, seperti nomor telepon
				saya, jangan ragu untuk mengirimkan email kepada saya terlebih dahulu.
			</p>
		</div>

		<div class="mt-4 border-top pt-4" id="socmed">
			<h4 class="mb-3">Sosial Media</h4>
			<p>
				Kalau kamu mau cari semua sosial mediaku, kamu bisa menggunakan
				pencarian <strong>@cakadi190 / @cakadi.id</strong> yang mana itu adalah
				nama pengguna di hampir semua sosialku.
			</p>
			<p>
				Tapi mungkin kamu gak punya waktu untuk nyari sosmedku, bisa deh pake
				daftar tautan dibawah ini.
			</p>
			<div class="card mb-4 overflow-hidden">
				<div class="table-responsive">
					<table class="table mb-0 table-padded">
						<thead>
							<tr>
								<th class="w-25 text-nowrap">Platform</th>
								<th>Detail</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="link in socialMediaLinks" :key="link.platform">
								<td class="w-25 text-nowrap">{{ link.platform }}</td>
								<td>
									<a :href="link.url" target="_blank" class="text-decoration-none">{{ link.url }} <Icon name="lucide:external-link" /></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
export default defineComponent({
	name: "ContactDetails",
});
</script>

<script lang="ts" setup>
const email: Ref<string> = ref("me@cakadi.id");
const altEmail: Ref<string> = ref("cakadi190@gmail.com");
const phone: Ref<string> = ref("081333550746");
const website: Ref<string> = ref("https://www.cakadi.id");

const socialMediaLinks = ref([
	{ platform: "Facebook", url: "https://www.facebook.com/cakadi190" },
	{ platform: "Instagram", url: "https://www.instagram.com/cakadi.id/" },
	{ platform: "Twitter", url: "https://twitter.com/cakadi190" },
	{ platform: "Youtube", url: "https://youtube.com/@catatancakadi" },
	{ platform: "LinkedIn", url: "https://linkedin.com/in/cakadi190" },
]);
</script>

<style scoped lang="scss">
.table-padded {
	th,
	td {
		padding: 0.625rem 0.875rem;
	}
}
</style>