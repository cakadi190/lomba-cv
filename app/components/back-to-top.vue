<template>
  <div>
    <!-- Tombol Back to Top -->
    <button 
      type="button"
      @click="scrollToTop"
      :class="showButton ? '' : 'hidden'"
      class="btn btn-primary d-flex align-items-center gap-2 back-to-top"
    >
      <Icon name="fa6-solid:chevron-up" />
    </button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "BackToTop" });

const showButton = ref(false);

const checkScroll = () => {
  showButton.value = window.scrollY > 50;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style lang="scss">
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
  transition: all .2s;
  visibility: visible;
  
  &.hidden {
    visibility: hidden;
    bottom: 0;
    opacity: 0;
  }
}
</style>
