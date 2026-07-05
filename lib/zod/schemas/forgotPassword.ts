import z from "zod";

export const forgotPasswordRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .pipe(z.email({ message: "Format email tidak valid" })),
  token: z
    .string({
      message: "Token verifikasi wajib diisi!",
    })
    .min(1, "Token verifikasi wajib diisi!"),
});

export const forgotPasswordChangeSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .pipe(z.email({ message: "Format email tidak valid" })),
    token: z.string().min(1, "Token reset tidak valid!"),
    password: z.string().min(6, "Kata sandi minimal 6 karakter"),
    password_confirmation: z
      .string()
      .min(1, "Konfirmasi kata sandi wajib diisi"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["password_confirmation"],
  });
