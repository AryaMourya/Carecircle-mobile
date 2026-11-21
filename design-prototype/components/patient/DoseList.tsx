"use client";

import { useOptimistic, useTransition } from "react";
import { Check, Clock, SkipForward } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { DoseReminder, DoseStatus } from "@/lib/types";

const SLOTS = [
  { label: "Morning", from: 5, to: 12 },
  { label: "Afternoon", from: 12, to: 17 },
  { label: "Evening", from: 17, to: 21 },
  { label: "Bedtime", from: 21, to: 29 }, // 21:00 to 04:59
];

function slotOf(iso: string) {
  let h = new Date(iso).getHours();
  if (h < 5) h += 24;
  return SLOTS.find((s) => h >= s.from && h < s.to)!.label;
}

export function DoseList({ initial }: { initial: DoseReminder[] }) {
  const supabase = createClient();
  const [, startTransition] = useTransition();
  const [doses, setOptimistic] = useOptimistic(
    initial,
    (state, u: { id: string; status: DoseStatus }) =>
      state.map((d) => (d.id === u.id ? { ...d, status: u.status } : d))
  );

  function update(id: string, status: DoseStatus) {
    startTransition(async () => {
      setOptimistic({ id, status });
      const { error } = await supabase
        .from("medication_reminders")
        .update({
          status,
          acknowledged_at: status === "ACKNOWLEDGED" ? new Date().toISOString() : null,
        })
        .eq("id", id);
      if (error) alert("That did not save. Please try again."); // swap for a toast
    });
  }

  if (doses.length === 0) {
    return (
      <p className="mt-8 text-xl">No medicines are scheduled for today.</p>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      {SLOTS.map(({ label }) => {
        const items = doses.filter((d) => slotOf(d.scheduled_for) === label);
        if (!items.length) return null;
        return (
          <section key={label} aria-labelledby={`slot-${label}`}>
            <h2 id={`slot-${label}`} className="mb-3 text-2xl font-semibold">
              {label}
            </h2>
            <ul className="space-y-4">
              {items.map((d) => (
                <li
                  key={d.id}
                  className="rounded-2xl border-2 border-foreground/20 bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-2xl font-bold">{d.name}</p>
                      <p className="text-xl">{d.dosage}</p>
                      {d.instructions && (
                        <p className="mt-1 text-lg text-muted-foreground">
                          {d.instructions}
                        </p>
                      )}
                    </div>
                    <p className="flex items-center gap-1 text-lg">
                      <Clock className="h-5 w-5" aria-hidden />
                      {new Date(d.scheduled_for).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {d.status === "PENDING" ? (
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => update(d.id, "ACKNOWLEDGED")}
                        className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 px-4 text-xl font-bold text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2"
                      >
                        <Check className="h-6 w-6" aria-hidden /> I took it
                      </button>
                      <button
                        onClick={() => update(d.id, "SKIPPED")}
                        className="flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-foreground/40 px-4 text-lg font-semibold"
                      >
                        <SkipForward className="h-5 w-5" aria-hidden /> Skipped
                      </button>
                    </div>
                  ) : (
                    <p className="mt-4 flex items-center gap-2 text-xl font-semibold">
                      {d.status === "ACKNOWLEDGED" ? (
                        <>
                          <Check className="h-6 w-6 text-green-700" aria-hidden />
                          Marked as taken
                        </>
                      ) : (
                        <>
                          <SkipForward className="h-6 w-6" aria-hidden />
                          Skipped
                        </>
                      )}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
