import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, PROVIDERS, SERVICE_CATEGORIES, formatETB } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MERKATO TV — Shop Smart. Live Better." },
      {
        name: "description",
        content:
          "Discover electronics, everyday products, accessories and trusted services across Ethiopia — all in one marketplace.",
      },
      { property: "og:title", content: "MERKATO TV — Shop Smart. Live Better." },
      {
        property: "og:description",
        content:
          "Discover electronics, everyday products, accessories and trusted services across Ethiopia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diff = Math.max(0, midnight.getTime() - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s };
}

function FlashSale() {
  const { h, m, s } = useCountdown();
  const deals = PRODUCTS.filter((p) => p.flashDeal);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="bg-primary py-14 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-foreground">
              Flash Sale
            </span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Today's Best Deals — Up to 50% Off</h2>
          </div>
          <div className="flex items-center gap-2">
            {[
              { v: pad(h), l: "Hrs" },
              { v: pad(m), l: "Min" },
              { v: pad(s), l: "Sec" },
            ].map((u) => (
              <div key={u.l} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-foreground/10 font-display text-2xl font-bold tabular-nums">
                  {u.v}
                </div>
                <span className="mt-1 block text-[10px] uppercase tracking-wider opacity-70">{u.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl bg-card text-card-foreground">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TRUST_ITEMS = [
  { icon: BadgeCheck, title: "Verified Sellers", text: "Every seller is identity-checked before listing." },
  { icon: ShieldCheck, title: "Buyer Protection", text: "Full refund if your order doesn't arrive as described." },
  { icon: Truck, title: "Tracked Delivery", text: "Follow your order from seller to your door." },
  { icon: RotateCcw, title: "Easy Returns", text: "7-day return window on eligible products." },
  { icon: Headset, title: "Local Support", text: "Customer support in Amharic and English." },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              Ethiopia's Marketplace
            </span>
            <h1 className="mt-5 text-balance font-display text-5xl font-bold leading-[1.05] md:text-6xl">
              Shop Smart. <span className="text-primary">Live Better.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Discover electronics, everyday products, accessories, and trusted services — all in one marketplace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3.5 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Explore Services
              </Link>
            </div>
            <div className="mt-10 flex gap-8">
              {[
                { v: "12K+", l: "Products" },
                { v: "850+", l: "Verified Sellers" },
                { v: "7", l: "Cities" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-primary">{s.v}</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Electronics and products available on MERKATO TV"
              width={1600}
              height={900}
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-5 left-6 rounded-xl bg-card px-5 py-3 shadow-lg">
              <div className="text-xs text-muted-foreground">Flash deals from</div>
              <div className="font-display text-xl font-bold text-primary">{formatETB(2890)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="overflow-hidden border-y border-border bg-secondary py-3">
        <div className="animate-marquee flex w-max gap-10 text-sm font-semibold text-secondary-foreground">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-10">
              {["Free delivery in Addis Ababa over Br 5,000", "Pay with Telebirr & CBE Birr", "Verified sellers only", "7-day easy returns", "Cash on delivery available"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <p className="mt-1 text-muted-foreground">Find exactly what you're looking for.</p>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              to="/shop"
              search={{ category: c.name }}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
            >
              <span className="text-3xl">{c.icon}</span>
              <span className="text-xs font-semibold leading-tight group-hover:text-primary">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash sale */}
      <FlashSale />

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="mt-1 text-muted-foreground">Hand-picked deals from verified sellers.</p>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-secondary/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Services Marketplace</h2>
              <p className="mt-1 text-muted-foreground">
                Book trusted local professionals — from phone repair to photography.
              </p>
            </div>
            <Link to="/services" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {SERVICE_CATEGORIES.slice(0, 6).map((s) => (
              <Link
                key={s.name}
                to="/services"
                className="rounded-xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-3xl">{s.icon}</span>
                <div className="mt-2 text-xs font-semibold">{s.name}</div>
                <div className="text-[11px] text-muted-foreground">{s.providers} providers</div>
              </Link>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PROVIDERS.slice(0, 3).map((p) => (
              <div key={p.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                    {p.initials}
                  </span>
                  <div>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      {p.name}
                      {p.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{p.location}</div>
                  </div>
                  <span className="ml-auto rounded-full bg-gold/20 px-2 py-0.5 text-xs font-bold text-gold-foreground">
                    ★ {p.rating}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span>
                    From <strong className="text-primary">{formatETB(p.startingPrice)}</strong>
                  </span>
                  <Link to="/services" className="font-semibold text-primary hover:underline">
                    Request Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">Why Shop with MERKATO TV?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST_ITEMS.map((t) => (
            <div key={t.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <t.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-sm font-bold">{t.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sell CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-primary px-8 py-12 text-center text-primary-foreground md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-bold">Grow your business on MERKATO TV</h2>
            <p className="mt-2 max-w-xl opacity-85">
              Join hundreds of verified sellers reaching customers across Ethiopia. Free registration, powerful seller tools, fast payouts.
            </p>
          </div>
          <Link
            to="/shop"
            className="shrink-0 rounded-full bg-gold px-8 py-3.5 font-semibold text-gold-foreground transition-transform hover:scale-[1.03]"
          >
            Become a Seller
          </Link>
        </div>
      </section>
    </div>
  );
}
