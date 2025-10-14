import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Titlte is too long"),
  content: z.string().optional(),
});

export type NoteFormData = z.infer<typeof noteSchema>;
