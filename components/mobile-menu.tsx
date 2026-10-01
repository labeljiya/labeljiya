"use client";

import { CartButton } from "components/cart/cart-button";
import { WhatsAppButton } from "components/whats-app-button";
import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-4">
        <CartButton />

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center border border-[#ded6ce]"
        >
          <span className="text-xl">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-20 z-50 border-b border-[#ded6ce] bg-[#faf8f5] px-6 py-6 shadow-sm">
          <nav className="flex flex-col">
            <Link
              href="#collection"
              onClick={() => setOpen(false)}
              className="border-b border-[#ded6ce] py-4 text-xs uppercase tracking-[0.18em]"
            >
              New Arrivals
            </Link>

            <Link
              href="#categories"
              onClick={() => setOpen(false)}
              className="border-b border-[#ded6ce] py-4 text-xs uppercase tracking-[0.18em]"
            >
              Collections
            </Link>

            <Link
              href="#story"
              onClick={() => setOpen(false)}
              className="border-b border-[#ded6ce] py-4 text-xs uppercase tracking-[0.18em]"
            >
              Our Story
            </Link>
          </nav>

          <div className="mt-6">
            <WhatsAppButton />
          </div>
        </div>
      )}
    </div>
  );
}