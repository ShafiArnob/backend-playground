import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(6).max(150),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});
