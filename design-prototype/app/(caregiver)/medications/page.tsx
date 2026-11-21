import { Check, Pill } from "lucide-react";
import { SimpleList } from "@/components/caregiver/SimpleList";

const hero = (
  <div className="rounded-3xl bg-green-50 p-6 text-center">
    <Pill className="mx-auto h-16 w-16 text-green-800" aria-hidden />
    <p className="mt-2 text-2xl font-bold">Today's Schedule</p>
    <p className="text-muted-foreground">Don't forget your medicines!</p>
  </div>
);

export default function Page() {
  return (
    <SimpleList title="Medications" hero={hero}
      items={[
        { title: "Metformin", sub: "500 mg · After breakfast", badge: "Taken", icon: <Check className="h-5 w-5" /> },
        { title: "Amlodipine", sub: "5 mg · Morning", badge: "Pending", icon: <Pill className="h-5 w-5" /> },
      ]}
      cta={{ label: "Add medicine", href: "/medications/new" }} />
  );
}
