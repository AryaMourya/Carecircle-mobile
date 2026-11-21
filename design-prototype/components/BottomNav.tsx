"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, FileText, Users, User, Plus, Pill, Upload, CalendarPlus, UserPlus } from "lucide-react";

const LEFT = [{ href: "/dashboard", label: "Home", Icon: Home }, { href: "/documents", label: "Records", Icon: FileText }];
const RIGHT = [{ href: "/caregivers", label: "Care", Icon: Users }, { href: "/profile", label: "Profile", Icon: User }];
const QUICK = [
  { href: "/medications", label: "Add medicine", Icon: Pill },
  { href: "/documents", label: "Upload prescription", Icon: Upload },
  { href: "/checkups", label: "Add checkup", Icon: CalendarPlus },
  { href: "/caregivers", label: "Invite caregiver", Icon: UserPlus },
];

export function BottomNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const tab = ({ href, label, Icon }: (typeof LEFT)[number]) => (
    <Link key={href} href={href}
      className={`flex min-h-16 flex-1 flex-col items-center justify-center gap-1 text-xs ${path.startsWith(href) ? "font-bold text-green-800" : "text-muted-foreground"}`}>
      <Icon className={`h-6 w-6 ${path.startsWith(href) ? "fill-green-800/20" : ""}`} aria-hidden /> {label}
    </Link>
  );
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)}>
          <div role="dialog" aria-label="Quick actions" onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-3 bottom-24 rounded-3xl bg-background p-2 shadow-xl">
            {QUICK.map(({ href, label, Icon }) => (
              <Link key={label} href={href} onClick={() => setOpen(false)} className="flex min-h-14 items-center gap-4 rounded-xl px-4 text-lg">
                <Icon className="h-6 w-6 text-green-800" aria-hidden /> {label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-50 flex items-center rounded-t-3xl bg-background px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgba(0,0,0,0.07)]">
        {LEFT.map(tab)}
        <button onClick={() => setOpen((o) => !o)} aria-label="Quick actions" aria-expanded={open}
          className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-green-800 text-white shadow-lg ring-4 ring-white">
          <Plus className={`h-7 w-7 transition-transform ${open ? "rotate-45" : ""}`} />
        </button>
        {RIGHT.map(tab)}
      </nav>
    </>
  );
}
