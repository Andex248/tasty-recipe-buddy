import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Heart, MapPin, Minus, Plus, Share2, ShieldCheck, ShoppingCart, Star, Truck, Zap } from "lucide-react";
import { useState } from "react";
import { ProductCard, RatingStars } from "@/components/ProductCard";
import { PRODUCTS, formatETB } from "@/lib/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — MERKATO TV` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — MERKATO TV` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty, setQty] = useState(1);
  const wished = wishlist.includes(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category)).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="aspect-square w-full object-cover"
          />
          {discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1.5 text-sm font-bold text-destructive-foreground">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category} · {product.brand}
          </span>
          <h1 className="mt-2 text-3xl font-bold leading-tight">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <RatingStars rating={product.rating} reviews={product.reviews} />
            <span className={`text-xs font-semibold ${product.stock < 10 ? "text-destructive" : "text-primary"}`}>
              {product.stock < 10 ? `Only ${product.stock} left in stock` : "In stock"}
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-primary">
              {formatETB(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatETB(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Seller */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
              {product.seller.charAt(0)}
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                {product.seller}
                {product.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {product.location}
                {product.verified && <span className="ml-1 text-primary">· Verified Seller</span>}
              </div>
            </div>
          </div>

          {/* Qty + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg border border-input">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3" aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold tabular-nums">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-3" aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => addToCart(product.id, qty)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-primary py-3 font-semibold text-primary transition-colors hover:bg-accent"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <Link
              to="/cart"
              onClick={() => addToCart(product.id, qty)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Zap className="h-4 w-4" /> Buy Now
            </Link>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
              className="rounded-lg border border-input p-3 transition-colors hover:bg-muted"
            >
              <Heart className={`h-5 w-5 ${wished ? "fill-destructive text-destructive" : ""}`} />
            </button>
            <button aria-label="Share" className="rounded-lg border border-input p-3 transition-colors hover:bg-muted">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-accent-foreground">
              <Truck className="h-4 w-4" /> Tracked delivery available
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-accent-foreground">
              <ShieldCheck className="h-4 w-4" /> Buyer protection included
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Specifications</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          {Object.entries(product.specs).map(([k, v], i) => (
            <div key={k} className={`flex px-5 py-3.5 text-sm ${i % 2 ? "bg-muted/60" : "bg-card"}`}>
              <span className="w-40 shrink-0 font-semibold">{k}</span>
              <span className="text-muted-foreground">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews summary */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="mt-4 flex items-center gap-6 rounded-xl border border-border bg-card p-6">
          <div className="text-center">
            <div className="font-display text-5xl font-bold">{product.rating.toFixed(1)}</div>
            <div className="mt-1 flex justify-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${s <= Math.round(product.rating) ? "fill-gold text-gold" : "text-border"}`}
                />
              ))}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{product.reviews} reviews</div>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((s) => {
              const pct = s === 5 ? 68 : s === 4 ? 21 : s === 3 ? 7 : s === 2 ? 3 : 1;
              return (
                <div key={s} className="flex items-center gap-2 text-xs">
                  <span className="w-6">{s}★</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-8 text-muted-foreground">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
