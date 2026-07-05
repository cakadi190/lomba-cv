<script setup lang="ts">
import { route } from '~~/lib/route';
</script>

<template>
  <main id="auth-wrapper">
    <div id="container">
      <app-brand link-class="offcanvas-title" 
          :to="route('home')" height="48" />
      <div class="card p-4 rounded-4 card-body w-100">
        <slot />
      </div>
      <div class="mx-auto d-flex flex-column justify-content-center pt-2">
        <div class="mb-2 text-center">&copy; 2024 Catatan Cak Adi</div>
        <div class="mx-auto">
          <theme-toggler />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
#auth-wrapper {
  height: 100svh;
  width: 100svw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background-image: radial-gradient(circle, rgba(var(--bs-body-color-rgb), .1) 2px, transparent 2px);
    background-size: 3rem 3rem;
    background-position: 0 0, 1rem 1rem;
  }

  #container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    z-index: 2;
    width: calc(100% * (1/4));
    margin-block: auto;
    
    @media (width <= 992px) {
      max-width: 100%;
    }
  }
}
</style>