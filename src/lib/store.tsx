import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./data";

export interface CartItem {
  id: string;
  qty: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
  cartTotal: number;
  cartProducts: { product: Product; qty: number }[];
  hydrated: boolean;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("merkato-cart");
      const w = localStorage.getItem("merkato-wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("merkato-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("merkato-wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<StoreState>(() => {
    const cartProducts = cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.id);
        return product ? { product, qty: item.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => x !== null);

    return {
      cart,
      wishlist,
      hydrated,
      addToCart: (id, qty = 1) =>
        setCart((prev) => {
          const existing = prev.find((i) => i.id === id);
          if (existing)
            return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
          return [...prev, { id, qty }];
        }),
      removeFromCart: (id) => setCart((prev) => prev.filter((i) => i.id !== id)),
      setQty: (id, qty) =>
        setCart((prev) =>
          qty <= 0
            ? prev.filter((i) => i.id !== id)
            : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
        ),
      toggleWishlist: (id) =>
        setWishlist((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        ),
      cartCount: cart.reduce((s, i) => s + i.qty, 0),
      cartTotal: cartProducts.reduce((s, i) => s + i.product.price * i.qty, 0),
      cartProducts,
    };
  }, [cart, wishlist, hydrated]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
