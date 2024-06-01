<template>
	<section id="contact-details">
		<div class="mb-3">
			<div class="alert bg-warning-subtle d-flex gap-3">
        <Icon name="gravity-ui:triangle-exclamation-fill" class="flex-shrink-0" size="32" />
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

		<div class="mt-4 border-top pt-4">
			<h4 class="mb-3">Informasi Kontak</h4>

			<div class="card mb-4 overflow-hidden">
				<div class="table-responsive">
					<table class="table mb-0">
            <thead>
              <tr>
                <th class="w-25 text-nowrap">Kontak</th>
                <th>Detail</th>
              </tr>
            </thead>
						<tbody>
              <tr>
                <td class="text-nowrap w-25">Alamat</td>
                <td>Ngawi, Jawa Timur&nbsp;&nbsp;<span data-bs-toggle="tooltip" data-bs-title="Maaf, saya tidak bisa memberikan alamat lengkap rumah saya dengan alasan privasi. Mohon untuk menghargainya!"><Icon size="14" name="bi:info-circle-fill" /></span></td>
              </tr>
							<tr>
								<td class="w-25 text-nowrap">Surat Elektronik</td>
								<td>
									<a :href="`mailto:${email}`">{{ email }}</a>
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

      <p>Jika Anda membutuhkan informasi lebih lanjut, seperti nomor telepon saya, jangan ragu untuk mengirimkan email kepada saya terlebih dahulu.</p>
		</div>
	</section>
</template>

<script lang="ts">
export default defineComponent({
	name: "ContactDetails",
});
</script>

<script lang="ts" setup>
const email: Ref<string> = ref("cakadi190@gmail.com");
const phone: Ref<string> = ref("081333550746");
const website: Ref<string> = ref("https://www.cakadi.id");
</script>

<style>
</style>