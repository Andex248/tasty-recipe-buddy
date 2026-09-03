import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Star } from "lucide-react";
import { PROVIDERS, formatETB } from "@/lib/data";

export const Route = createFileRoute("/admin/sellers")({
  component: AdminSellers,
});

function AdminSellers() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Sellers & providers</h1>
        <p className="text-sm text-muted-foreground">
          Review verification status and performance of marketplace partners.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PROVIDERS.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 font-display font-bold text-primary">
                {p.initials}
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 truncate font-medium">
                  {p.name}
                  {p.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
                </p>
                <p className="truncate text-xs text-muted-foreground">{p.location}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-gold text-gold" />
                {p.rating}
                <span className="text-muted-foreground">({p.reviews})</span>
              </span>
              <span className="font-medium">From {formatETB(p.startingPrice)}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                {p.verified ? "Verified" : "Approve"}
              </button>
              <button className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                Suspend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
