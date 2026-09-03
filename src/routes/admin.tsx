import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart3,
  Box,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  Store,
  Lock,
} from "lucide-react";
import logo from "@/assets/merkato-logo.jpg";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — MERKATO TV" },
      {
        name: "description",
        content:
          "MERKATO TV admin console: monitor orders, products, sellers and marketplace performance.",
      },
      { property: "og:title", content: "Admin Console — MERKATO TV" },
      {
        property: "og:description",
        content: "Manage the MERKATO TV marketplace: orders, products, sellers and revenue.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminAuthProvider>
      <AdminShell />
    </AdminAuthProvider>
  ),
});

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Box },
  { to: "/admin/orders", label: "Orders", icon: ReceiptText },
  { to: "/admin/sellers", label: "Sellers", icon: Store },
] as const;

function AdminShell() {
  const { authed, hydrated, signOut } = useAdminAuth();

  if (!hydrated) return <div className="min-h-screen bg-muted" />;
  if (!authed) return <AdminLogin />;

  return (
    <div className="flex min-h-screen bg-muted/50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
          <img src={logo} alt="MERKATO TV" className="h-9 w-9 rounded-lg object-cover" />
          <div>
            <p className="font-display text-sm font-bold leading-tight">MERKATO TV</p>
            <p className="text-xs text-muted-foreground">Admin Console</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: "exact" in l ? l.exact : false }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&.active]:bg-primary [&.active]:text-primary-foreground"
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-border p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <BarChart3 className="h-4 w-4" />
            View storefront
          </Link>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 md:hidden">
          <img src={logo} alt="MERKATO TV" className="h-8 w-8 rounded-lg object-cover" />
          <span className="font-display font-bold">Admin</span>
          <button onClick={signOut} className="ml-auto text-sm text-destructive">
            Sign out
          </button>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-3 py-2 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: "exact" in l ? l.exact : false }}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground [&.active]:bg-primary [&.active]:text-primary-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function AdminLogin() {
  const { signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/60 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <img
            src={logo}
            alt="MERKATO TV logo"
            className="h-20 w-20 rounded-2xl object-cover shadow-sm"
          />
          <h1 className="mt-4 font-display text-xl font-bold">Admin Console</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage the marketplace
          </p>
        </div>

        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!signIn(email, password)) setError(true);
          }}
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              autoComplete="username"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              autoComplete="current-password"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {error && <p className="text-sm text-destructive">Incorrect email or password.</p>}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Lock className="h-4 w-4" />
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Demo access — no real accounts are stored.
        </p>
      </div>
    </div>
  );
}
