"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";

interface Props {
  patientName: string;
  patientId: string;
  initial: { total: number; acknowledged: number; skipped: number };
}

// Counts are patient-reported, not verified intake.
export function ComplianceCard({ patientName, patientId, initial }: Props) {
  const [counts, setCounts] = useState(initial);

  useEffect(() => {
    const supabase = createClient();
    const refetch = async () => {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const { data } = await supabase
        .from("medication_reminders")
        .select(
          "status, medication_schedules!inner(medications!inner(patient_id))"
        )
        .eq("medication_schedules.medications.patient_id", patientId)
        .gte("scheduled_for", start.toISOString());
      if (!data) return;
      setCounts({
        total: data.length,
        acknowledged: data.filter((r) => r.status === "ACKNOWLEDGED").length,
        skipped: data.filter((r) => r.status === "SKIPPED").length,
      });
    };

    // Realtime cannot filter on joined columns, so refetch on any change (RLS scopes events).
    const channel = supabase
      .channel(`reminders-${patientId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "medication_reminders" },
        refetch
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [patientId]);

  const pct = counts.total ? Math.round((counts.acknowledged / counts.total) * 100) : 0;
  const pending = counts.total - counts.acknowledged - counts.skipped;

  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold">{patientName}</h3>
        <span className="text-sm text-muted-foreground">
          {counts.acknowledged} of {counts.total} doses reported today
        </span>
      </div>
      <Progress value={pct} className="mt-3 h-3" aria-label={`${pct}% reported`} />
      <p className="mt-2 text-sm">
        {pending} pending · {counts.skipped} skipped
      </p>
    </div>
  );
}
