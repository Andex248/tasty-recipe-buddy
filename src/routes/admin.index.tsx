import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Box, ReceiptText, Store, Wallet } from "lucide-react";
import { PRODUCTS, PROVIDERS, formatETB } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const RECENT_ORDERS = [
  { id: "MTV-10421", customer: "Selam Bekele", total: 48999, status: "Paid", method: "Telebirr" },
  { id: "MTV-10420", customer: "Dawit Alemu", total: 12450, status: "Shipped", method: "CBE Birr" },
  { id: "MTV-10419", customer: "Hanna Girma", total: 3200, status: "Pending", method: "Cash on delivery" },
  { id: "MTV-10418", customer: "Yonas Tadesse", total: 89900, status: "Paid", method: "Card" },
  { id: "MTV-10417", customer: "Meron Assefa", total: 7600, status: "Cancelled", method: "Telebirr" },
];

export const STATUS_STYLES: Record<string, string> = {
  Paid: "bg-primary/10 text-primary",
  Shipped: "bg-gold/25 text-gold-foreground",
  Pending: "bg-muted text-muted-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
};

function AdminDashboard() {
  const revenue = RECENT_ORDERS.reduce((s, o) => s + o.total, 0);
  const stats = [
    { label: "Revenue (30d)", value: formatETB(revenue * 12), icon: Wallet, delta: "+18.2%" },
    { label: "Orders", value: "1,284", icon: ReceiptText, delta: "+9.4%" },
    { label: "Products", value: String(PRODUCTS.length * 24), icon: Box, delta: "+3.1%" },
    { label: "Sellers", value: String(PROVIDERS.length * 7), icon: Store, delta: "+5.6%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Marketplace overview at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-primary">
              <ArrowUpRight className="h-3 w-3" />
              {s.delta} vs last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">Recent orders</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2">Order</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Payment</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="py-2.5 font-medium">{o.id}</td>
                    <td className="py-2.5">{o.customer}</td>
                    <td className="py-2.5 text-muted-foreground">{o.method}</td>
                    <td className="py-2.5">{formatETB(o.total)}</td>
                    <td className="py-2.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-lg font-semibold">Low stock</h2>
          <ul className="mt-3 space-y-3">
            {[...PRODUCTS]
              .sort((a, b) => a.stock - b.stock)
              .slice(0, 5)
              .map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.seller}</p>
                  </div>
                  <span className="text-sm font-semibold text-destructive">{p.stock}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
