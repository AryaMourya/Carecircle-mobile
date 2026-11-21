import { FileText, FlaskConical, Image as Img, Search } from "lucide-react";
import { SimpleList } from "@/components/caregiver/SimpleList";

const hero = (
  <>
    <div className="flex items-center gap-3 rounded-full border bg-card px-4 py-3 text-muted-foreground"><Search className="h-5 w-5" /> Search records...</div>
    <div className="flex gap-2 overflow-x-auto pb-1">
      {["All", "Prescriptions", "Reports", "Others"].map((c, i) => (
        <span key={c} className={`rounded-full border px-4 py-2 text-sm font-semibold ${i === 0 ? "bg-green-800 text-white" : "bg-card"}`}>{c}</span>
      ))}
    </div>
  </>
);

export default function Page() {
  return (
    <SimpleList title="Health Records" hero={hero}
      items={[
        { title: "Prescription", sub: "20 Nov 2026 · To verify", icon: <FileText className="h-5 w-5" />, href: "/documents" },
        { title: "Lab Report", sub: "02 Nov 2026", icon: <FlaskConical className="h-5 w-5" /> },
        { title: "Medical Report", sub: "15 Oct 2026", icon: <Img className="h-5 w-5" /> },
      ]}
      cta={{ label: "Upload record", href: "/documents/upload" }} />
  );
}
