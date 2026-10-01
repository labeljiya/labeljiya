import { CartButton } from "components/cart/cart-button";
import { CollectionCarousel } from "components/collection-carousel";
import { HeroSlideshow } from "components/hero-slideshow";
import { MobileMenu } from "components/mobile-menu";
import { WhatsAppButton } from "components/whats-app-button";
import {
  categories,
  getSalePrice,
  products,
  saleProducts,
} from "lib/products";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "LABEL JIYA | Designer Women's Suits",
  description:
    "Discover elegant designer suits, festive wear and contemporary Indian fashion from LABEL JIYA.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#292522]">
      {/* ==================== HEADER ==================== */}
      <header className="border-b border-[#e5ded6] bg-[#faf8f5]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo/label-jiya-logo.png"
              alt="LABEL JIYA"
              width={80}
              height={80}
              priority
              className="h-14 w-14 object-contain md:h-16 md:w-16"
            />

            <span className="font-serif text-xl tracking-[0.12em] md:text-2xl">
              LABEL JIYA
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#collection"
              className="text-xs uppercase tracking-[0.15em] hover:opacity-60"
            >
              New Arrivals
            </a>

            <a
              href="#categories"
              className="text-xs uppercase tracking-[0.15em] hover:opacity-60"
            >
              Collections
            </a>

            <a
              href="#story"
              className="text-xs uppercase tracking-[0.15em] hover:opacity-60"
            >
              Our Story
            </a>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-5 md:flex">
            <CartButton />
            <WhatsAppButton />
          </div>

          {/* Mobile menu */}
          <MobileMenu />
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-[#e9e1d8]">
        <div className="mx-auto grid min-h-[620px] w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-10">
          <div className="max-w-xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-[#8b7355]">
              Contemporary Indian Couture
            </p>

            <h1 className="font-serif text-5xl leading-tight md:text-7xl">
              The Art of
              <br />
              <span className="italic">Elegance</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[#625a53]">
              Discover beautifully crafted designer suits made for
              celebrations, unforgettable evenings and every special moment.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#collection"
                className="bg-[#292522] px-7 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#4a4039]"
              >
                Shop Collection
              </a>

              <a
                href="#categories"
                className="border border-[#292522] px-7 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-white"
              >
                Explore
              </a>
            </div>
          </div>

          {/* Hero image */}
          <HeroSlideshow products={products} />
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10"
      >
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b7355]">
            Discover
          </p>

          <h2 className="mt-3 font-serif text-4xl md:text-5xl">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const slug = category
              .toLowerCase()
              .replace(/\s+/g, "-");

            return (
              <Link
                key={category}
                href={`/collections/${slug}`}
                className="group flex min-h-56 flex-col justify-end bg-[#e8dfd5] p-7 transition hover:-translate-y-1 hover:bg-[#ded2c5]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#8b7355]">
                  Collection
                </p>

                <h3 className="mt-2 font-serif text-2xl">
                  {category}
                </h3>

                <p className="mt-2 text-sm text-[#6c625a]">
                  Discover the LABEL JIYA collection.
                </p>

                <span className="mt-5 text-xs uppercase tracking-[0.2em] underline underline-offset-4">
                  Explore →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ==================== NEW ARRIVALS ==================== */}
      <section
        id="collection"
        className="bg-white px-6 py-20 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8b7355]">
                Just Arrived
              </p>

              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                New Arrivals
              </h2>
            </div>

            <a
              href="#collection"
              className="hidden text-xs uppercase tracking-[0.2em] underline md:block"
            >
              View All
            </a>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((product) => product.discount === 0)
              .map((product) => (
                <article
                  key={product.id}
                  className="group"
                >
                  {/* Product image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#eee8e1]">
                    <span className="absolute left-4 top-4 z-10 bg-white px-3 py-1 text-[10px] tracking-[0.15em]">
                      {product.category}
                    </span>

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Quick view */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white/95 p-4 text-center transition duration-300 group-hover:translate-y-0">
                      <Link
                        href={`/product/${product.id}`}
                        className="block text-xs uppercase tracking-[0.2em]"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>

                  {/* Product information */}
                  <div className="pt-4">
                    <h3 className="font-serif text-xl">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">
                        ₹
                        {getSalePrice(product).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-[#81766c]">
                      {product.description}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* ==================== CLEARANCE SALE ==================== */}
      {saleProducts.length > 0 && (
        <section className="bg-[#292522] px-6 py-20 text-white md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9b08c]">
                  Limited Time
                </p>

                <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                  Clearance Sale
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#c8c0b8]">
                  Selected LABEL JIYA styles at special prices.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {saleProducts.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#3b3530]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    <div className="absolute left-3 top-3 bg-white px-3 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#292522]">
                      {product.discount}% OFF
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-serif text-lg">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span className="text-sm text-[#a9a19a] line-through">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>

                      <span className="text-sm">
                        ₹
                        {getSalePrice(product).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/collections/sale"
                className="inline-flex items-center gap-3 border border-white/30 px-7 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-[#292522]"
              >
                View Sale Collection
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ==================== COLLECTION BANNER ==================== */}
      <CollectionCarousel products={products} />

      {/* ==================== BRAND STORY ==================== */}
      <section
        id="story"
        className="px-6 py-24 text-center md:px-10"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b7355]">
            Our Story
          </p>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Made for the woman who loves timeless elegance.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#625a53]">
            LABEL JIYA brings together contemporary design, beautiful
            craftsmanship and the richness of Indian fashion to create pieces
            that feel special today and timeless tomorrow.
          </p>

          <a
            href="#collection"
            className="mt-8 inline-block border border-[#292522] px-8 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-[#292522] hover:text-white"
          >
            Discover LABEL JIYA
          </a>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="bg-[#292522] px-6 py-20 text-center text-white md:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#cbbba8]">
            Stay Connected
          </p>

          <h2 className="mt-4 font-serif text-4xl">
            Join the LABEL JIYA world.
          </h2>

          <p className="mt-4 leading-7 text-[#d1c8bf]">
            Be the first to discover new collections, exclusive launches and
            special offers.
          </p>

          <div className="mt-8 leading-7 text-[#d1c8bf]">          

            <a
              href="https://chat.whatsapp.com/C544PWikJsgIGfubROmHud"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-7 py-3 text-xs uppercase tracking-[0.2em] text-[#292522]"
            >
              Join LABEL JIYA WhatsApp Group
            </a>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT US - FOOTER ==================== */}
      <footer className="bg-[#faf8f5] px-6 py-10 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b7355]">
            Customer Care
          </p>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Contact Us
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#756b63]">
            Have a question about an order, size, product or delivery?
            We&apos;re happy to help.
          </p>

          {/* Email */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8b7355]">
              Email
            </p>

            <a
              href="mailto:rakesh.mcfisro@gmail.com"
              className="mt-2 inline-block text-sm text-[#292522] underline underline-offset-4 transition hover:text-[#8b7355]"
            >
              labeljiya@gmail.com
            </a>
          </div>

          {/* WhatsApp */}
          <div className="mt-8 flex justify-center">
            <WhatsAppButton />
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-[#e5ded6] pt-6 text-center text-xs text-[#81766c]">
          © {new Date().getFullYear()} LABEL JIYA. All rights reserved.
        </div>
      </footer>

      
      
    </main>
  );
}