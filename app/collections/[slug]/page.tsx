import {
  getSalePrice,
  products,
  saleProducts,
} from "lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type CollectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;

  /*
   * SALE COLLECTION
   * /collections/sale
   */
  const collectionProducts =
    slug === "sale"
      ? saleProducts
      : products.filter(
          (product) => createSlug(product.category) === slug
        );

  if (collectionProducts.length === 0) {
    notFound();
  }

  const collectionName =
    slug === "sale"
      ? "Sale Collection"
      : collectionProducts[0].category;

  return (
    <main className="min-h-screen bg-[#f8f5f1] text-[#292522]">
      {/* Header */}
      <header className="border-b border-[#ded6ce] bg-[#f8f5f1]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/images/logo/label-jiya-logo.png"
              alt="LABEL JIYA"
              width={80}
              height={80}
              priority
              className="h-14 w-14 object-contain md:h-16 md:w-16"
            />

            <span className="font-serif text-2xl tracking-[0.18em]">
              LABEL JIYA
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs uppercase tracking-[0.18em] underline underline-offset-4"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Collection Heading */}
      <section className="px-6 py-16 text-center md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b7355]">
          LABEL JIYA Collection
        </p>

        <h1 className="mt-4 font-serif text-5xl md:text-6xl">
          {collectionName}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#756b63]">
          Discover our collection of beautifully crafted Indian designer
          styles.
        </p>
      </section>

      {/* Products */}
      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collectionProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#eee8e1]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[10px] font-medium uppercase tracking-[0.15em]">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <div className="pt-4">
                  <h2 className="font-serif text-xl">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {product.discount > 0 && (
                      <span className="text-sm text-[#8b8178] line-through">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    )}

                    <span className="text-sm font-medium">
                      ₹
                      {getSalePrice(product).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {product.discount > 0 && (
                      <span className="text-xs font-medium text-[#8b7355]">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-sm text-[#81766c]">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ded6ce] px-6 py-10 text-center">
        <p className="text-xs tracking-[0.25em] text-[#756b63]">
          © {new Date().getFullYear()} LABEL JIYA
        </p>
      </footer>
    </main>
  );
}