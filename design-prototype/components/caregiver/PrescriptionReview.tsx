"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reviewFormSchema, type ExtractedMed, type ReviewForm } from "@/lib/schemas";

interface Props {
  imageUrl: string; // short-lived signed URL generated on the server
  extracted: ExtractedMed[]; // validated Gemini output (unverified draft)
  onApprove: (rows: ExtractedMed[]) => Promise<void>; // server action: insert + audit log
}

export function PrescriptionReview({ imageUrl, extracted, onApprove }: Props) {
  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { rows: extracted.map((m) => ({ ...m, reviewed: false })) },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "rows" });
  const rows = form.watch("rows");
  const allReviewed = rows.length > 0 && rows.every((r) => r.reviewed);

  const submit = form.handleSubmit(async ({ rows }) => {
    await onApprove(rows.map(({ reviewed, ...m }) => m));
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left: original document */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <div className="overflow-auto rounded-xl border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Uploaded prescription" className="w-full" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Compare every field against the original before approving.
        </p>
      </div>

      {/* Right: editable draft */}
      <form onSubmit={submit} className="space-y-4">
        <p className="rounded-lg border border-amber-500 bg-amber-50 p-3 text-sm text-amber-950">
          This list was read by AI and may contain mistakes. It is a draft until
          you approve it.
        </p>

        {fields.map((f, i) => (
          <fieldset key={f.id} className="space-y-3 rounded-xl border p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm">
                Medicine
                <Input {...form.register(`rows.${i}.name`)} />
                <Err msg={form.formState.errors.rows?.[i]?.name?.message} />
              </label>
              <label className="text-sm">
                Dosage
                <Input {...form.register(`rows.${i}.dosage`)} />
                <Err msg={form.formState.errors.rows?.[i]?.dosage?.message} />
              </label>
              <label className="text-sm">
                How often
                <Input {...form.register(`rows.${i}.frequency`)} />
                <Err msg={form.formState.errors.rows?.[i]?.frequency?.message} />
              </label>
              <label className="text-sm">
                Days
                <Input type="number" {...form.register(`rows.${i}.duration_days`)} />
              </label>
            </div>
            <label className="block text-sm">
              Instructions
              <Input {...form.register(`rows.${i}.instructions`)} />
            </label>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" className="h-5 w-5" {...form.register(`rows.${i}.reviewed`)} />
                I checked this row
              </label>
              <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>
                <Trash2 className="mr-1 h-4 w-4" aria-hidden /> Remove
              </Button>
            </div>
          </fieldset>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({ name: "", dosage: "", frequency: "", duration_days: null, instructions: "", reviewed: false })
          }
        >
          <Plus className="mr-1 h-4 w-4" aria-hidden /> Add medicine
        </Button>

        <Button type="submit" className="w-full" disabled={!allReviewed || form.formState.isSubmitting}>
          Approve and create schedule
        </Button>
        {!allReviewed && (
          <p className="text-sm text-muted-foreground">
            Check every row to enable approval.
          </p>
        )}
      </form>
    </div>
  );
}

function Err({ msg }: { msg?: string }) {
  return msg ? <span className="text-sm text-red-700">{msg}</span> : null;
}
