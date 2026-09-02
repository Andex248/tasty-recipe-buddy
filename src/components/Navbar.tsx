import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, MapPin, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { CITIES, PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/services", label: "Services" },
  { to: "/cart", label: "Cart" },
];

export function Navbar() {
  const { cartCount, wishlist } = useStore();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Addis Ababa");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const suggestions =
    query.trim().length > 0
      ? PRODUCTS.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 5)
      : [];

  return (
    <header className="sticky top-0 z-50">
      {/* Top strip */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="cursor-pointer bg-transparent outline-none"
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="text-foreground">
                  {c}
                </option>
              ))}
            </select>
          </div>
          <p className="hidden sm:block">Everything You Need. All in One Place.</p>
          <Link to="/shop" className="hover:underline">
            Sell on Merkato TV
          </Link>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground">
              M
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              MERKATO<span className="text-primary"> TV</span>
            </span>
          </Link>

          {/* Search */}
          <div className="relative mx-auto hidden w-full max-w-xl md:block">
            <div className="flex overflow-hidden rounded-full border border-input bg-card focus-within:ring-2 focus-within:ring-ring">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="Search products, brands and services…"
                className="w-full bg-transparent px-4 py-2.5 text-sm outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    navigate({ to: "/shop", search: { q: query, category: "All", deal: false } });
                }}
              />
              <button
                onClick={() => navigate({ to: "/shop", search: { q: query, category: "All", deal: false } })}
                className="bg-primary px-5 text-primary-foreground"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
            {focused && suggestions.length > 0 && (
              <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                {suggestions.map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$productId"
                    params={{ productId: p.id }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted"
                  >
                    <img src={p.image} alt="" className="h-8 w-8 rounded object-cover" />
                    <span className="truncate">{p.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{p.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Link
              to="/shop"
              className="relative rounded-full p-2.5 hover:bg-muted"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative rounded-full p-2.5 hover:bg-muted"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 sm:flex">
              <User className="h-4 w-4" />
              Sign In
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden border-t border-border/60 lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2 text-sm font-medium">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={i}
                to={l.to}
                className="text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={i}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
