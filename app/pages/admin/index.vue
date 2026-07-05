<template>
  <div class="admin-wrapper" v-if="user">
    <div class="background-glow top-left"></div>
    <div class="background-glow bottom-right"></div>

    <div class="admin-container">
      <!-- Navbar / Header -->
      <header class="admin-header">
        <div class="header-brand">
          <div class="brand-logo">AD</div>
          <div class="brand-text">
            <h2>Admin Panel</h2>
            <p>Sistem Management CV</p>
          </div>
        </div>
        <button type="button" @click="handleLogout" class="logout-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><title>Keluar</title><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Keluar
        </button>
      </header>

      <!-- Dashboard Layout -->
      <main class="admin-main">
        <!-- Welcome Card -->
        <section class="welcome-card">
          <div class="welcome-content">
            <h1>Selamat Datang Kembali, {{ user.name }}!</h1>
            <p>Anda masuk sebagai <strong>{{ user.email }}</strong>. Di panel ini Anda dapat mengelola portofolio, riwayat pendidikan, organisasi, dan riwayat karir Anda secara real-time.</p>
          </div>
          <div class="user-badge">
            <div class="avatar-large">{{ user.name.charAt(0).toUpperCase() }}</div>
          </div>
        </section>

        <!-- Stats Grid -->
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><title>Pendidikan</title><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
            </div>
            <div class="stat-info">
              <h3>Pendidikan</h3>
              <p class="stat-desc">Normalisasi model tabel <strong>Education</strong> berhasil dikonfigurasi.</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><title>Portofolio</title><path d="M2 17 12 22 22 17"/><path d="M2 12 12 17 22 12"/><path d="m12 2 10 5-10 5-10-5Z"/></svg>
            </div>
            <div class="stat-info">
              <h3>Portofolio</h3>
              <p class="stat-desc">Normalisasi model tabel <strong>Portfolio</strong> berhasil dikonfigurasi.</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon green">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><title>Sistem Auth</title><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
            </div>
            <div class="stat-info">
              <h3>Sistem Auth</h3>
              <p class="stat-desc">Database user dan endpoint login <strong>aktif & aman</strong>.</p>
            </div>
          </div>
        </section>

        <!-- Informational box -->
        <section class="info-section">
          <h2>Database Mapping Information</h2>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nama Model Baru</th>
                  <th>Database Table Map</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>User</code></td>
                  <td><code>users</code></td>
                  <td><span class="badge active">Aktif</span></td>
                </tr>
                <tr>
                  <td><code>Education</code></td>
                  <td><code>educations</code></td>
                  <td><span class="badge active">Aktif</span></td>
                </tr>
                <tr>
                  <td><code>Portfolio</code></td>
                  <td><code>portfolios</code></td>
                  <td><span class="badge active">Aktif</span></td>
                </tr>
                <tr>
                  <td><code>Career</code></td>
                  <td><code>careers</code></td>
                  <td><span class="badge active">Aktif</span></td>
                </tr>
                <tr>
                  <td><code>Organization</code></td>
                  <td><code>organizations</code></td>
                  <td><span class="badge active">Aktif</span></td>
                </tr>
                <tr>
                  <td><code>Award</code></td>
                  <td><code>awards</code></td>
                  <td><span class="badge active">Aktif</span></td>
                </tr>
                <tr>
                  <td><code>CoffeePlace</code></td>
                  <td><code>coffee_places</code></td>
                  <td><span class="badge active">Aktif</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watchEffect } from "vue";
import { route } from "~~/lib/route";

definePageMeta({
  layout: false,
});

const { profileFetch, logout } = useAuth();
const { data: profileRes, error } = await profileFetch;
const user = computed(() => profileRes.value?.data);

watchEffect(() => {
  if (error.value || (profileRes.value && !profileRes.value.data)) {
    navigateTo(route("admin.auth.login"));
  }
});

async function handleLogout() {
  try {
    await logout();
    navigateTo(route("admin.auth.login"));
  } catch (err) {
    console.error("Gagal logout:", err);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.admin-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #0b0f19;
  overflow-x: hidden;
  color: #f3f4f6;
  padding: 40px 20px;
}

/* Background glows */
.background-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(150px);
  opacity: 0.12;
  z-index: 1;
  pointer-events: none;
}
.background-glow.top-left {
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  top: -10%;
  left: -10%;
}
.background-glow.bottom-right {
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  bottom: -10%;
  right: -10%;
}

.admin-container {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Header */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px;
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-logo {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: #ffffff;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.25);
}

.brand-text h2 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.brand-text p {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  color: #f87171;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-1px);
}

.logout-btn:active {
  transform: translateY(0);
}

/* Main Content */
.admin-main {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Welcome Card */
.welcome-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.7) 0%, rgba(17, 24, 39, 0.7) 100%);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  gap: 24px;
}

.welcome-content h1 {
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

.welcome-content p {
  font-size: 15px;
  color: #9ca3af;
  line-height: 1.6;
  margin: 0;
}

.welcome-content strong {
  color: #ffffff;
}

.user-badge {
  flex-shrink: 0;
}

.avatar-large {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
}

/* Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.stat-card {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 24px;
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: transform 0.2s, border-color 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.1);
}

.stat-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stat-icon.purple {
  background: rgba(139, 92, 246, 0.1);
  color: #a78bfa;
}

.stat-icon.blue {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
}

.stat-icon.green {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
}

.stat-info h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 6px 0;
}

.stat-desc {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.4;
}

/* Info section table */
.info-section {
  padding: 32px;
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
}

.info-section h2 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 20px 0;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

td {
  padding: 16px;
  font-size: 14px;
  color: #d1d5db;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

code {
  font-family: monospace;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 6px;
  color: #60a5fa;
  font-size: 13px;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge.active {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

@media (max-width: 640px) {
  .welcome-card {
    flex-direction: column-reverse;
    align-items: flex-start;
    padding: 24px;
  }
  .avatar-large {
    width: 56px;
    height: 56px;
    font-size: 24px;
  }
}
</style>
