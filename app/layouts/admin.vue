<template>
  <div v-if="user">
    <div class="panel-wrapper" :class="{ 'sidebar-collapsed': isCollapsed, 'sidebar-open': isMobileOpen }">
      <button type="button" class="sidebar-backdrop" aria-label="Tutup sidebar" @click="closeMobileSidebar"></button>

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
              <Icon :name="isCollapsed ? 'ri:sidebar-unfold-fill' : 'ri:sidebar-fold-fill'" />
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

      <main class="panel-content">
        <nav class="panel-navbar">
          <button type="button" class="sidebar-toggler" @click="toggleSidebar">
            <Icon name="ri:sidebar-fold-fill" />
          </button>
        </nav>

        <div class="panel-body">
          <slot></slot>
        </div>

        <div class="panel-footer"></div>
      </main>
    </div>
  </div>
  <div v-else-if="error && error.status !== 401" class="container need-space text-center">
    <error-section :img-src="apiError.imgSrc" img-alt="Terjadi Kesalahan" img-height="250" :title="apiError.title"
      :text="apiError.text" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

// Menu sidebar
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
      { label: "Pesan Dari Formulir", to: "/admin/contact-forms", icon: "fa6-solid:envelope" },
    ],
  },
];

// State sidebar (collapse desktop & toggle mobile)
const isCollapsed = useCookie<boolean>("admin-sidebar-collapsed", { default: () => false });
const isMobileOpen = ref(false);

function toggleSidebar() {
  if (import.meta.client && window.innerWidth < 992) {
    isMobileOpen.value = !isMobileOpen.value;
    return;
  }

  isCollapsed.value = !isCollapsed.value;
}

function closeMobileSidebar() {
  isMobileOpen.value = false;
}

// Profil pengguna yang sedang login
const { profileFetch } = useAuth();
const { data: profileRes, error } = profileFetch;
const user = computed(() => profileRes.value?.data);
const apiError = computed(() => useApiErrorMessage(error.value?.statusCode));
</script>

