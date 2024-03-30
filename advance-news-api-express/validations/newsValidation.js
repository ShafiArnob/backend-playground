import z from "zod";

export const newsSchema = z.object({
  title: z.string().min(5).max(190),
  content: z.string().min(10).max(30000),
});
