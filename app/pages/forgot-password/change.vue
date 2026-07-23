<template>
  <div>
    <div class="pb-3">
      <h1 class="mb-0 h3">Atur Ulang Kata Sandi</h1>
      <p class="text-muted mb-0" v-if="isValidating">Memverifikasi tautan Anda...</p>
      <p class="text-muted mb-0" v-else-if="user">Hai <strong>{{ user.name }}</strong>, silakan masukkan kata sandi baru Anda</p>
      <p class="text-muted mb-0" v-else>Tautan tidak valid atau kedaluwarsa</p>
    </div>

    <div>
      <div v-if="isValidating" class="text-center py-4">
        <span class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </span>
      </div>

      <div v-else>
        <!-- Error Alert -->
        <div v-if="error" class="alert alert-danger mb-3 py-2 px-3 small" role="alert">
          {{ error.message }}
        </div>

        <!-- Success Alert -->
        <div v-if="success" class="alert alert-success mb-3 py-2 px-3 small" role="alert">
          Kata sandi Anda telah berhasil diubah. Silakan masuk menggunakan kata sandi baru Anda.
        </div>

        <!-- Password Change Form -->
        <form v-if="user && !success" @submit.prevent="handleChangePassword" novalidate>
          <div class="mb-3 form-group">
            <label for="password">Kata Sandi Baru</label>
            <div class="input-group">
              <span class="input-group-text" id="password-addon">
                <Icon name="heroicons-outline:lock-closed" class="w-3 h-3" />
              </span>
              <input id="password" type="password" v-model="password" class="form-control"
                :class="{ 'is-invalid': errors.password }" placeholder="Kata sandi baru (minimal 6 karakter)"
                aria-describedby="password-addon" autocomplete="new-password" required :disabled="loading" />
            </div>
            <error-validation name="password" />
          </div>

          <div class="mb-3 form-group">
            <label for="password_confirmation">Konfirmasi Kata Sandi Baru</label>
            <div class="input-group">
              <span class="input-group-text" id="password-confirm-addon">
                <Icon name="heroicons-outline:lock-closed" class="w-3 h-3" />
              </span>
              <input id="password_confirmation" type="password" v-model="passwordConfirmation" class="form-control"
                :class="{ 'is-invalid': errors.password_confirmation }" placeholder="Ulangi kata sandi baru"
                aria-describedby="password-confirm-addon" autocomplete="new-password" required :disabled="loading" />
            </div>
            <error-validation name="password_confirmation" />
          </div>

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-lg btn-primary" :disabled="loading">
              <span v-if="!loading">Simpan Kata Sandi</span>
              <span v-if="loading" class="spinner-border" role="status" aria-hidden="true">
                <span class="visually-hidden">Loading...</span>
              </span>
            </button>
          </div>
        </form>

        <!-- Navigation Buttons -->
        <div class="d-grid gap-2 mt-3">
          <nuxt-link v-if="success || !user" :to="route('auth.login')" class="btn btn-lg btn-primary">
            Kembali ke Login
          </nuxt-link>
          <nuxt-link v-if="!user && !isValidating" :to="route('auth.forgot-password')" class="btn btn-outline-primary">
            Minta Tautan Baru
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, provide } from "vue";
import { useRoute } from "vue-router";
import { forgotPasswordChangeSchema } from "~~/lib/zod/schemas/forgotPassword";
import { route } from "~~/lib/route";
import { usePageSeo } from "~~/lib/seo";

usePageSeo({
  title: "Atur Ulang Kata Sandi",
  description: "Ubah kata sandi akun Anda",
  noindex: true,
  nofollow: true,
});

const routeInstance = useRoute();
const emailParam = routeInstance.query.email as string | undefined;
const tokenParam = routeInstance.query.token as string | undefined;

const isValidating = ref(true);
const user = ref<{ name: string; email: string } | null>(null);

const password = ref("");
const passwordConfirmation = ref("");
const loading = ref(false);
const success = ref(false);
const error = ref<{ message: string; status?: number } | null>(null);
const errors = ref<Record<string, string>>({});

provide("errors", errors);

onMounted(async () => {
  if (!emailParam || !tokenParam) {
    isValidating.value = false;
    error.value = {
      message: "Tautan atur ulang kata sandi tidak lengkap atau tidak valid.",
    };
    return;
  }

  try {
    const response = await $fetch<{ user: { name: string; email: string } }>(
      route("api.forgot-password.user-info", { email: emailParam, token: tokenParam })
    );
    user.value = response.user;
  } catch (err: any) {
    error.value = {
      message: err.data?.statusMessage || "Tautan atur ulang kata sandi tidak valid atau telah kedaluwarsa.",
      status: err.status || err.statusCode,
    };
  } finally {
    isValidating.value = false;
  }
});

async function handleChangePassword() {
  if (!emailParam || !tokenParam) return;

  loading.value = true;
  error.value = null;
  errors.value = {};
  success.value = false;

  const payload = {
    email: emailParam,
    token: tokenParam,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
  };

  // Client-side validation using Zod
  const validationResult = forgotPasswordChangeSchema.safeParse(payload);
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
    await $fetch(route("api.forgot-password.change"), {
      method: "POST",
      body: payload,
    });
    success.value = true;
    password.value = "";
    passwordConfirmation.value = "";
  } catch (err: any) {
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
