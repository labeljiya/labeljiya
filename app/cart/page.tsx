"use client";

import { useCart } from "components/cart/cart-context";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
  } = useCart();

  return (
    <main className="min-h-screen bg-[#f8f5f1] text-[#292522]">
      {/* Header */}
      <header className="border-b border-[#ded6ce] bg-[#f8f5f1]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
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
            Continue Shopping
          </Link>
        </div>
      </header>

      {/* Cart */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#756b63]">
            Your Selection
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight md:text-5xl">
            Shopping Bag
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="border border-[#ded6ce] bg-white px-6 py-20 text-center">
            <p className="text-2xl font-light">
              Your bag is empty.
            </p>

            <p className="mt-3 text-sm text-[#756b63]">
              Discover our latest designer collections.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block bg-[#292522] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039]"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-5 border-b border-[#ded6ce] pb-6"
                >
                  <div className="relative h-40 w-32 shrink-0 overflow-hidden bg-[#eee8e1]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-medium">
                            {item.name}
                          </h2>

                          <p className="mt-2 text-sm text-[#756b63]">
                            Size: {item.size}
                          </p>
                        </div>
                            <div className="text-right">
                              {item.discount > 0 && (
                                <p className="text-xs text-[#8b8178] line-through">
                                  ₹{(item.mrp * item.quantity).toLocaleString("en-IN")}
                                </p>
                              )}

                              <p className="text-sm font-medium">
                                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                              </p>

                              {item.discount > 0 && (
                                <p className="mt-1 text-xs text-[#8b7355]">
                                  {item.discount}% OFF
                                </p>
                              )}
                            </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#cfc5bb]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="px-4 py-2 text-lg hover:bg-[#eee8e1]"
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center text-sm">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="px-4 py-2 text-lg hover:bg-[#eee8e1]"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.id, item.size)
                        }
                        className="text-xs uppercase tracking-[0.15em] text-[#756b63] underline underline-offset-4 hover:text-[#292522]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <button
                type="button"
                onClick={clearCart}
                className="text-xs uppercase tracking-[0.15em] text-[#756b63] underline underline-offset-4"
              >
                Clear Bag
              </button>
            </div>

            {/* Summary */}
            <aside className="h-fit border border-[#ded6ce] bg-white p-7 lg:p-8">
              <h2 className="text-xl font-light">
                Order Summary
              </h2>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#756b63]">
                    Subtotal
                  </span>

                  <span>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#756b63]">
                    Shipping
                  </span>

                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="my-6 border-t border-[#ded6ce]" />

              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.15em]">
                  Total
                </span>

                <span className="text-xl">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <Link
                  href="/checkout"
                  className="mt-8 block w-full bg-[#292522] px-8 py-4 text-center text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039]"
                >
                  Proceed to Checkout
                </Link>

              <p className="mt-4 text-center text-xs leading-5 text-[#756b63]">
                Secure checkout and payment options will be
                connected next.
              </p>
            </aside>
          </div>
        )}
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