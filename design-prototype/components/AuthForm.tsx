"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const login = mode === "login";

  async function submit() {
    const { error } = login
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);
    router.push("/dashboard");
  }
  async function google() {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${location.origin}/dashboard` } });
  }
  async function magic() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    setMsg(error ? error.message : "Check your email for a sign-in link.");
  }
  const field = "flex min-h-14 items-center gap-3 rounded-2xl border bg-card px-4 shadow-sm";
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6">
      <div className="mb-4 flex flex-col items-center gap-1 text-center">
        <Logo size={64} text={false} />
        <h1 className="text-2xl font-bold text-green-900">CareCircle</h1>
        <p className="mt-3 text-lg font-bold">{login ? "Welcome back!" : "Create your account"}</p>
        <p className="text-sm text-muted-foreground">{login ? "Sign in to continue" : "Start caring together"}</p>
      </div>
      <label className={field}><Mail className="h-5 w-5 text-muted-foreground" aria-hidden />
        <input className="w-full bg-transparent outline-none" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label className={field}><Lock className="h-5 w-5 text-muted-foreground" aria-hidden />
        <input className="w-full bg-transparent outline-none" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button onClick={submit} className="min-h-14 rounded-full bg-green-800 text-lg font-semibold text-white">{login ? "Sign In" : "Create account"}</button>
      <button onClick={magic} className="text-center text-sm font-semibold text-green-800">Email me a magic link instead</button>
      <p className="text-center text-xs text-muted-foreground">or</p>
      <button onClick={google} className={`${field} justify-center font-semibold`}>Continue with Google</button>
      {msg && <p className="text-center text-sm text-red-700">{msg}</p>}
      <a className="text-center text-sm" href={login ? "/register" : "/login"}>
        {login ? "Don't have an account? " : "Have an account? "}<b className="text-green-800">{login ? "Sign Up" : "Sign In"}</b></a>
    </div>
  );
}
