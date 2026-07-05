import { type Ref, ref } from "vue";
import { z } from "zod";
import { route } from "~~/lib/route";

interface ValidationErrors {
  [field: string]: string | string[];
}

interface RequestError {
  message: string;
  code?: string | number;
  status?: number;
}

interface AuthLoginInterface {
  processing: Ref<boolean>;
  errors: Ref<ValidationErrors>;
  error: Ref<RequestError | null>;
  success: Ref<boolean>;
  post: (payload: Record<string, unknown>) => Promise<unknown>;
  reset: () => void;
}

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .pipe(z.email({ message: "Format email tidak valid" })),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  remember: z.boolean().optional(),
  token: z.string().refine(async (value) => {
    if (!value || value.length < 1) {
      return "Token wajib diisi!";
    }

    return await verifyTurnstileToken(value);
  }),
});

export function useLogin(): AuthLoginInterface {
  const processing = ref(false);
  const errors = ref<ValidationErrors>({});
  const error = ref<RequestError | null>(null);
  const success = ref(false);

  const reset = () => {
    processing.value = false;
    errors.value = {};
    error.value = null;
    success.value = false;
  };

  const post = async (payload: Record<string, unknown>) => {
    processing.value = true;
    error.value = null;
    errors.value = {};
    success.value = false;

    // Frontend validation using Zod
    const validationResult = loginSchema.safeParse(payload);
    if (!validationResult.success) {
      processing.value = false;
      const formattedErrors: ValidationErrors = {};
      for (const issue of validationResult.error.issues) {
        const path = issue.path[0] as string;
        if (!formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      }
      errors.value = formattedErrors;
      error.value = {
        message: "Validasi gagal. Silakan periksa input Anda.",
        status: 400,
      };
      throw new Error("Validation Error");
    }

    try {
      const response = await $fetch(route("api.auth.login"), {
        method: "POST",
        body: payload,
      });
      success.value = true;
      return response;
    } catch (err: unknown) {
      const fetchError = err as {
        status?: number;
        statusCode?: number;
        message?: string;
        data?: { statusMessage?: string; errors?: ValidationErrors };
      };
      const statusCode = fetchError.status || fetchError.statusCode || 500;
      let statusMessage = "";

      if (statusCode === 401) {
        statusMessage = fetchError.data?.statusMessage || "Kredensial salah.";
      } else if (statusCode === 400) {
        statusMessage =
          fetchError.data?.statusMessage ||
          "Validasi gagal. Silakan periksa input Anda.";
      } else {
        statusMessage = "Terjadi gangguan server.";
      }

      error.value = {
        message: statusMessage,
        status: statusCode,
      };

      if (fetchError.data?.errors) {
        errors.value = fetchError.data.errors;
      }
      throw err;
    } finally {
      processing.value = false;
    }
  };

  return {
    processing,
    errors,
    error,
    success,
    post,
    reset,
  };
}

export default useLogin;
