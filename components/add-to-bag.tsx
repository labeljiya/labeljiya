"use client";

import { useCart } from "components/cart/cart-context";
import { useState } from "react";

type AddToBagProps = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export function AddToBag({
  id,
  name,
  price,
  image,
}: AddToBagProps) {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState("");

  const sizes = ["XS", "S", "M", "L"];

  function handleAddToBag() {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addItem({
      id,
      name,
      price,
      image,
      size: selectedSize,
    });

    alert(`${name} — Size ${selectedSize} added to your bag.`);
  }

  return (
    <>
      {/* Size */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em]">
            Select Size
          </p>

          <button
            type="button"
            className="text-xs underline underline-offset-4"
          >
            Size Guide
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`border px-4 py-3 text-sm transition ${
                selectedSize === size
                  ? "border-[#292522] bg-[#292522] text-white"
                  : "border-[#cfc5bb] hover:border-[#292522]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Bag */}
      <button
        type="button"
        onClick={handleAddToBag}
        className="mt-8 w-full bg-[#292522] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039]"
      >
        Add to Bag
      </button>
    </>
  );
}