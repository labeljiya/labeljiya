"use client";

import { useCart } from "components/cart/cart-context";
import { useState } from "react";

type AddToBagProps = {
  id: string;
  name: string;
  price: number;
  mrp: number;
  discount: number;
  image: string;
};

export function AddToBag({
  id,
  name,
  price,
  mrp,
  discount,
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
      mrp,
      discount,
      image,
      size: selectedSize,
    });

    alert(`${name} — Size ${selectedSize} added to your bag.`);
  }

  return (
    <div className="mt-8">
      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#292522]">
            Select Size
            {selectedSize && (
              <span className="ml-2 text-[#8b7355]">
                — {selectedSize} selected
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={() =>
              alert("Please contact LABEL JIYA for size assistance.")
            }
            className="text-xs text-[#756b63] underline underline-offset-4 hover:text-[#292522]"
          >
            Size Guide
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {sizes.map((size) => {
            const isSelected = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={isSelected}
                className={`flex min-h-12 items-center justify-center border text-sm transition ${
                  isSelected
                    ? "border-[#292522] bg-[#292522] text-white"
                    : "border-[#cfc5bb] bg-white text-[#292522] hover:border-[#292522]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add to Bag */}
      <button
        type="button"
        onClick={handleAddToBag}
        className="mt-8 flex w-full items-center justify-center gap-3 bg-[#292522] px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039] active:scale-[0.99]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 8h14l1 13H4L5 8Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 8V6a3 3 0 0 1 6 0v2"
          />
        </svg>

        Add to Bag
      </button>

      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.15em] text-[#8b8178]">
        Select your size before adding to your bag
      </p>
    </div>
  );
}