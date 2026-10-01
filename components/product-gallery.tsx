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
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#eee8e1]">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-[3/4] overflow-hidden bg-[#eee8e1] ${
              selectedImage === image
                ? "ring-2 ring-[#292522]"
                : "opacity-70 hover:opacity-100"
            }`}
            aria-label={`View product image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${productName} ${index + 1}`}
              fill
              className="object-cover"
              sizes="120px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}