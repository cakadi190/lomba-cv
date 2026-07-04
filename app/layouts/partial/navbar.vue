<template>
	<teleport to="body">
		<div
			class="offcanvas offcanvas-start"
			tabindex="-1"
			id="offcanvas"
			role="dialog"
			aria-labelledby="offcanvasLabel"
		>
			<div class="offcanvas-header align-items-center">
				<app-brand
					link-class="offcanvas-title"
					id="offcanvasLabel"
					height="28"
          :to="route('home')"
				/>
				<div class="d-flex align-items-center gap-2 ms-auto">
					<theme-toggler />
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>
			</div>
			<div class="offcanvas-body">
				<ul class="navbar-nav gap-2 justify-content-end flex-grow-1">
					<li
						class="nav-item"
						v-for="(item, index) in navbarMenu"
						:key="index"
					>
						<!-- biome-ignore lint/a11y/noStaticElementInteractions: nuxt-link compiles to a semantic interactive link -->
						<nuxt-link
							:class="item.link === $route.path ? 'active' : ''"
							class="nav-link"
							:to="item.link"
							@click="closingOffcanvas"
							>{{ item.name }}</nuxt-link
						>
					</li>
				</ul>
			</div>
		</div>
	</teleport>

	<nav class="navbar navbar-expand-lg fixed-top navbar-light py-3">
		<div class="container">
			<app-brand link-class="navbar-brand" height="32" />
			
			<div class="d-flex align-items-center gap-2 order-lg-last">
				<theme-toggler />
				<button
					class="navbar-toggler p-0 border-0"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvas"
					aria-controls="offcanvas"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
			</div>

			<div class="collapse navbar-collapse" id="navbarMain">
				<ul class="navbar-nav gap-2 justify-content-end flex-grow-1 me-3">
					<li class="nav-item" v-for="(item, index) in navbarMenu" :key="index">
						<nuxt-link
							:class="item.link === $route.path ? 'active' : ''"
							class="nav-link"
							:to="item.link"
							>{{ item.name }}</nuxt-link
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { route } from '~~/lib/route';

defineOptions({ name: "NavbarMain" });

const navbar = ref<HTMLElement | null>(null);

const navbarMenu = ref([
  { name: "Beranda", link: "/" },
  { name: "Portofolio", link: "/portofolio" },
  { name: "Tentang Saya", link: "/tentang/saya" },
  { name: "Pendidikan & Organisasi", link: "/pendidikan" },
  { name: "Penghargaan", link: "/penghargaan" },
  { name: "Karir", link: "/karir" },
  { name: "Artikel", link: "/blog" },
  { name: "Kontak Saya", link: "/kontak" },
]);

const closingOffcanvas = () => {
  const btnClose = document.querySelector("#offcanvas .btn-close");
  if (btnClose instanceof HTMLElement) {
    btnClose.click();
  }
};

const handleScroll = () => {
  if (window.scrollY >= 50) {
    navbar.value?.classList.add("body-bg-rgb");
    navbar.value?.classList.add("border-bottom");
    navbar.value?.style.setProperty("--bs-bg-opacity", "1");
    navbar.value?.style.setProperty("backdrop-filter", "blur(1rem)");
  } else {
    navbar.value?.classList.remove("body-bg-rgb");
    navbar.value?.classList.remove("border-bottom");
    navbar.value?.style.removeProperty("--bs-bg-opacity");
    navbar.value?.style.removeProperty("backdrop-filter");
  }
};

onMounted(() => {
  handleScroll();

  navbar.value = document.querySelector(".navbar");
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>