import { createClient } from "@/lib/supabase/server";
import { PrescriptionReview } from "@/components/caregiver/PrescriptionReview";
import { extractionResultSchema, type ExtractedMed } from "@/lib/schemas";
import { redirect } from "next/navigation";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string; docId: string }>;
}) {
  const { id: patientId, docId } = await params;
  const supabase = await createClient();

  const { data: doc } = await supabase
    .from("medical_documents")
    .select("file_path")
    .eq("id", docId)
    .single();
  if (!doc) redirect(`/patients/${patientId}/documents`);

  const { data: signed } = await supabase.storage
    .from("medical_documents")
    .createSignedUrl(doc.file_path, 60);

  // Call your /api/parse route (server-side Gemini call), then validate:
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/parse?docId=${docId}`, {
    cache: "no-store",
  });
  const parsed = extractionResultSchema.safeParse(await res.json());
  const extracted: ExtractedMed[] = parsed.success ? parsed.data.medications : [];

  async function approve(rows: ExtractedMed[]) {
    "use server";
    const sb = await createClient();
    // 1) insert into medications  2) create medication_schedules  3) write audit_logs
    // 4) set medical_documents.extraction_status = 'VERIFIED'
    // Run these in one Postgres function (rpc) so it is all-or-nothing.
    await sb.rpc("approve_prescription", { p_doc: docId, p_patient: patientId, p_rows: rows });
    redirect(`/patients/${patientId}/medications`);
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Review prescription</h1>
      <PrescriptionReview imageUrl={signed?.signedUrl ?? ""} extracted={extracted} onApprove={approve} />
    </main>
  );
}
