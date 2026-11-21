import { UserPlus } from "lucide-react";
import { SimpleList } from "@/components/caregiver/SimpleList";

const hero = <p className="px-1.5 text-sm font-medium text-muted-foreground">Your Care Circle</p>;

export default function Page() {
  return (
    <SimpleList title="Family Circle" hero={hero}
      items={[
        { title: "Ramesh", badge: "Patient", icon: "R" },
        { title: "Rahul", badge: "Admin caregiver", icon: "R" },
        { title: "Anita", badge: "View only", icon: "A" },
      ]}
      cta={{ label: "Invite Caregiver", icon: <UserPlus className="h-5 w-5" />, href: "/caregivers/invite" }} />
  );
}
