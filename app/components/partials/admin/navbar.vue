<template>
  <nav class="panel-navbar">
    <button type="button" class="sidebar-toggler" @click="toggleSidebar">
      <Icon name="ri:sidebar-unfold-fill" />
    </button>

    <div class="panel-navbar-actions">
      <theme-toggler />

      <partials-admin-user-menu :user="user" :user-initials="userInitials" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
defineProps<{
  user?: { name?: string; email?: string } | null;
  userInitials: string;
}>();

const { toggleSidebar } = useAdminSidebar();
</script>
