"use client";

import { SizeGuide } from "components/size-guide";
import { useState } from "react";
import { useCart } from "./cart-context";


type AddToCartProps = {
  id: string;
  name: string;
  price: number;
  mrp: number;
  discount: number;
  image: string;
  sizes: string[];
};

export function AddToCart({
  id,
  name,
  price,
  mrp,
  discount,
  image,
  sizes,
}: AddToCartProps) {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState("");

  function handleAddToCart() {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addItem({
  id,
  name,
  price,
  mrp,
  discount,
  image,
  size: selectedSize,
});

    alert(`${name} — Size ${selectedSize} added to your bag.`);
  }

  return (
    <div>
      {/* SIZE SELECTION */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em]">
            Select Size
          </p>

          <SizeGuide />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`border px-4 py-3 text-sm transition ${
                selectedSize === size
                  ? "border-[#292522] bg-[#292522] text-white"
                  : "border-[#cfc5bb] hover:border-[#292522] hover:bg-[#292522] hover:text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ADD TO BAG */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-8 w-full bg-[#292522] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039]"
      >
        Add to Bag
      </button>
    </div>
  );
}