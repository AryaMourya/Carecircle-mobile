import { BottomNav } from "@/components/BottomNav";

export default function CaregiverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-3xl pb-28">
      {children}
      <BottomNav />
    </div>
  );
}
