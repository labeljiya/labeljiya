"use client";

import Link from "next/link";
import { useCart } from "./cart-context";

export function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Shopping cart with ${itemCount} items`}
      className="relative text-xl hover:opacity-60"
    >
      🛍

      {itemCount > 0 && (
        <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#292522] px-1 text-[10px] text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );
}