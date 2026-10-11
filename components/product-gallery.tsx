"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const validImages = images.filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center bg-[#eee7df] text-sm text-[#81766c]">
        Product image unavailable
      </div>
    );
  }
        const safeIndex = Math.min(currentIndex, validImages.length - 1);
        const currentImage = validImages[safeIndex];

        if (!currentImage) {
        return (
            <div className="flex aspect-[3/4] items-center justify-center bg-[#eee7df] text-sm text-[#81766c]">
            Product image unavailable
            </div>
        );
        }

  function showPrevious() {
    setCurrentIndex((current) =>
      current <= 0 ? validImages.length - 1 : current - 1
    );
  }

  function showNext() {
    setCurrentIndex((current) =>
      current >= validImages.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="w-full">
      {/* MAIN PRODUCT IMAGE */}
      <div className="group relative aspect-[3/4] overflow-hidden bg-[#eee7df]">
        <Image
          key={currentImage}
          src={currentImage}
          alt={`${productName} - image ${safeIndex + 1}`}
          fill
          priority
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* IMAGE COUNTER */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-2 text-xs tracking-wider text-[#292522]">
            {safeIndex + 1} / {validImages.length}
          </div>
        )}

        {/* PREVIOUS BUTTON */}
        {validImages.length > 1 && (
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous product image"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-[#292522] shadow-sm transition hover:bg-white"
          >
            ←
          </button>
        )}

        {/* NEXT BUTTON */}
        {validImages.length > 1 && (
          <button
            type="button"
            onClick={showNext}
            aria-label="Next product image"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-[#292522] shadow-sm transition hover:bg-white"
          >
            →
          </button>
        )}
      </div>

      {/* IMAGE THUMBNAILS */}
      {validImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {validImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`View image ${index + 1} of ${productName}`}
              aria-pressed={safeIndex === index}
              className={`relative aspect-[3/4] overflow-hidden bg-[#eee7df] transition ${
                safeIndex === index
                  ? "ring-2 ring-[#8b7355] ring-offset-2"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 25vw, 120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
