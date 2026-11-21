import { z } from "zod";

// Shape we ask Gemini to return. Also used to validate its output on the server.
export const extractedMedSchema = z.object({
  name: z.string().min(1, "Drug name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"), // e.g. "1-0-1" or "twice daily"
  duration_days: z.coerce.number().int().positive().nullable(),
  instructions: z.string().optional().default(""),
});

export const extractionResultSchema = z.object({
  medications: z.array(extractedMedSchema),
});

export type ExtractedMed = z.infer<typeof extractedMedSchema>;

// Form version: each row also tracks whether a human has checked it.
export const reviewFormSchema = z.object({
  rows: z
    .array(extractedMedSchema.extend({ reviewed: z.boolean() }))
    .min(1, "Add at least one medication")
    .refine((rows) => rows.every((r) => r.reviewed), {
      message: "Review every row before approving",
    }),
});
export type ReviewForm = z.infer<typeof reviewFormSchema>;
