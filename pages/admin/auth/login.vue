<template>
  <div class="card border-0 shadow-sm rounded-4">
    <div class="card-body p-4 p-md-5">
      <div class="text-center mb-4">
        <div class="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" style="width: 56px; height: 56px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
        </div>
        <h1 class="h4 fw-bold mb-1">Selamat Datang</h1>
        <p class="text-muted small mb-0">Silakan masuk ke panel admin CV</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div v-if="errorMsg" class="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 mb-3 border-0 small rounded-3" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          <span class="fw-medium text-break">{{ errorMsg }}</span>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label small fw-semibold text-secondary mb-1">Alamat Email</label>
          <div class="input-group custom-input-group">
            <span class="input-group-text bg-body-tertiary text-secondary border-end-0" id="email-addon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
            <input 
              id="email" 
              type="email" 
              v-model="email" 
              class="form-control border-start-0 bg-body-tertiary ps-0"
              placeholder="admin@example.com" 
              aria-describedby="email-addon"
              required 
              :disabled="loading"
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="form-label small fw-semibold text-secondary mb-1">Kata Sandi</label>
          <div class="input-group custom-input-group">
            <span class="input-group-text bg-body-tertiary text-secondary border-end-0" id="password-addon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <input 
              id="password" 
              type="password" 
              v-model="password" 
              class="form-control border-start-0 bg-body-tertiary ps-0"
              placeholder="••••••••" 
              aria-describedby="password-addon"
              required 
              :disabled="loading"
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span>{{ loading ? 'Memproses...' : 'Masuk Sekarang' }}</span>
        </button>
      </form>
    </div>
  </div>
  
  <div class="text-center mt-4">
    <NuxtLink to="/" class="text-decoration-none small text-secondary d-inline-flex align-items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Kembali ke Beranda
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

definePageMeta({
  layout: 'auth',
});

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  errorMsg.value = "";
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    // Redirect to admin dashboard
    navigateTo("/admin");
  } catch (err) {
    const fetchError = err as { data?: { statusMessage?: string } };
    if (fetchError.data?.statusMessage) {
      errorMsg.value = fetchError.data.statusMessage;
    } else {
      errorMsg.value = "Kredensial salah atau terjadi gangguan server.";
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.custom-input-group .form-control:focus {
  box-shadow: none;
  border-color: var(--bs-border-color);
}
.custom-input-group:focus-within {
  border-radius: var(--bs-border-radius);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.15);
}
.custom-input-group:focus-within .input-group-text,
.custom-input-group:focus-within .form-control {
  border-color: var(--bs-primary);
}
</style>