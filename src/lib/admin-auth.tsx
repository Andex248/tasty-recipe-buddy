import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Demo-only admin gate (front-end mock, no real backend authentication).
const ADMIN_EMAIL = "null_0";
const ADMIN_PASSWORD = "merkato203027";
const KEY = "merkato-admin-session";

interface AdminAuth {
  authed: boolean;
  hydrated: boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

const Ctx = createContext<AdminAuth | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setAuthed(localStorage.getItem(KEY) === "1");
    } catch {}
    setHydrated(true);
  }, []);

  const signIn = (email: string, password: string) => {
    const ok =
      email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    if (ok) {
      try {
        localStorage.setItem(KEY, "1");
      } catch {}
      setAuthed(true);
    }
    return ok;
  };

  const signOut = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setAuthed(false);
  };

  return <Ctx.Provider value={{ authed, hydrated, signIn, signOut }}>{children}</Ctx.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
