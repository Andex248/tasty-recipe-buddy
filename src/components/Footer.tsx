import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Send, Music2 } from "lucide-react";

const SHOP_LINKS = ["Phones & Tablets", "Computers & Laptops", "TVs & Entertainment", "Home Appliances", "Fashion", "Electronics"];
const COMPANY_LINKS = ["About Us", "Contact", "Help Center", "Become a Seller", "Careers"];
const LEGAL_LINKS = ["Privacy Policy", "Terms & Conditions", "Return Policy", "Shipping Information"];

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-display text-lg font-bold text-gold-foreground">
              M
            </span>
            <span className="font-display text-xl font-bold">MERKATO TV</span>
          </div>
          <p className="mt-3 text-sm opacity-80">
            Everything You Need. All in One Place. Ethiopia's trusted marketplace for products and services.
          </p>
          <div className="mt-4 flex gap-3">
            {[Facebook, Send, Music2, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-gold hover:text-gold-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Shop</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {SHOP_LINKS.map((l) => (
              <li key={l}>
                <Link to="/shop" className="hover:opacity-100 hover:underline">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Company</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {COMPANY_LINKS.map((l) => (
              <li key={l}><a href="#" className="hover:underline">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold">Legal</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {LEGAL_LINKS.map((l) => (
              <li key={l}><a href="#" className="hover:underline">{l}</a></li>
            ))}
          </ul>
          <p className="mt-6 text-xs opacity-70">
            Payments: Telebirr · CBE Birr · Bank Transfer · Cards · Cash on Delivery
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-4 text-center text-xs opacity-70">
        © 2026 MERKATO TV. All rights reserved. Made in Ethiopia.
      </div>
    </footer>
  );
}
