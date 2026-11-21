import Link from "next/link";
import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

// Shows the real unread count (hidden when 0). Needs an RLS policy: user_id = auth.uid().
export async function NotificationBell() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let n = 0;
  if (user) {
    const { count } = await supabase.from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id).eq("read_status", false);
    n = count ?? 0;
  }
  return (
    <Link href="/notifications" aria-label={n ? `${n} unread alerts` : "Alerts"} className="relative flex h-10 w-10 items-center justify-center">
      <Bell className="h-6 w-6" />
      {n > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
          {n > 99 ? "99+" : n}
        </span>
      )}
    </Link>
  );
}
