"use client";

import { SizeGuide } from "components/size-guide";
import type { SizeStock } from "lib/products";
import { useState } from "react";
import { useCart } from "./cart-context";

type AddToCartProps = {
  id: string;
  name: string;
  price: number;
  mrp: number;
  discount: number;
  image: string;
  sizes: SizeStock[];
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
  const [quantity, setQuantity] = useState(1);

  const selectedSizeStock = sizes.find(
    (item) => item.size === selectedSize
  );

  const availableStock = selectedSizeStock?.quantity ?? 0;

  function handleSizeChange(size: SizeStock) {
    if (size.quantity <= 0) return;

    setSelectedSize(size.size);
    setQuantity(1);
  }

  function handleAddToCart() {
    if (!selectedSize || !selectedSizeStock) {
      alert("Please select an available size first.");
      return;
    }

    if (availableStock <= 0) {
      alert("This size is out of stock.");
      return;
    }

    if (quantity < 1 || quantity > availableStock) {
      alert(`You can select between 1 and ${availableStock} items for size ${selectedSize}.`);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id,
        name,
        price,
        mrp,
        discount,
        image,
        size: selectedSize,
      });
    }

    alert(
      `${quantity} × ${name} — Size ${selectedSize} added to your bag.`
    );
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

        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {sizes.map((item) => {
            const outOfStock = item.quantity <= 0;

            return (
              <button
                key={item.size}
                type="button"
                disabled={outOfStock}
                onClick={() => handleSizeChange(item)}
                className={`border px-3 py-3 text-sm transition ${
                  selectedSize === item.size
                    ? "border-[#292522] bg-[#292522] text-white"
                    : outOfStock
                      ? "cursor-not-allowed border-[#e5ded6] bg-[#f0ece7] text-[#aaa19a] line-through"
                      : "border-[#cfc5bb] hover:border-[#292522] hover:bg-[#292522] hover:text-white"
                }`}
                title={
                  outOfStock
                    ? "Out of stock"
                    : `${item.quantity} available`
                }
              >
                {item.size}
                {outOfStock && (
                  <span className="mt-1 block text-[10px] normal-case tracking-normal">
                    Out of stock
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* QUANTITY */}
      {selectedSizeStock && availableStock > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="product-quantity"
              className="text-xs uppercase tracking-[0.2em]"
            >
              Quantity
            </label>

            <span className="text-xs text-[#81766c]">
              {availableStock} available in size {selectedSize}
            </span>
          </div>

          <div className="mt-3 flex w-fit items-center border border-[#cfc5bb]">
            <button
              type="button"
              onClick={() =>
                setQuantity((current) => Math.max(1, current - 1))
              }
              disabled={quantity <= 1}
              className="px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <input
              id="product-quantity"
              type="number"
              min={1}
              max={availableStock}
              value={quantity}
              onChange={(event) => {
                const value = Number(event.target.value);

                if (!Number.isFinite(value)) return;

                setQuantity(
                  Math.min(
                    availableStock,
                    Math.max(1, Math.floor(value || 1))
                  )
                );
              }}
              className="w-14 appearance-none bg-transparent text-center text-sm outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setQuantity((current) =>
                  Math.min(availableStock, current + 1)
                )
              }
              disabled={quantity >= availableStock}
              className="px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* ADD TO BAG */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!selectedSizeStock || availableStock <= 0}
        className="mt-8 w-full bg-[#292522] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {!selectedSizeStock
          ? "Select a Size"
          : availableStock <= 0
            ? "Out of Stock"
            : "Add to Bag"}
      </button>
    </div>
  );
}
