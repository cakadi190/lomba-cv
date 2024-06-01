<template>
	<section class="need-space pt-0">
		<div class="container">
			<div class="row flex-lg-row flex-column-reverse">
				<div class="col-md-8">
					<contact-details />
					<form-contact />
				</div>

				<div class="col-md-4">
					<div class="card sticky-top rounded-4">
						<div class="card-header p-4">
							<h4 class="mb-0">Navigasi</h4>
						</div>
						<div class="card-body">
							<ul
								class="nav nav-pills flex-column align-items-stretch"
								id="myTab"
								role="tablist"
							>
								<li class="nav-item" role="presentation">
									<a href="#information" class="nav-link py-3 w-100 text-start">
										Informasi Kontak
									</a>
								</li>
								<li class="nav-item" role="presentation">
									<a href="#socmed" class="nav-link py-3 w-100 text-start">
										Sosial Media
									</a>
								</li>
								<li class="nav-item" role="presentation">
									<a href="#form-contact" class="nav-link py-3 w-100 text-start">
										Formulir Kontak
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import contactDetails from "./contact-details.vue";
import formContact from "./form.vue";
</script>

<script lang="ts">
export default defineComponent({
	name: "ContactMeComponent",
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