<template>
	<div id="about-me">
		<header-page>
			<template #title>Tentang Saya</template>
			<template #subtitle>Berikut sekilas tentang diri saya pribadi</template>
		</header-page>

		<section class="need-space pt-0">
			<div class="container">
				<div class="row flex-column-reverse flex-md-row gy-5">
					<div class="col-md-9">
						<!-- About Me -->
						<div id="about-me">
							<div class="row gy-3 pb-5">
								<div class="col-md-4">
									<div
										v-motion
										:enter="enterSlideFromBottomToTop"
										:initial="initialSlideFromBottomToTop"
										class="card card-body rounded-4 p-4 text-center align-items-center"
									>
										<Icon name="fa6-solid:medal" size="48" />
										<strong class="h3 mb-0 pt-3"
											>{{ countCareerStart }} Tahun</strong
										>
										<span>Berpengalaman</span>
									</div>
								</div>
								<div class="col-md-4">
									<div
										v-motion
										:enter="enterSlideFromBottomToTop"
										:initial="initialSlideFromBottomToTop"
										class="card card-body rounded-4 p-4 text-center align-items-center"
									>
										<Icon name="fa6-solid:handshake" size="48" />
										<strong class="h3 mb-0 pt-3"
											>{{ countCareerDev }} Tahun</strong
										>
										<span>Melayani</span>
									</div>
								</div>
								<div class="col-md-4">
									<nuxt-link
										to="/portofolio"
										v-motion
										:enter="enterSlideFromBottomToTop"
										:initial="initialSlideFromBottomToTop"
										class="card card-body rounded-4 p-4 text-center align-items-center text-decoration-none"
									>
										<Icon name="fa6-solid:briefcase" size="48" />
										<strong class="h3 mb-0 pt-3">{{ totalProjects }}</strong>
										<span>Proyek</span>
									</nuxt-link>
								</div>
							</div>

							<div class="mb-5 pb-5 border-bottom">
								<div class="row gy-4">
									<div class="col-md-5">
										<nuxt-img
											preload
											src="/images/programmer.svg"
											v-motion
											:enter="enterSlideFromLeftToRight"
											:initial="initialSlideFromLeftToRight"
											class="w-100"
										/>
									</div>
									<div
										class="col-md-7"
										v-motion
										:enter="enterSlideFromRightToLeft"
										:initial="initialSlideFromRightToLeft"
									>
										<p>
											Hai, saya <strong>Amir Zuhdi Wibowo</strong>, seorang
											<strong>Fullstack Web Developer</strong> yang hobi ngulik
											dari front-end sampai back-end. Saya senang membuat
											aplikasi web yang nggak cuma berfungsi dengan baik tapi
											juga enak dilihat. Dari HTML, CSS, JavaScript, sampai PHP,
											saya punya pengalaman yang luas untuk memastikan proyek
											web berjalan lancar dan terlihat menarik.
										</p>
										<p>
											Selain coding, saya juga jago di beberapa bidang IT
											lainnya. Saya bisa bikin desain grafis yang kece dengan
											Photoshop dan Illustrator, merancang UI/UX yang
											user-friendly pakai Figma, dan bahkan reparasi komputer
											ringan kalau ada masalah. Kombinasi keterampilan ini bikin
											saya siap banget untuk memberikan yang terbaik di setiap
											proyek yang saya kerjakan.
										</p>
									</div>
								</div>
							</div>
						</div>

						<!-- My History -->
						<div id="history" class="pb-4 mb-4 border-bottom">
							<h4>Sejarah Singkat</h4>

							<p>
								Perjalanan saya sebagai programmer dimulai secara tidak sengaja
								pada pertengahan 2015 saat mengerjakan tugas PKn. Awalnya
								berkenalan dengan
								<a href="https://blogger.com" rel="noreferrer" target="_blank"
									>Blogger</a
								>, lalu beralih ke WordPress, yang memperkenalkan saya pada
								konsep CMS yang lebih kompleks. Langkah berikutnya membawa saya
								ke dunia hosting dan manajemen server, di mana saya mempelajari
								panel kontrol seperti cPanel dan aspek teknis di balik sebuah
								website.
							</p>

							<p>
								Perjalanan ini berlanjut dengan mempelajari dasar-dasar HTML,
								CSS, dan JavaScript untuk frontend, serta PHP dan MySQL untuk
								backend. Saya menghadapi berbagai tantangan, dari error yang
								membingungkan hingga konsep-konsep sulit. Seiring waktu, saya
								mengeksplorasi teknologi modern seperti Node.js dan React,
								memperluas pemahaman saya tentang ekosistem pengembangan web
								fullstack.
							</p>

							<p>
								Menjadi fullstack developer adalah perjalanan penuh liku. Ada
								saat-saat frustrasi ketika menghadapi bug atau konfigurasi
								server yang kompleks, namun juga ada momen membahagiakan saat
								berhasil mengoptimalkan website atau mengimplementasikan fitur
								challenging. Kini, setelah bertahun-tahun, saya bersyukur atas
								perjalanan tidak disengaja ini yang telah membentuk karir dan
								passion saya dalam dunia pengembangan web.
							</p>
						</div>

						<!-- Skills -->
						<div id="skills" class="pb-5 mb-5 border-bottom">
							<h4>Keahlian Saya</h4>
							<p class="opacity-75 mb-5">Keahlian profesional saya.</p>

							<div class="skill-main-wrapper">
								<div
									class="skill"
									v-for="(item, index) in skillset"
									:key="index"
								>
									<Icon :name="item.icon" />
									<p class="m-0">{{ item.name }}</p>
								</div>
							</div>
						</div>

						<!-- Certification -->
						<div id="certification">
							<h4>Sertifikasi Saya</h4>
							<p class="opacity-75 mb-4">
								Beberapa sertifikat yang sudah dan pernah saya dapatkan.
							</p>

							<swiper
								:modules="[SwiperAutoplay, SwiperEffectCreative]"
								:slides-per-view="2"
								:loop="true"
								:space-between="16"
							>
								<swiper-slide v-for="slide in 10" :key="slide">
									<div
										style="background-color: rgba(255, 255, 255, 0.1)"
										class="ratio ratio-16x9 rounded-4"
									></div>
								</swiper-slide>
							</swiper>
						</div>
					</div>
					<div class="col-md-3">
						<div
							class="card sticky-top overflow-hidden rounded-4"
							v-motion
							:enter="enterSlideFromBottomToTop"
							:initial="initialSlideFromBottomToTop"
						>
							<div class="card-header p-4">
								<h4 class="mb-0">Navigasi</h4>
							</div>
							<div class="card-body">
								<!-- Tab panes Title -->
								<ul
									class="nav nav-pills flex-column align-items-stretch"
									v-motion
									:enter="enterSlideFromBottomToTop"
									:initial="initialSlideFromBottomToTop"
									id="myTab"
									role="tablist"
								>
									<li class="nav-item" role="presentation">
										<a href="#about-me" class="nav-link py-3 w-100 text-start">
											Tentang Saya
										</a>
									</li>
									<li class="nav-item" role="presentation">
										<a href="#history" class="nav-link py-3 w-100 text-start">
											Sejarah Singkat Saya
										</a>
									</li>
									<li class="nav-item" role="presentation">
										<a href="#skills" class="nav-link py-3 w-100 text-start">
											Keahlian
										</a>
									</li>
									<li class="nav-item" role="presentation">
										<a
											href="#certification"
											class="nav-link py-3 w-100 text-start"
										>
											Sertifikasi
										</a>
									</li>
									<li class="nav-item" role="presentation">
										<a
											href="javascript:void(0)"
											class="nav-link py-3 w-100 text-start"
										>
											Perkakas
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
import {
	initialSlideFromBottomToTop,
	enterSlideFromBottomToTop,
	initialSlideFromLeftToRight,
	enterSlideFromLeftToRight,
	initialSlideFromRightToLeft,
	enterSlideFromRightToLeft,
} from "~/components/motion";
import "dayjs/locale/id";

