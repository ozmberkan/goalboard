import z from "zod";

//Kayıt
export const signUpScheme = z.object({
  username: z.string().min(3, "Kullanıcı adı minimum 3 karakter olmalıdır."),
  email: z.string().email(),
  password: z.string().min(6, "Parola minimum 6 karakter olmalıdır."),
});

//Giriş
export const signInScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Parola minimum 6 karakter olmalıdır."),
});

//Şifremi Unttum
export const forgotScheme = z.object({
  email: z.string().email(),
});

//İletişim
export const contactScheme = z.object({
  name: z.string().min(3, "Adınız minimum 3 karakter olmalıdır."),
  message: z.string().min(10, "Mesajınız minimum 10 karakter olmalıdır."),
});
