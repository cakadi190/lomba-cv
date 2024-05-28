<template>
	<div id="project-detail">
		<header-page>
			<template #title>Detail Proyek</template>
			<template #subtitle
				>Berikut saya tampilkan detail proyek yang saya kerjakan ini.</template
			>
		</header-page>

		<section class="need-space pt-0">
			<div class="container">
				<img
					src="/images/portofolio/cakadi-home.png"
					class="w-100 rounded-4"
					alt="Cak Adi Website"
				/>

				<div
					class="pt-5 pb-4 flex-column flex-lg-row border-bottom mb-5 align-items-start align-items-lg-center d-flex justify-content-between gap-3"
				>
					<div>
						<h1 class="h3">Website Cak Adi</h1>
						<p class="opacity-75 mb-0">
							Merupakan sebuah web pribadi untuk keperluan portofolio.
						</p>
					</div>
					<div class="d-flex gap-3">
						<a
							href="https://cakadi.id/"
							target="_blank"
							class="d-flex gap-2 align-items-center btn btn-outline-primary"
						>
							<Icon name="fa6-brands:github" />
							<span>Source Code</span>
						</a>
						<a
							href="https://cakadi.id/"
							target="_blank"
							class="d-flex gap-2 align-items-center btn btn-primary"
						>
							<Icon name="fa6-solid:link" />
							<span>Live Demo</span>
						</a>
					</div>
				</div>

				<div class="row flex-column-reverse flex-md-row gy-5">
					<div class="col-md-8">
						<h3 id="description">Deskripsi Proyek</h3>

						<p class="opacity-75">
							Proyek "Website Cak Adi" adalah inisiatif digital yang bertujuan
							untuk mempromosikan dan memperkenalkan produk serta jasa yang
							ditawarkan oleh Cak Adi kepada masyarakat luas. Website ini akan
							menjadi platform utama yang menampilkan berbagai informasi
							mengenai usaha Cak Adi, termasuk produk unggulan, layanan khusus,
							dan penawaran menarik. Dengan desain yang user-friendly dan
							responsif, website ini diharapkan dapat memberikan pengalaman yang
							nyaman dan informatif bagi pengunjung, baik melalui komputer
							maupun perangkat mobile.
						</p>

						<p class="opacity-75">
							Website Cak Adi akan dilengkapi dengan fitur-fitur interaktif yang
							memudahkan pengunjung untuk berinteraksi dan melakukan transaksi.
							Fitur seperti katalog produk yang terorganisir dengan baik, sistem
							pemesanan online, serta integrasi dengan berbagai metode
							pembayaran akan mempermudah pelanggan dalam mendapatkan produk dan
							layanan yang mereka butuhkan. Selain itu, blog dan artikel yang
							diupdate secara berkala akan memberikan informasi tambahan
							mengenai tips, tutorial, dan update terbaru dari Cak Adi, sehingga
							pelanggan selalu mendapatkan informasi yang relevan dan
							bermanfaat.
						</p>

						<p class="opacity-75">
							Di balik pengembangan Website Cak Adi, terdapat komitmen untuk
							mendukung pertumbuhan usaha lokal dan memperluas jangkauan pasar.
							Dengan adanya platform online ini, Cak Adi berharap dapat
							menjangkau lebih banyak pelanggan potensial, tidak hanya di
							wilayah lokal tetapi juga di seluruh Indonesia. Website ini juga
							akan menjadi sarana untuk membangun komunitas pelanggan yang loyal
							melalui program loyalitas, penawaran eksklusif, dan layanan
							pelanggan yang responsif. Melalui proyek ini, Cak Adi berupaya
							untuk terus berinovasi dan beradaptasi dengan perkembangan
							teknologi demi memberikan pelayanan terbaik kepada semua
							pelanggannya.
						</p>

						<h3 id="techstack">Dibangun Dengan</h3>

						<div class="d-flex gap-3 align-items-center">
							<Icon name="devicon:nuxtjs" size="32" />
							<Icon name="devicon:html5" size="32" />
							<Icon name="devicon:css3" size="32" />
							<Icon name="devicon:bootstrap" size="32" />
							<Icon name="devicon:javascript" size="32" />
							<Icon name="devicon:typescript" size="32" />
							<Icon name="devicon:jquery" size="32" />
						</div>
					</div>
					<div class="col-md-4">
						<div class="card sticky-top rounded-4">
							<div class="card-header p-4">
								<h4 class="mb-0">Navigasi</h4>
							</div>
							<div class="card-body">
								<!-- Tab panes Title -->
								<ul
									class="nav nav-pills flex-column align-items-stretch"
									id="myTab"
									role="tablist"
								>
									<li class="nav-item" role="presentation">
										<a
											href="#description"
											class="nav-link py-3 w-100 text-start"
										>
											Deskripsi Proyek
										</a>
									</li>
									<li class="nav-item" role="presentation">
										<a href="#techstack" class="nav-link py-3 w-100 text-start">
											Dibangun Dengan
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
useHead({
	title: "Cak Adi Website",
});
</script>

<style scoped lang="scss">
.nav-pills {
	.nav-item {
		.nav-link {
			color: var(--bs-body-color);
			opacity: 0.75;

			&.active {
				background-color: transparent;
				box-shadow: none;
				opacity: 1;
			}
		}

		&:first-child {
			border-bottom: 1px solid var(--bs-card-border-color);
		}
	}
}

.card {
	&.sticky-top {
		position: sticky;
		top: 7.5rem;
		z-index: 1020;
	}
}
</style>