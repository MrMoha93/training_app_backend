import { z } from "zod";

const setSchema = z.object({
  weight: z.number().min(1, { message: "Weight must be at least 1 kg" }),
  reps: z.number().min(1, { message: "Reps must be at least 1" }),
});

const schema = z.object({
  id: z.string().optional(),
  date: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  sets: z.array(setSchema).optional(),
});

type formData = z.infer<typeof schema>;

export function validate(body: formData) {
  return schema.safeParse(body);
}
