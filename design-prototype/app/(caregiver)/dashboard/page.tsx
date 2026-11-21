import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NotificationBell } from "@/components/NotificationBell";
import { ComplianceCard } from "@/components/caregiver/ComplianceCard";

export default function Dashboard() {
  // TODO: replace sample data with Supabase queries
  // One shared left/right inset (px-5) keeps logo, greeting, cards and section titles on the same line.
  return (
    <div className="px-5">
      <header className="flex items-center justify-between py-3">
        <Logo />
        <NotificationBell />
      </header>
      <h1 className="mt-2 text-3xl font-bold">Good morning, Rahul</h1>
      <p className="mt-1 text-muted-foreground">Let's take care of your family's health together.</p>

      <Link href="/medications" className="mt-5 flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-900">R</span>
        <div className="flex-1"><p className="font-semibold">Ramesh</p><p className="text-sm text-muted-foreground">Patient</p></div>
        <ChevronRight className="h-5 w-5" />
      </Link>

      <div className="mt-4 rounded-3xl bg-green-50 p-5">
        <p className="text-sm text-muted-foreground">Next medication</p>
        <p className="text-4xl font-bold">9:00 AM</p>
        <p>Amlodipine 5 mg</p>
        <Link href="/medications" className="mt-3 block rounded-full bg-white py-2 text-center text-sm font-semibold">View details</Link>
      </div>

      <div className="mt-4"><ComplianceCard patientName="Ramesh" patientId="demo" initial={{ total: 3, acknowledged: 1, skipped: 0 }} /></div>

      <div className="mb-3 mt-6 flex items-center justify-between">
        <h2 className="text-lg font-bold">Upcoming</h2>
        <Link href="/checkups" className="flex items-center gap-1 text-sm font-medium">See all <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <Link href="/checkups" className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-800"><CalendarDays className="h-5 w-5" /></span>
        <div className="flex-1"><p className="font-semibold">Checkup, Dr. Rao</p><p className="text-sm text-muted-foreground">28 Nov, 10:30 am</p></div>
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
