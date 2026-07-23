<template>
  <div>
    <div class="pb-3">
      <h1 class="mb-0 h3">Lupa Kata Sandi</h1>
      <p class="text-muted mb-0">Masukkan email Anda untuk menerima tautan atur ulang kata sandi</p>
    </div>
    <div>
      <form @submit.prevent="handleRequest" novalidate>
        <div v-if="success" class="alert alert-success mb-3 py-2 px-3 small" role="alert">
          Instruksi atur ulang kata sandi telah dikirim ke email Anda. Silakan periksa kotak masuk/spam Anda.
        </div>

        <div v-if="error" class="alert alert-danger mb-3 py-2 px-3 small" role="alert">
          {{ error.message }}
        </div>

        <div v-if="!success" class="mb-3 form-group">
          <label for="email">Email</label>
          <div class="input-group">
            <span class="input-group-text" id="email-addon">
              <Icon name="heroicons-outline:mail" class="w-3 h-3" />
            </span>
            <input id="email" type="email" v-model="email" class="form-control" :class="{ 'is-invalid': errors.email }"
              placeholder="admin@example.com" aria-describedby="email-addon" autocomplete="email" required
              :disabled="loading" />
          </div>
          <error-validation name="email" />
        </div>

        <div v-if="!success"
          class="mb-3 gap-3 d-flex flex-column justify-content-center align-items-center px-3 py-2 rounded border bg-body-tertiary"
          :class="{ 'border-danger': errors.token }">
          <strong class="d-flex me-auto">Verifikasi Anti-Bot</strong>
          <client-only>
            <NuxtTurnstile ref="turnstile" v-model="token" />
          </client-only>
          <error-validation name="token" class="text-center" />
        </div>

        <div class="d-grid gap-2">
          <button v-if="!success" type="submit" class="btn btn-lg btn-primary" :disabled="loading">
            <span v-if="!loading">Kirim Link Reset</span>
            <span v-if="loading" class="spinner-border" role="status" aria-hidden="true">
              <span class="visually-hidden">Loading...</span>
            </span>
          </button>
          <nuxt-link :to="route('auth.login')" class="btn btn-outline-primary"
            :class="{ 'disabled': loading }">Kembali ke Login</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from "vue";
import { forgotPasswordRequestSchema } from "~~/lib/zod/schemas/forgotPassword";
import { route } from "~~/lib/route";
import { usePageSeo } from "~~/lib/seo";

usePageSeo({
  title: "Lupa Kata Sandi",
  description: "Minta tautan untuk mengatur ulang kata sandi",
  noindex: true,
  nofollow: true,
});

const email = ref("");
const token = ref<string | null>(null);
const loading = ref(false);
const success = ref(false);
const error = ref<{ message: string; status?: number } | null>(null);
const errors = ref<Record<string, string>>({});
const turnstile = ref();

provide("errors", errors);

async function handleRequest() {
  loading.value = true;
  error.value = null;
  errors.value = {};
  success.value = false;

  const payload = {
    email: email.value,
    token: token.value,
  };

  // Client-side validation using Zod
  const validationResult = forgotPasswordRequestSchema.safeParse(payload);
  if (!validationResult.success) {
    loading.value = false;
    const formattedErrors: Record<string, string> = {};
    for (const issue of validationResult.error.issues) {
      const path = issue.path[0] as string;
      if (!formattedErrors[path]) {
        formattedErrors[path] = issue.message;
      }
    }
    errors.value = formattedErrors;
    error.value = {
      message: "Validasi gagal. Silakan periksa input Anda.",
    };
    return;
  }

  try {
    await $fetch(route("api.forgot-password.request"), {
      method: "POST",
      body: payload,
    });
    success.value = true;
    email.value = "";
    token.value = null;
  } catch (err: any) {
    // Reset Turnstile token on error
    turnstile.value?.reset();
    token.value = null;

    const statusCode = err.status || err.statusCode || 500;
    let statusMessage = "Terjadi gangguan server.";

    if (statusCode === 422 || statusCode === 400) {
      statusMessage = err.data?.statusMessage || "Validasi gagal. Silakan periksa input Anda.";
    }

    error.value = {
      message: statusMessage,
      status: statusCode,
    };

    if (err.data?.errors) {
      errors.value = err.data.errors;
    }
  } finally {
    loading.value = false;
  }
}
</script>
