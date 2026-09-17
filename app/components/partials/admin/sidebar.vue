<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <header class="sidebar-header">
        <div class="sidebar-brand">
          <div class="app-icon">
            <app-icon />
          </div>
          <div class="app-logo">
            <app-brand />
          </div>
        </div>
        <button type="button" class="sidebar-toggler" @click="toggleSidebar">
          <Icon :name="isCollapsed ? 'ri:sidebar-fold-fill' : 'ri:sidebar-unfold-fill'" />
        </button>
      </header>
      <nav class="sidebar-menu">
        <div v-for="group in menuGroups" :key="group.label" class="sidebar-menu-group">
          <p class="sidebar-menu-group-label">{{ group.label }}</p>
          <nuxt-link v-for="item in group.items" :key="item.to" :to="item.to" class="sidebar-menu-item"
            active-class="active" :title="isCollapsed ? item.label : undefined" @click="closeMobileSidebar">
            <Icon :name="item.icon" />
            <span class="sidebar-menu-item-label">{{ item.label }}</span>
          </nuxt-link>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { isCollapsed, toggleSidebar, closeMobileSidebar } = useAdminSidebar();

const menuGroups = [
  {
    label: "Utama",
    items: [
      { label: "Dasbor", to: "/admin", icon: "fa6-solid:gauge" },
    ],
  },
  {
    label: "Konten",
    items: [
      { label: "Pendidikan", to: "/admin/educations", icon: "fa6-solid:graduation-cap" },
      { label: "Pekerjaan", to: "/admin/career", icon: "fa6-solid:briefcase" },
      { label: "Penghargaan", to: "/admin/achievements", icon: "fa6-solid:trophy" },
      { label: "Portfolio", to: "/admin/portfolios", icon: "fa6-solid:book" },
    ],
  },
  {
    label: "Artikel",
    items: [
      { label: "Kategori Artikel", to: "/admin/educations", icon: "fa6-solid:folder" },
      { label: "Artikel", to: "/admin/career", icon: "fa6-solid:list" },
    ],
  },
  {
    label: "Lainnya",
    items: [
      { label: "Pantau Kendaraan", to: "/admin/educations", icon: "fa6-solid:bullseye" },
      { label: "Tempat Ngopi", to: "/admin/coffee-places", icon: "fa6-solid:mug-saucer" },
      { label: "Buku Tamu", to: "/admin/guest-book", icon: "fa6-solid:bookmark" },
      { label: "Pesan Dari Formulir", to: "/admin/contact-forms", icon: "fa6-solid:envelope" },
    ],
  },
];
</script>