<style lang="scss">
.panel-wrapper {
  --panel-sidebar-width: 320px;
  --panel-sidebar-collapsed-width: 96px;

  background: #fdfdfd;
  display: flex;
  min-height: 100svh;
  position: relative;

  [data-bs-theme=dark] & {
    background: #010111;
  }

  .sidebar-backdrop {
    display: none;
  }

  .sidebar-toggler {
    padding: 0;
    border: 1px solid var(--bs-border-color);
    background-color: var(--bs-light);
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    border-radius: var(--bs-border-radius);
    flex-shrink: 0;
  }

  aside.sidebar {
    --panel-sidebar-margin: 1rem;
    --panel-sidebar-border-radius: 1rem;

    height: 100svh;
    width: var(--panel-sidebar-width);
    flex-shrink: 0;
    transition: width .2s ease;

    .sidebar-inner {
      border: 1px solid var(--bs-border-color);
      margin: var(--panel-sidebar-margin);
      display: flex;
      flex-direction: column;
      background: var(--bs-body-bg);
      border-radius: var(--panel-sidebar-margin);
      min-height: calc(100svh - (var(--panel-sidebar-margin) * 2));
      overflow: hidden;
      overflow-y: auto;

      .sidebar-header {
        min-height: 72px;
        padding: 1rem;
        display: flex;
        gap: .5rem;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: .5rem;
          min-width: 0;

          .app-logo {
            display: block;
          }

          .app-icon {
            display: none;
            align-items: center;
            justify-content: center;
          }

          >a {
            flex-shrink: 0;
            display: inline-flex;
          }
        }
      }

      .sidebar-menu {
        padding: 1rem;
        padding-top: 0;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        flex: 1;

        .sidebar-menu-group {
          display: flex;
          flex-direction: column;
          gap: .25rem;

          .sidebar-menu-group-label {
            margin: 0 0 .25rem;
            padding: 0 .75rem;
            font-size: .7rem;
            font-weight: 600;
            letter-spacing: .05em;
            text-transform: uppercase;
            color: var(--bs-secondary-color);
            opacity: .6;
          }
        }

        .sidebar-menu-item {
          display: flex;
          align-items: center;
          gap: .75rem;
          padding: .625rem .75rem;
          border-radius: .5rem;
          color: var(--bs-body-color);
          font-size: .9rem;
          font-weight: 500;
          text-decoration: none;
          opacity: .7;
          transition: background-color .15s ease, opacity .15s ease;

          .iconify {
            font-size: 1rem;
            min-width: 1.25rem;
            flex-shrink: 0;
          }

          .sidebar-menu-item-label {
            white-space: nowrap;
            overflow: hidden;
            width: auto;
            opacity: 1;
            transition: opacity .15s ease, width .2s ease;
          }

          &:hover {
            background: var(--bs-tertiary-bg);
            opacity: 1;
          }

          &.active {
            background: var(--bs-primary-bg-subtle, rgba(var(--bs-primary-rgb), .05));
            color: var(--bs-primary);
            opacity: 1;
          }

          &:focus {
            background: var(--bs-primary);
            color: var(--bs-white);
            opacity: 1;
          }
        }
      }
    }
  }

  .panel-content {
    --panel-content-margin: 1rem;

    flex: 1;
    margin: var(--panel-content-margin) var(--panel-content-margin) var(--panel-content-margin) 0;
    height: calc(100svh - (var(--panel-content-margin)*2));
    background: var(--bs-body-bg);
    border: 1px solid var(--bs-border-color);
    border-radius: var(--panel-content-margin);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .panel-body {
      flex: 1;
      overflow: hidden;
      overflow-y: auto;
      border-top: 1px solid var(--bs-border-color);
      border-bottom: 1px solid var(--bs-border-color);
    }

    .panel-footer,
    .panel-navbar,
    .panel-body {
      padding: 1rem;
    }

    .panel-navbar {
      min-height: 72px;
      display: flex;
      align-items: center;

      .sidebar-toggler {
        display: none;
      }
    }
  }

  // Desktop: fold/unfold sidebar
  &.sidebar-collapsed {
    aside.sidebar {
      width: var(--panel-sidebar-collapsed-width);

      .sidebar-header {
        padding: .75rem .5rem;
        justify-content: center;

        .sidebar-brand {
          width: 100%;
          justify-content: center;

          .app-logo {
            display: none;
          }

          .app-icon {
            display: flex;
          }
        }

        .sidebar-toggler {
          display: none;
        }
      }

      .sidebar-menu {
        padding: .5rem;
      }

      .sidebar-menu-group-label {
        display: none;
      }

      .sidebar-menu-item {
        justify-content: center;
        gap: 0;
        padding: .625rem 0;

        .iconify {
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-menu-item-label {
          width: 0;
          opacity: 0;
        }
      }
    }

    .panel-navbar .sidebar-toggler {
      display: flex;
    }
  }

  @media (max-width: 991.98px) {
    aside.sidebar {
      position: fixed;
      inset: 0 auto 0 0;
      z-index: 1050;
      transform: translateX(-100%);
      transition: transform .25s ease;
    }

    .panel-content {
      margin-left: 1rem;
    }

    .panel-navbar .sidebar-toggler {
      display: flex;
    }

    &.sidebar-collapsed aside.sidebar {
      width: var(--panel-sidebar-width);

      .sidebar-inner {
        margin: 1rem;
        min-height: calc(100svh - 2rem);
      }

      .sidebar-header {
        padding: 1rem;
        justify-content: space-between;

        .sidebar-toggler {
          display: flex;
        }
      }

      .sidebar-menu {
        padding: 1rem;
        padding-top: 0;
      }

      .sidebar-menu-group-label {
        display: block;
      }

      .sidebar-menu-item {
        justify-content: flex-start;
        gap: .75rem;
        padding: .625rem .75rem;

        .sidebar-menu-item-label {
          display: block;
          width: auto;
          opacity: 1;
        }
      }
    }

    &.sidebar-open {
      aside.sidebar {
        transform: translateX(0);
      }

      .sidebar-backdrop {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 1040;
        border: 0;
        padding: 0;
        background: rgba(0, 0, 0, .5);
        backdrop-filter: blur(2px);
      }
    }
  }
}
</style>