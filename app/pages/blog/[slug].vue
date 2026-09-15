<template>
	<div id="blog-detail">
		<header-page :back-to="route('blog.index')">
			<template #title>Detail Artikel</template>
			<template #subtitle
				>Berikut saya tampilkan detail artikel yang saya tulis ini.</template
			>
		</header-page>

		<section class="need-space pt-0">
			<div class="container">
				<div class="row">
					<div class="col-md-6 text-center mx-auto" v-if="status === 'pending'">
						<error-section
							img-src="/images/errors/loading.svg"
							img-alt="Tidak Ditemukan"
							img-height="250"
							title="Tunggu Sebentar"
							text="Sistem sedang memuat konten dari peladen"
						/>
					</div>
					<div class="col-md-6 text-center mx-auto" v-else-if="error">
						<error-section
							:img-src="apiError.imgSrc"
							img-alt="Tidak Ditemukan"
							img-height="250"
							:title="apiError.title"
							:text="apiError.text"
						/>
					</div>
					<div
						class="col-md-6 text-center mx-auto"
						v-else-if="!error && !data"
					>
						<error-section
							img-src="/images/errors/404.svg"
							img-alt="Tidak Ditemukan"
							img-height="250"
							title="Tidak Ditemukan"
							text="Artikel yang Anda cari tidak tersedia"
						/>
					</div>
					<div class="col-md-12" v-else-if="data">
						<card-blog-details :data="data" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { route } from "~~/lib/route";
const { params } = useRoute();

// Data Fetching from Server
const { data, error, status } = usePostDetails(() => params.slug as string);
const apiError = computed(() => useApiErrorMessage(error.value?.statusCode));

import { usePageSeo } from "~~/lib/seo";

// SEO META
const title = computed(() =>
  status.value === "pending"
    ? "Sedang memuat data"
    : (data.value?.title ?? "Artikel Tidak Ditemukan"),
);
const description = computed(() =>
  status.value === "pending"
    ? "Sedang memuat data"
    : (data.value?.excerpt ?? "Artikel Tidak Ditemukan"),
);
const image = computed(
  () => data.value?.coverImage ?? "/images/meta-image.png",
);

usePageSeo({
  title,
  description,
  image,
  schemaType: "Article",
});
</script>

<style lang="scss">
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

		&:not(:last-child) {
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
