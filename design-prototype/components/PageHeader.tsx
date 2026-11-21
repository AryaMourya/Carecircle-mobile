"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function PageHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 grid grid-cols-[48px_1fr_48px] items-center bg-background/90 px-2 py-3 backdrop-blur">
      <button onClick={() => router.back()} aria-label="Back" className="flex h-11 w-11 items-center justify-center rounded-full">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <h1 className="text-center text-lg font-semibold">{title}</h1>
      <div className="flex justify-end">{right}</div>
    </header>
  );
}
