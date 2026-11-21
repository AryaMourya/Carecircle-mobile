import { createClient } from "@/lib/supabase/server";
import { DoseList } from "@/components/patient/DoseList";
import type { DoseReminder } from "@/lib/types";

export default async function TodayPage({
  params,
}: {
  params: Promise<{ patientId: string }>; // Next 14: params is a plain object
}) {
  const { patientId } = await params;
  const supabase = await createClient();

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  // RLS limits this to patients the signed-in user is linked to.
  const { data, error } = await supabase
    .from("medication_reminders")
    .select(
      `id, scheduled_for, status, acknowledged_at,
       medication_schedules!inner(
         medications!inner(name, dosage, instructions, patient_id)
       )`
    )
    .eq("medication_schedules.medications.patient_id", patientId)
    .gte("scheduled_for", start.toISOString())
    .lt("scheduled_for", end.toISOString())
    .order("scheduled_for");

  if (error) {
    return (
      <main className="p-6 text-xl">
        We could not load today's medicines. Please check your connection and
        refresh.
      </main>
    );
  }

  const doses: DoseReminder[] = (data ?? []).map((r: any) => ({
    id: r.id,
    scheduled_for: r.scheduled_for,
    status: r.status,
    acknowledged_at: r.acknowledged_at,
    name: r.medication_schedules.medications.name,
    dosage: r.medication_schedules.medications.dosage,
    instructions: r.medication_schedules.medications.instructions,
  }));

  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      <h1 className="text-3xl font-bold">Today's medicines</h1>
      <p className="mt-1 text-lg text-muted-foreground">
        {new Date().toLocaleDateString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </p>
      <DoseList initial={doses} />
    </main>
  );
}
