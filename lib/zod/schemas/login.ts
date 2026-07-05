import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .pipe(z.email({ message: "Format email tidak valid" })),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  remember: z.boolean().optional(),
  token: z
    .string({
      message: "Token wajib diisi!",
    })
    .min(1, "Token wajib diisi!"),
});
