<template>
	<div id="achievements-page">
		<header-page>
			<template #title>Penghargaan Saya</template>
			<template #subtitle
				>Biar gak dikira gak punya pencapaian apa-apa</template
			>
		</header-page>

		<section class="need-space pt-0">
			<div class="container">
				<ul class="list-group list-group-flush">
					<li
						class="list-group-item py-4"
						v-for="(award, index) in awardsAndCertifications"
						:key="index"
						v-motion
						:enter="enterSlideFromBottomToTop"
						:initial="initialSlideFromBottomToTop"
					>
						<div class="d-flex gap-3 align-items-start align-items-lg-center">
							<div class="text-center align-items-start align-items-lg-center">
								<Icon
									:class="[
										award.rank !== undefined &&
										typeof award.rank === 'number' &&
										award.rank > 0 &&
										award.rank - 1 < rankColor.length
											? rankColor[award.rank - 1]
											: 'color-body',
									]"
                  :style="
										award.rank !== undefined &&
										typeof award.rank === 'number' &&
										award.rank > 0 &&
										award.rank - 1 < rankColor.length
											? ''
											: '--bs-color-opacity: .75'"
									:name="award.icon"
									size="48"
								/>
							</div>
							<div class="content">
								<h5 class="mb-1">
									{{ award.event }}
									<span v-if="isAwardNew[index]" class="badge bg-success ms-2"
										>Baru</span
									>
								</h5>
								<p class="mb-0 opacity-75">{{ award.award }}</p>
							</div>
							<div
								class="year ms-auto badge p-2 px-3 fw-normal lh-1 bg-primary rounded-pill"
								style="font-size: 1rem"
							>
								{{ award.year }}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import {
	initialSlideFromBottomToTop,
	enterSlideFromBottomToTop,
} from "~/components/motion";
import { differenceInDays } from "date-fns";

const isAwardNew = computed(() => {
	const now = new Date();
	return awardsAndCertifications.value.map((award) => {
		if (!award.date) return false;
		const awardDate = new Date(award?.date as Date);
		const daysDifference = differenceInDays(now, awardDate);
		return daysDifference <= 30;
	});
});

// SEO META
const title = computed(() => "Penghargaan");
const description = computed(
  () => `Berikut beberapa daftar penghargaan yang sudah saya raih dan capai.`
);
const image = computed(() => "/images/meta-image.png");

const route = useRoute();
const url = ref('');

onMounted(() => {
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  url.value = `${baseUrl}${route.fullPath}`;
});

useSeoMeta({
  title,
  ogTitle: title,
  ogImage: image,
  twitterImage: image,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  description,
  ogDescription: description,
  twitterDescription: description,
  ogUrl: url, // Gunakan URL dinamis
});

const rankColor = ref(["first", "second", "third"]);

const awardsAndCertifications = ref([
	{
		event:
			"Maroon Day - Universitas Teknologi Digital Indonesia (d/h STMIK AKAKOM Yogyakarta)",
		award: "Web Design Competition - 3rd Place (National)",
		icon: "fa6-solid:trophy",
		year: 2024,
		rank: 3,
		date: "2024-05-25",
	},
	{
		event: "NIFC - Universitas Muhammadiyah Riau",
		award: "Web Design Competition - 5th Place (National)",
		icon: "fa6-solid:trophy",
		year: 2024,
		rank: 5,
		date: "2024-05-22",
	},
	{
		event: "Fostifest - Universitas Muhammadiyah Surakarta",
		award: "Web Design Competition - 3rd Place (National)",
		icon: "fa6-solid:trophy",
		year: 2023,
		rank: 3,
		date: "2023-10-29",
	},
	{
		event: "BSDMP Kominfo Surabaya",
		award: "Junior Web Developer Certification - Graduated (National)",
		icon: "mdi:certificate",
		year: 2023,
	},
	{
		event: "ByTesFest - Universitas Sebelas Maret",
		award: "Web Design Competition - 4th Place (National)",
		icon: "fa6-solid:trophy",
		year: 2022,
		rank: 4,
	},
	{
		event: "IntechFest - Politeknik Negeri Bali",
		award: "Web Design Competition - 1st Place (National)",
		icon: "fa6-solid:trophy",
		year: 2021,
		rank: 1,
		date: "2021-10-03",
	},
	{
		event: "Deptics - Universitas PGRI Madiun",
		award: "Web Design Competition - 1st Place (National)",
		icon: "fa6-solid:trophy",
		year: 2021,
		rank: 1,
		date: "2020-03-20",
	},
	{
		event: "ByTesFest - Universitas Sebelas Maret",
		award: "Web Design Competition - 1st Place (National)",
		icon: "fa6-solid:trophy",
		year: 2020,
		rank: 1,
	},
	{
		event: "LDP 2020 - OSIS SMA Negeri 1 Ponorogo",
		award: "Lomba Desain Poster 2020 - 3rd Place (East Java Regional)",
		icon: "fa6-solid:trophy",
		year: 2020,
		rank: 3,
	},
]);
</script>

<style lang="scss" scoped>
.first {
	color: #ffd700;
}
.second {
	color: #c0c0c0;
}
.third {
	color: #cd7f32;
}
</style>