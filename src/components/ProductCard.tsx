import { Link } from "@tanstack/react-router";
import { BadgeCheck, Heart, MapPin, ShoppingCart, Star } from "lucide-react";
import { formatETB, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";

export function RatingStars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="flex items-center gap-1 text-xs">
      <Star className="h-3.5 w-3.5 fill-gold text-gold" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-muted-foreground">({reviews})</span>
      )}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative">
        <Link to="/product/$productId" params={{ productId: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-destructive-foreground">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 shadow-sm transition-transform hover:scale-110"
        >
          <Heart
            className={`h-4.5 w-4.5 ${wished ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          className="line-clamp-2 text-sm font-semibold leading-snug hover:text-primary"
        >
          {product.name}
        </Link>
        <RatingStars rating={product.rating} reviews={product.reviews} />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {product.location}
          {product.verified && (
            <span className="ml-1 flex items-center gap-0.5 text-primary">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified
            </span>
          )}
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-display text-lg font-bold text-primary">
            {formatETB(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatETB(product.oldPrice)}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart(product.id)}
          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
