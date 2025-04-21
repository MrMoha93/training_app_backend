import { z } from "zod";

const setSchema = z.object({
  weight: z.number().min(1, { message: "Weight must be at least 1 kg" }),
  reps: z.number().min(1, { message: "Reps must be at least 1" }),
});

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  sessionId: z.string().min(1, { message: "You must select a session" }),
  sets: z.array(setSchema),
});

type formData = z.infer<typeof schema>;

export function validate(body: formData) {
  return schema.safeParse(body);
}
