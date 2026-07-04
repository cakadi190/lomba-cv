<template>
  <main id="auth-wrapper">
    <div id="container">
      <slot />
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
    z-index: 2;
    width: calc(100% * (1/4));
    margin-block: auto;
    
    @media (width <= 992px) {
      max-width: 100%;
    }
  }
}
</style>