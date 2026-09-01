import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, CheckCircle2, CreditCard, Landmark, Minus, Plus, Smartphone, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { CITIES, formatETB } from "@/lib/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart & Checkout — MERKATO TV" },
      { name: "description", content: "Review your cart and check out securely with Telebirr, CBE Birr, bank transfer, card or cash on delivery." },
      { property: "og:title", content: "Cart & Checkout — MERKATO TV" },
      { property: "og:description", content: "Secure checkout on MERKATO TV." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

const PAYMENT_METHODS = [
  { id: "telebirr", name: "Telebirr", icon: Smartphone, note: "Pay instantly from your Telebirr wallet" },
  { id: "cbe", name: "CBE Birr", icon: Smartphone, note: "Commercial Bank of Ethiopia mobile money" },
  { id: "bank", name: "Bank Transfer", icon: Landmark, note: "Direct transfer — instructions after order" },
  { id: "card", name: "Card Payment", icon: CreditCard, note: "Visa / Mastercard (coming soon)" },
  { id: "cod", name: "Cash on Delivery", icon: Banknote, note: "Available in selected cities" },
];

function CartPage() {
  const { cartProducts, cartTotal, setQty, removeFromCart } = useStore();
  const [city, setCity] = useState(CITIES[0]);
  const [payment, setPayment] = useState("telebirr");
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [placed, setPlaced] = useState(false);

  const deliveryFee = delivery === "express" ? 350 : cartTotal > 5000 ? 0 : 150;
  const total = cartTotal + deliveryFee;

  const inputCls =
    "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring";

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-3xl font-bold">Order placed!</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for shopping with MERKATO TV. This is a demo checkout — no payment was processed. Order tracking will appear in your account.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Cart & Checkout</h1>

      {cartProducts.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border py-24 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            {/* Cart items */}
            <section className="rounded-xl border border-border bg-card">
              <h2 className="border-b border-border px-5 py-4 font-display font-bold">1 · Cart Summary</h2>
              {cartProducts.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-4 border-b border-border px-5 py-4 last:border-0">
                  <img src={product.image} alt={product.name} loading="lazy" width={800} height={800} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link to="/product/$productId" params={{ productId: product.id }} className="line-clamp-1 text-sm font-semibold hover:text-primary">
                      {product.name}
                    </Link>
                    <div className="mt-0.5 text-xs text-muted-foreground">{product.location}</div>
                    <div className="mt-1 font-display font-bold text-primary">{formatETB(product.price)}</div>
                  </div>
                  <div className="flex items-center rounded-lg border border-input">
                    <button onClick={() => setQty(product.id, qty - 1)} className="px-2.5 py-2" aria-label="Decrease">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums">{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)} className="px-2.5 py-2" aria-label="Increase">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} aria-label="Remove" className="p-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </section>

            {/* Customer + address */}
            <section className="rounded-xl border border-border bg-card">
              <h2 className="border-b border-border px-5 py-4 font-display font-bold">2 · Customer & Delivery Address</h2>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <input placeholder="Full name" className={inputCls} />
                <input placeholder="Phone number (+251…)" className={inputCls} />
                <select value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
                  {CITIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <input placeholder="Area / Sub-city" className={inputCls} />
                <input placeholder="Street, house no., landmark" className={`${inputCls} sm:col-span-2`} />
              </div>
            </section>

            {/* Delivery method */}
            <section className="rounded-xl border border-border bg-card">
              <h2 className="border-b border-border px-5 py-4 font-display font-bold">3 · Delivery Method</h2>
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                {([
                  { id: "standard", name: "Standard Delivery", desc: "2–4 business days", fee: cartTotal > 5000 ? "Free" : "Br 150" },
                  { id: "express", name: "Express Delivery", desc: "Same / next day in Addis Ababa", fee: "Br 350" },
                ] as const).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDelivery(d.id)}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
                      delivery === d.id ? "border-primary bg-accent" : "border-border"
                    }`}
                  >
                    <Truck className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">{d.name}</div>
                      <div className="text-xs text-muted-foreground">{d.desc} · {d.fee}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-xl border border-border bg-card">
              <h2 className="border-b border-border px-5 py-4 font-display font-bold">4 · Payment Method</h2>
              <div className="space-y-2 p-5">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPayment(m.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
                      payment === m.id ? "border-primary bg-accent" : "border-border"
                    }`}
                  >
                    <m.icon className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.note}</div>
                    </div>
                    {payment === m.id && <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />}
                  </button>
                ))}
                <p className="pt-2 text-xs text-muted-foreground">
                  Demo checkout — no real payment is processed. Gateways can be integrated later.
                </p>
              </div>
            </section>
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-36">
            <h2 className="font-display font-bold">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatETB(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold">{deliveryFee === 0 ? "Free" : formatETB(deliveryFee)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-display text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatETB(total)}</span>
              </div>
            </div>
            <button
              onClick={() => setPlaced(true)}
              className="mt-5 w-full rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Place Order
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Secure checkout · Buyer protection on every order
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
