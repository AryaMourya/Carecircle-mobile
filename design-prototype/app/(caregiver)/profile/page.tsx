import { Bell, CalendarDays, Info, Lock, Pill, User } from "lucide-react";
import { SimpleList } from "@/components/caregiver/SimpleList";

const hero = (
  <div className="py-4 text-center">
    <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-900">RK</span>
    <p className="mt-3 text-xl font-bold">Rahul Kumar</p>
    <p className="text-muted-foreground">rahul@example.com</p>
  </div>
);

export default function Page() {
  return (
    <SimpleList title="Profile" hero={hero}
      items={[
        { title: "My Details", icon: <User className="h-5 w-5" /> },
        { title: "Medicines", icon: <Pill className="h-5 w-5" />, href: "/medications" },
        { title: "Checkups", icon: <CalendarDays className="h-5 w-5" />, href: "/checkups" },
        { title: "Notifications", icon: <Bell className="h-5 w-5" />, href: "/notifications" },
        { title: "Privacy & Security", icon: <Lock className="h-5 w-5" /> },
        { title: "About CareCircle", icon: <Info className="h-5 w-5" /> },
      ]} />
  );
}
