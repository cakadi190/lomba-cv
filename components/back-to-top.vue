<template>
  <div>
    <!-- Tombol Back to Top -->
    <button 
      v-show="showButton" 
      @click="scrollToTop" 
      class="btn btn-primary d-flex align-items-center gap-2 back-to-top"
    >
      <Icon name="fa6-solid:chevron-up" />
      <span class="d-none d-md-none d-lg-inline">
      Back to Top</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const showButton = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const checkScroll = () => {
  showButton.value = window.scrollY > 200;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'BackToTop'
})
</script>

<style>
.back-to-top {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: inline-block;
  min-height: 3rem;
  min-width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
