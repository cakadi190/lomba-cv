<template>
  <div class="dropdown user-menu">
    <button type="button" class="user-menu-toggle" id="user-menu-toggle" data-bs-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false">
      <span class="user-avatar">{{ userInitials }}</span>
      <span class="user-menu-info">
        <span class="user-menu-name">{{ user?.name }}</span>
        <span class="user-menu-email">{{ user?.email }}</span>
      </span>
      <Icon name="ri:arrow-down-s-line" class="user-menu-caret" />
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="user-menu-toggle">
      <li>
        <nuxt-link to="/forgot-password" class="dropdown-item d-flex align-items-center gap-2">
          <Icon name="fa6-solid:lock" />
          <span>Ganti Password</span>
        </nuxt-link>
      </li>
      <li>
        <partials-auth-logout as="button" class="dropdown-item d-flex align-items-center gap-2 text-danger">
          <Icon name="fa6-solid:arrow-right-from-bracket" />
          <span>Logout</span>
        </partials-auth-logout>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  user?: { name?: string; email?: string } | null;
  userInitials: string;
}>();
</script>
