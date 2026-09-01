import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, MapPin, MessageCircle, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { PROVIDERS, SERVICE_CATEGORIES, formatETB } from "@/lib/data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services Marketplace — MERKATO TV" },
      { name: "description", content: "Book trusted local professionals in Ethiopia — repairs, cleaning, photography, tutoring and more on MERKATO TV." },
      { property: "og:title", content: "Services Marketplace — MERKATO TV" },
      { property: "og:description", content: "Book trusted local professionals across Ethiopia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      PROVIDERS.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (query.trim() === "" ||
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())),
      ),
    [category, query],
  );

  const selectCls =
    "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold md:text-4xl">Services Marketplace</h1>
        <p className="mt-2 text-muted-foreground">
          Hire verified local professionals — from electronics repair and cleaning to photography and tutoring.
        </p>
      </div>

      {/* Category chips */}
      <div className="mt-8 flex flex-wrap gap-2">
        {["All", ...SERVICE_CATEGORIES.map((c) => c.name)].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search service providers…"
          className={selectCls}
        />
      </div>

      {/* Providers */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className="flex flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                {p.initials}
              </span>
              <div>
                <div className="flex items-center gap-1.5 font-semibold">
                  {p.name}
                  {p.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                </div>
                <span className="text-xs text-muted-foreground">{p.category}</span>
              </div>
              {p.verified && (
                <span className="ml-auto rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
                  Verified
                </span>
              )}
            </div>

            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {p.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {p.rating} ({p.reviews})
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm">
                From <strong className="font-display text-lg text-primary">{formatETB(p.startingPrice)}</strong>
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-lg border border-primary py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-accent">
                <MessageCircle className="mr-1.5 inline h-4 w-4" />
                Contact
              </button>
              <button className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Request Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-border py-20 text-center text-muted-foreground">
          No providers found. Try another category.
        </div>
      )}

      {/* Become a provider */}
      <div className="mt-14 rounded-3xl bg-primary px-8 py-10 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold">Offer your services on MERKATO TV</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm opacity-85">
          Create a provider profile, get verified, and start receiving requests from customers in your city.
        </p>
        <button className="mt-6 rounded-full bg-gold px-8 py-3 font-semibold text-gold-foreground transition-transform hover:scale-[1.03]">
          Register as a Provider
        </button>
      </div>
    </div>
  );
}
