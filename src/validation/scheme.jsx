import z from "zod";

export const registerScheme = z.object({
  username: z
    .string()
    .min(3, "Minimum 3 karakter girmelisiniz.")
    .max(15, "Maksimum 15 karakter girmelisiniz."),
  displayName: z
    .string()
    .min(3, "Minimum 3 karakter girmelisiniz.")
    .max(25, "Maksimum 25 karakter girmelisiniz."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  password: z.string().min(6, "Minimum 6 karakter girmelisiniz."),
});

export const loginScheme = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  password: z.string().min(6, "Minimum 6 karakter girmelisiniz."),
});
