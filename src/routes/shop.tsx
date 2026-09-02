import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, CITIES, PRODUCTS } from "@/lib/data";

type ShopSearch = { q?: string | undefined; category?: string | undefined; deal?: boolean | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    q: typeof s["q"] === "string" ? (s["q"] as string) : "",
    category: typeof s["category"] === "string" ? (s["category"] as string) : "All",
    deal: s["deal"] === true,
  }),
  head: () => ({
    meta: [
      { title: "Shop — MERKATO TV" },
      { name: "description", content: "Browse electronics, appliances and more from verified sellers across Ethiopia on MERKATO TV." },
      { property: "og:title", content: "Shop — MERKATO TV" },
      { property: "og:description", content: "Browse electronics, appliances and more from verified sellers across Ethiopia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

type SortKey = "popular" | "newest" | "price-asc" | "price-desc" | "rating";

function Shop() {
  const search = Route.useSearch();
  const [category, setCategory] = useState(search.category ?? "All");
  const [city, setCity] = useState("All");
  const [maxPrice, setMaxPrice] = useState(120000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>("popular");
  const [query, setQuery] = useState(search.q ?? "");
  const [dealsOnly, setDealsOnly] = useState(search.deal ?? false);

  const results = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (city === "All" || p.location === city) &&
        p.price <= maxPrice &&
        p.rating >= minRating &&
        (!dealsOnly || p.flashDeal) &&
        (query.trim() === "" ||
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())),
    );
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest": list = [...list].reverse(); break;
      default: list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [category, city, maxPrice, minRating, sort, query, dealsOnly]);

  const selectCls =
    "w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Shop All Products</h1>
      <p className="mt-1 text-muted-foreground">
        {results.length} product{results.length !== 1 ? "s" : ""} found
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-36">
          <div className="mb-4 flex items-center gap-2 font-semibold">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </div>

          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Product or brand…"
            className={selectCls}
          />

          <label className="mb-1 mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls}>
            <option>All</option>
            {CATEGORIES.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>

          <label className="mb-1 mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Location</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} className={selectCls}>
            <option>All</option>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <label className="mb-1 mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Max price: Br {maxPrice.toLocaleString()}
          </label>
          <input
            type="range"
            min={1000}
            max={120000}
            step={1000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[var(--color-primary)]"
          />

          <label className="mb-1 mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Min rating</label>
          <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className={selectCls}>
            <option value={0}>Any</option>
            <option value={4}>4★ & up</option>
            <option value={4.5}>4.5★ & up</option>
          </select>

          <label className="mt-4 flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={dealsOnly}
              onChange={(e) => setDealsOnly(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            Flash deals only
          </label>
        </aside>

        {/* Grid */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none"
            >
              <option value="popular">Most popular</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>

          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-20 text-center text-muted-foreground">
              No products match your filters. Try widening your search.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
