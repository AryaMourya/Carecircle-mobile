import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export interface Item { title: string; sub?: string; badge?: string; icon?: React.ReactNode; href?: string }
interface Props { title: string; hero?: React.ReactNode; items: Item[]; cta?: { label: string; icon?: React.ReactNode; href: string } }

// Placeholder list page: replace `items` with Supabase queries.
export function SimpleList({ title, hero, items, cta }: Props) {
  return (
    <div>
      <PageHeader title={title} />
      <div className="space-y-3 px-5">
        {hero}
        {items.map((i) => {
          const body = (
            <div className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm">
              {i.icon && <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">{i.icon}</span>}
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{i.title}</p>
                {i.sub && <p className="text-sm text-muted-foreground">{i.sub}</p>}
                {i.badge && <span className="mt-1 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-900">{i.badge}</span>}
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden />
            </div>
          );
          return i.href ? <Link key={i.title} href={i.href}>{body}</Link> : <div key={i.title}>{body}</div>;
        })}
        {cta && (
          <Link href={cta.href} className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-green-100 font-semibold text-green-900">
            {cta.icon} {cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