const dayjs = useDayjs();
dayjs.locale("id");
const careerStart = ref("2015-03-17");
const careerDev = ref("2019-05-20");
const dateNow = dayjs();

const countCareerStart = computed(() =>
	dateNow.diff(careerStart.value, "years")
);
const countCareerDev = computed(() => dateNow.diff(careerDev.value, "years"));

// Data Fetching from Server
const {
	data: totalProjects,
	error,
	status,
} = useFetch<any>(`/api/portofolios`, {
	method: "GET",
	transform: (a) => a?.totalData,
	server: true,
	lazy: false,
});

const skillset = ref([
	{ icon: "devicon:laravel", name: "Laravel" },
	{ icon: "devicon:nodejs", name: "NodeJS" },
	{ icon: "devicon:python", name: "Python" },
	{ icon: "devicon:java", name: "Java" },
	{ icon: "devicon:dart", name: "Dart" },
	{ icon: "devicon:kotlin", name: "Kotlin" },
	{ icon: "devicon:express", name: "ExpressJS" },
	{ icon: "devicon:go", name: "GoLang" },
	{ icon: "devicon:adonisjs", name: "AdonisJS" },
	{ icon: "devicon:vitejs", name: "ViteJS" },
	{ icon: "devicon:mysql", name: "MySQL" },
	{ icon: "devicon:mariadb", name: "MariaDB" },
	{ icon: "devicon:mongodb", name: "MongoDB" },
	{ icon: "devicon:sqlite", name: "SQLite" },
	{ icon: "devicon:flutter", name: "Flutter" },
	{ icon: "devicon:vercel", name: "Vercel" },
	{ icon: "devicon:php", name: "PHP" },
	{ icon: "devicon:html5", name: "HTML" },
	{ icon: "devicon:css3", name: "CSS" },
	{ icon: "devicon:javascript", name: "Javascript" },
	{ icon: "devicon:vuejs", name: "VueJS" },
	{ icon: "devicon:bootstrap", name: "Bootstrap" },
	{ icon: "devicon:tailwindcss", name: "TailwindCSS" },
	{ icon: "devicon:angular", name: "AngularJS" },
	{ icon: "devicon:jquery", name: "jQuery" },
	{ icon: "devicon:typescript", name: "Typescript" },
	{ icon: "devicon:git", name: "Git" },
	{ icon: "devicon:figma", name: "Figma" },
	{ icon: "logos:adobe-illustrator", name: "Adobe Illustrator" },
	{ icon: "devicon:canva", name: "Canva" },
	{ icon: "logos:adobe-photoshop", name: "Adobe Photoshop" },
	{ icon: "logos:visual-studio-code", name: "Visual Studio Code" },
	{ icon: "file-icons:coreldraw", name: "CorelDraw" },
]);

useHead({
	title: "Tentang Saya",
});
</script>

<style lang="scss">
.card {
	&.sticky-top {
		position: sticky;
		top: 7.5rem;
		z-index: 1020;
	}
}

@keyframes scroll {
	0% {
		transform: translateX(100%);
	}

	to {
		transform: translateX(-100%);
	}
}

.skill-main-wrapper {
	display: flex;
	gap: 0.75rem;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;

	.skill {
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		font-size: 1.25em;
		align-items: center;
		gap: 1rem;
		white-space: nowrap;
		background: rgba(var(--bs-body-color-rgb), 0.125);
		transition: outline 0.5s all;
		position: relative;
		z-index: 0;
		cursor: pointer;
		transition: all 0.2s;
		border-color: 1px solid transparent;

		&:hover {
			transform: scale(1.05);
			border-color: var(--bs-primary);
		}
	}
}
</style>

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