<template>
  <div>
    <div class="pb-3">
      <h1 class="mb-0 h3">Selamat Datang</h1>
      <p class="text-muted mb-0">Silakan masuk ke panel admin</p>
    </div>
    <div>
      <form @submit.prevent="handleLogin" novalidate>
        <div v-if="error" class="alert alert-danger mb-3 py-2 px-3 small" role="alert">
          {{ error.message }}
        </div>

        <div class="mb-3 form-group">
          <label for="email">Email</label>
          <div class="input-group">
            <span class="input-group-text" id="email-addon">
              <Icon name="heroicons-outline:mail" class="w-3 h-3" />
            </span>
            <input id="email" type="email" v-model="email" class="form-control" :class="{ 'is-invalid': errors.email }"
              placeholder="admin@example.com" aria-describedby="email-addon" autocomplete="username" required
              :disabled="loading" />
          </div>
          <span v-if="errors.email" class="invalid-feedback d-block" role="alert">
            <strong>{{ Array.isArray(errors.email) ? errors.email[0] : errors.email }}</strong>
          </span>
        </div>

        <div class="mb-3 form-group">
          <label for="password">Kata Sandi</label>
          <div class="input-group">
            <span class="input-group-text" id="password-addon">
              <Icon name="heroicons-outline:lock-closed" class="w-3 h-3" />
            </span>
            <input id="password" type="password" v-model="password" class="form-control"
              :class="{ 'is-invalid': errors.password }" placeholder="Kata Sandi Anda" aria-describedby="password-addon"
              autocomplete="current-password" required :disabled="loading" />
          </div>
          <span v-if="errors.password" class="invalid-feedback d-block" role="alert">
            <strong>{{ Array.isArray(errors.password) ? errors.password[0] : errors.password }}</strong>
          </span>
        </div>

        <div class="mb-3 form-check">
          <input id="remember" type="checkbox" v-model="remember" class="form-check-input" :class="{ 'is-invalid': errors.remember }" :disabled="loading" />
          <label class="form-check-label ms-1" for="remember">Ingat Saya</label>
          <span v-if="errors.remember" class="invalid-feedback d-block" role="alert">
            <strong>{{ Array.isArray(errors.remember) ? errors.remember[0] : errors.remember }}</strong>
          </span>
        </div>

        <div
          class="mb-3 gap-3 d-flex flex-column justify-content-center align-items-center px-3 py-2 rounded border bg-body-tertiary"
          :class="{ 'border-danger': errors.token }">
          <strong class="d-flex me-auto">Verifikasi Anti-Bot</strong>
          <client-only>
            <NuxtTurnstile v-model="token" />
          </client-only>
          <span v-if="errors.token" class="invalid-feedback d-block text-center" role="alert">
            <strong>{{ Array.isArray(errors.token) ? errors.token[0] : errors.token }}</strong>
          </span>
        </div>

        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-lg btn-primary" :disabled="loading">
            <span v-if="!loading">Masuk</span>
            <span v-if="loading" class="spinner-border" role="status" aria-hidden="true">
              <span class="visually-hidden">Loading...</span>
            </span>
          </button>
          <nuxt-link :to="route('home')" class="btn btn-outline-primary"
            :class="{ 'disabled': loading }">Kembali</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useLogin } from "~/composables/auth/useLogin";
import { route } from "~~/lib/route";
import { usePageSeo } from "~~/lib/seo";

usePageSeo({
  title: "Masuk",
  description: "Masuk ke panel admin",
});

const email = ref("");
const password = ref("");
const remember = ref(false);
const token = ref<string | null>(null);

console.log({ email, password, remember, token })

const { processing: loading, error, errors, post } = useLogin();

async function handleLogin() {
  try {
    await post({
      email: email.value,
      password: password.value,
      remember: remember.value,
      token: token.value
    });

    // Redirect to admin dashboard
    navigateTo(route("admin.index"));
  } catch (err) {
    // Error is handled reactively by the composable
  }
}
</script>