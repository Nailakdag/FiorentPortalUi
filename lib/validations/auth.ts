import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email({ message: "Geçersiz email adresi" }),
  password: z
    .string()
    .min(4, { message: "Şifreniz en az 4 karakter içermeli" }),
});
