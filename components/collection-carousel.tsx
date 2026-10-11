"use client";

import type { Product } from "lib/products";
import { getSalePrice } from "lib/products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type CollectionCarouselProps = {
  products: Product[];
};

export function CollectionCarousel({
  products,
}: CollectionCarouselProps) {
  const [categoryIndex, setCategoryIndex] = useState(0);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const currentCategory = categories[categoryIndex] ?? categories[0] ?? "";

  const categoryProducts = products.filter(
    (product) => product.category === currentCategory
  );

  // Show a maximum of 4 products
  const visibleProducts = categoryProducts.slice(0, 4);

  useEffect(() => {
    if (categories.length <= 1) return;

    const interval = setInterval(() => {
      setCategoryIndex((current) =>
        current === categories.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [categories.length]);

  if (products.length === 0 || categories.length === 0) {
    return null;
  }

  function nextCategory() {
    setCategoryIndex((current) =>
      current === categories.length - 1 ? 0 : current + 1
    );
  }

  function previousCategory() {
    setCategoryIndex((current) =>
      current === 0 ? categories.length - 1 : current - 1
    );
  }

  return (
    <section className="bg-[#eee7df] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Centered Header */}
        <div className="relative mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8b7355]">
            LABEL JIYA Collection
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            {currentCategory}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#625a53]">
            Discover our latest pieces from the {currentCategory} collection.
          </p>

          {/* Navigation Arrows */}
          {categories.length > 1 && (
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={previousCategory}
                aria-label="Previous collection"
                className="flex h-10 w-10 items-center justify-center border border-[#292522] text-lg transition hover:bg-[#292522] hover:text-white"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextCategory}
                aria-label="Next collection"
                className="flex h-10 w-10 items-center justify-center border border-[#292522] text-lg transition hover:bg-[#292522] hover:text-white"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group w-full max-w-sm text-center"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#d8cec2]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                <span className="absolute left-1/2 top-4 z-10 -translate-x-1/2 whitespace-nowrap bg-white/95 px-4 py-2 text-center text-[10px] uppercase tracking-[0.15em]">
                  {product.category}
                </span>

                <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />

                <div className="absolute bottom-4 left-4 right-4 translate-y-2 bg-white/95 px-4 py-3 text-center text-[10px] uppercase tracking-[0.18em] opacity-0 backdrop-blur-sm transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View Product →
                </div>
              </div>

              {/* Product Details */}
              <div className="px-2 pt-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#8b7355]">
                  {product.category}
                </p>

                <h3 className="mt-2 font-serif text-lg">
                  {product.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                  {product.discount > 0 && (
                    <span className="text-sm text-[#8b8178] line-through">
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                  )}

                  <span className="text-sm font-medium">
                    ₹{getSalePrice(product).toLocaleString("en-IN")}
                  </span>

                  {product.discount > 0 && (
                    <span className="text-xs font-medium text-[#8b7355]">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-[#81766c]">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Category Navigation Dots */}
        {categories.length > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryIndex(index)}
                aria-label={`Show ${category}`}
                aria-current={index === categoryIndex ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  index === categoryIndex
                    ? "w-8 bg-[#292522]"
                    : "w-2 bg-[#b8aea5]"
                }`}
              />
            ))}
          </div>
        )}

        {/* Collection Button */}
        <div className="mt-10 text-center">
          {currentCategory && (
            <Link
              href={`/collections/${currentCategory
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")}`}
              className="inline-flex items-center justify-center gap-3 border border-[#292522] px-7 py-3.5 text-[10px] uppercase tracking-[0.22em] transition hover:bg-[#292522] hover:text-white"
            >
              Explore {currentCategory}
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
