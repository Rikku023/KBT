import { z } from "zod";

export const RegisterInputSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nama minimal harus 2 karakter." })
    .max(50, { message: "Nama maksimal 50 karakter." }),
  email: z
    .string()
    .email({ message: "Format email tidak valid." }),
  password: z
    .string()
    .min(6, { message: "Password minimal harus 6 karakter." })
    .max(100, { message: "Password maksimal 100 karakter." }),
});

export type RegisterInput = z.infer<typeof RegisterInputSchema>;

export const LoginInputSchema = z.object({
  email: z
    .string()
    .email({ message: "Format email tidak valid." }),
  password: z
    .string()
    .min(1, { message: "Password wajib diisi." }),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;
