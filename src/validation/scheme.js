import z from "zod";

export const signUpScheme = z.object({
  username: z.string().min(3, "Kullanıcı adı minimum 3 karakter olmalıdır."),
  email: z.string().email(),
  password: z.string().min(6, "Parola minimum 6 karakter olmalıdır."),
});

export const signInScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Parola minimum 6 karakter olmalıdır."),
});

export const forgotScheme = z.object({
  email: z.string().email(),
});
