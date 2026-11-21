import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Welcome() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-between px-6 py-16 text-center">
      <div className="mt-10 flex flex-col items-center gap-3">
        <Logo size={96} text={false} />
        <h1 className="text-4xl font-bold text-green-900">CareCircle</h1>
        <p className="text-lg text-muted-foreground">Healthcare, together.</p>
      </div>
      <div className="w-full space-y-4">
        <Link href="/register" className="flex min-h-14 items-center justify-center rounded-full bg-green-800 text-lg font-semibold text-white">Get Started</Link>
        <Link href="/login" className="block font-semibold text-green-800">Sign In</Link>
      </div>
    </main>
  );
}
