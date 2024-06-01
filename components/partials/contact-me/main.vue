<template>
	<section class="need-space pt-0">
		<div class="container">
			<div class="row">
        <div class="col-md-8">
          <contact-details />
          <form-contact />
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


<style>
</style>