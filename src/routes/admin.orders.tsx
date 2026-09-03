import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatETB } from "@/lib/data";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const ORDERS = [
  { id: "MTV-10421", customer: "Selam Bekele", city: "Addis Ababa", items: 2, total: 48999, status: "Paid", method: "Telebirr", date: "Sep 3, 2026" },
  { id: "MTV-10420", customer: "Dawit Alemu", city: "Adama", items: 1, total: 12450, status: "Shipped", method: "CBE Birr", date: "Sep 2, 2026" },
  { id: "MTV-10419", customer: "Hanna Girma", city: "Hawassa", items: 3, total: 3200, status: "Pending", method: "Cash on delivery", date: "Sep 2, 2026" },
  { id: "MTV-10418", customer: "Yonas Tadesse", city: "Addis Ababa", items: 1, total: 89900, status: "Paid", method: "Card", date: "Sep 1, 2026" },
  { id: "MTV-10417", customer: "Meron Assefa", city: "Bahir Dar", items: 2, total: 7600, status: "Cancelled", method: "Telebirr", date: "Aug 31, 2026" },
  { id: "MTV-10416", customer: "Abel Kebede", city: "Mekelle", items: 4, total: 21300, status: "Delivered", method: "Bank transfer", date: "Aug 30, 2026" },
];

const STATUSES = ["All", "Pending", "Paid", "Shipped", "Delivered", "Cancelled"];

const STATUS_STYLES: Record<string, string> = {
  Paid: "bg-primary/10 text-primary",
  Shipped: "bg-gold/25 text-gold-foreground",
  Delivered: "bg-primary/15 text-primary",
  Pending: "bg-muted text-muted-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
};

function AdminOrders() {
  const [filter, setFilter] = useState("All");
  const rows = ORDERS.filter((o) => filter === "All" || o.status === filter);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">Track and manage marketplace orders.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{o.id}</td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.city}</td>
                <td className="px-4 py-3">{o.items}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.method}</td>
                <td className="px-4 py-3 font-medium">{formatETB(o.total)}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                <td className="px-4 py-3">
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
  );
}
