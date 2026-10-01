import { AddToCart } from "components/cart/add-to-cart";
import { CartButton } from "components/cart/cart-button";
import { ProductGallery } from "components/product-gallery";
import { getSalePrice, products } from "lib/products";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps) {
  const { handle } = await params;

  const product = products.find((item) => item.id === handle);

  if (!product) {
    return {
      title: "Product Not Found | LABEL JIYA",
    };
  }

  return {
    title: `${product.name} | LABEL JIYA`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { handle } = await params;

  const product = products.find((item) => item.id === handle);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#292522]">
      {/* ==================== HEADER ==================== */}
      <header className="border-b border-[#e5ded6] bg-[#faf8f5]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          {/* LOGO */}
          <Link
            href="/"
            className="font-serif text-2xl tracking-[0.12em]"
          >
            LABEL JIYA
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/#collection"
              className="text-xs uppercase tracking-[0.15em] hover:opacity-60"
            >
              New Arrivals
            </Link>

            <Link
              href="/#categories"
              className="text-xs uppercase tracking-[0.15em] hover:opacity-60"
            >
              Collections
            </Link>

            <Link
              href="/#story"
              className="text-xs uppercase tracking-[0.15em] hover:opacity-60"
            >
              Our Story
            </Link>
          </nav>

          {/* HEADER ACTIONS */}
          <div className="flex items-center gap-5">
            

            {/* Shopping Cart */}
            <CartButton />
          </div>
        </div>
      </header>

      {/* ==================== PRODUCT ==================== */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
        {/* Breadcrumb */}
        <div className="mb-8 text-xs uppercase tracking-[0.15em] text-[#81766c]">
          <Link
            href="/"
            className="hover:text-black"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/#collection"
            className="hover:text-black"
          >
            Collection
          </Link>

          <span className="mx-2">/</span>

          <span>{product.name}</span>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* ==================== PRODUCT GALLERY ==================== */}
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          {/* ==================== PRODUCT DETAILS ==================== */}
          <div className="flex flex-col justify-center">
            {/* CATEGORY */}
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b7355]">
              {product.category}
            </p>

            {/* PRODUCT NAME */}
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              {product.name}
            </h1>

            {/* PRICE */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
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

            <div className="my-8 h-px bg-[#e5ded6]" />

            {/* DESCRIPTION */}
            <p className="text-base leading-8 text-[#625a53]">
              {product.description}
            </p>

            {/* ==================== ADD TO CART ==================== */}
            <AddToCart
              id={product.id}
              name={product.name}
              price={getSalePrice(product)}
              mrp={product.mrp}
              discount={product.discount}
              image={product.image}
              sizes={product.sizes}
            />

            {/* ==================== PRODUCT INFORMATION ==================== */}
            <div className="mt-10 border-t border-[#e5ded6]">
              {/* Product Details */}
              <div className="border-b border-[#e5ded6] py-5">
                <p className="text-xs uppercase tracking-[0.2em]">
                  Product Details
                </p>

                <p className="mt-3 text-sm leading-7 text-[#6c625a]">
                  Designed by LABEL JIYA with attention to
                  elegant silhouettes, beautiful detailing and
                  contemporary Indian craftsmanship.
                </p>
              </div>

              {/* Shipping */}
              <div className="border-b border-[#e5ded6] py-5">
                <p className="text-xs uppercase tracking-[0.2em]">
                  Shipping & Delivery
                </p>

                <p className="mt-3 text-sm leading-7 text-[#6c625a]">
                  Shipping information will be available here as
                  your LABEL JIYA store is developed.
                </p>
              </div>

              {/* Returns */}
              <div className="py-5">
                <p className="text-xs uppercase tracking-[0.2em]">
                  Returns & Exchanges
                </p>

                <p className="mt-3 text-sm leading-7 text-[#6c625a]">
                  Return and exchange information will be added
                  before the store goes live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BACK TO SHOP ==================== */}
      <section className="border-t border-[#e5ded6] px-6 py-12 text-center">
        <Link
          href="/#collection"
          className="text-xs uppercase tracking-[0.2em] underline underline-offset-4"
        >
          ← Continue Shopping
        </Link>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#292522] px-6 py-12 text-white md:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-2xl tracking-[0.12em]">
            LABEL JIYA
          </h2>

          <p className="mt-3 text-sm text-[#d1c8bf]">
            Contemporary Indian couture designed with elegance,
            craftsmanship and timeless style.
          </p>

          <p className="mt-8 text-xs text-[#a99e94]">
            © 2026 LABEL JIYA. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}