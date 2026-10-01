"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroProduct = {
  id: string;
  name: string;
  image: string;
  category: string;
};

type HeroSlideshowProps = {
  products: HeroProduct[];
};

export function HeroSlideshow({
  products,
}: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) =>
        current === products.length - 1 ? 0 : current + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (products.length === 0) {
    return null;
  }

  const product = products[currentIndex];

  return (
    <div className="relative min-h-[500px] overflow-hidden bg-[#d8cec2]">
      {/* Product image and product information */}
      <Link
        href={`/product/${product.id}`}
        className="absolute inset-0 block"
      >
        <Image
          key={product.id}
          src={product.image}
          alt={product.name}
          fill
          priority={currentIndex === 0}
          className="object-cover transition-opacity duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className="absolute bottom-6 left-6 bg-white/90 px-5 py-4 backdrop-blur-sm">
          <p className="font-serif text-xl">
            {product.name}
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#8b7355]">
            {product.category}
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] underline underline-offset-4">
            View Product →
          </p>
        </div>
      </Link>

      {/* Previous button */}
      {products.length > 1 && (
        <button
          type="button"
          aria-label="Previous product"
          onClick={() =>
            setCurrentIndex((current) =>
              current === 0
                ? products.length - 1
                : current - 1
            )
          }
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg backdrop-blur-sm transition hover:bg-white"
        >
          ←
        </button>
      )}

      {/* Next button */}
      {products.length > 1 && (
        <button
          type="button"
          aria-label="Next product"
          onClick={() =>
            setCurrentIndex((current) =>
              current === products.length - 1
                ? 0
                : current + 1
            )
          }
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg backdrop-blur-sm transition hover:bg-white"
        >
          →
        </button>
      )}

      {/* Slide indicators */}
      {products.length > 1 && (
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          {products.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.name}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full border border-white transition ${
                currentIndex === index
                  ? "bg-white"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}