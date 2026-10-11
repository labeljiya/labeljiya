
"use client";

import { useCart } from "components/cart/cart-context";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  function handleWhatsAppOrder(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (!items.length) {
      alert("Your bag is empty.");
      return;
    }

    const form = event.currentTarget.form;

    if (!form) {
      alert("Checkout form could not be found.");
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    const customer = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      address: String(formData.get("address") || ""),
      city: String(formData.get("city") || ""),
      state: String(formData.get("state") || ""),
      pincode: String(formData.get("pincode") || ""),
    };

    const orderDetails = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}
Size: ${item.size}
Quantity: ${item.quantity}
Unit Price: ₹${item.price.toLocaleString("en-IN")}
Item Total: ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n\n");

    const message = `NEW ORDER - LABEL JIYA

CUSTOMER DETAILS
Name: ${customer.name}
WhatsApp Number: ${customer.phone}
Email: ${customer.email}

DELIVERY ADDRESS
${customer.address}
City: ${customer.city}
State: ${customer.state}
PIN Code: ${customer.pincode}

ORDER DETAILS
${orderDetails}

Subtotal: ₹${subtotal.toLocaleString("en-IN")}
Shipping: To be confirmed
TOTAL: ₹${subtotal.toLocaleString("en-IN")}

Please confirm product availability, shipping charges and payment details. Thank you!`;

    const whatsappUrl = `https://wa.me/916360833532?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = whatsappUrl;
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f5f1] text-[#292522]">
        <header className="border-b border-[#ded6ce]">
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
              href="/cart"
              className="text-xs uppercase tracking-[0.18em] underline underline-offset-4"
            >
              Back to Bag
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="text-3xl font-light">
            Your bag is empty
          </h1>
          <p className="mt-4 text-sm text-[#756b63]">
            Add a product to your bag before checking out.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block bg-[#292522] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039]"
          >
            Shop Collection
          </Link>
        </section>

        <footer className="border-t border-[#ded6ce] px-6 py-10 text-center">
          <p className="text-xs tracking-[0.25em] text-[#756b63]">
            © {new Date().getFullYear()} LABEL JIYA
          </p>
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5f1] text-[#292522]">
      <header className="border-b border-[#ded6ce]">
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
            href="/cart"
            className="text-xs uppercase tracking-[0.18em] underline underline-offset-4"
          >
            Back to Bag
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#756b63]">
            LABEL JIYA
          </p>
          <h1 className="mt-3 text-4xl font-light tracking-tight md:text-5xl">
            Checkout
          </h1>
        </div>

        <form>
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="border border-[#ded6ce] bg-white p-6 lg:p-8">
              <h2 className="text-xl font-light">
                Delivery Details
              </h2>

              <div className="mt-8 grid gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-[0.15em]"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-2 w-full border border-[#cfc5bb] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#292522]"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-xs uppercase tracking-[0.15em]"
                    >
                      WhatsApp Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      required
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      autoComplete="tel"
                      className="mt-2 w-full border border-[#cfc5bb] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#292522]"
                      placeholder="Enter 10-digit WhatsApp number"
                    />
                    <p className="mt-2 text-xs text-[#756b63]">
                      Enter the WhatsApp number we can use to contact you.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs uppercase tracking-[0.15em]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-2 w-full border border-[#cfc5bb] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#292522]"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="text-xs uppercase tracking-[0.15em]"
                  >
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={4}
                    autoComplete="street-address"
                    className="mt-2 w-full resize-none border border-[#cfc5bb] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#292522]"
                    placeholder="House / Flat number, street, area"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="city"
                      className="text-xs uppercase tracking-[0.15em]"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      autoComplete="address-level2"
                      className="mt-2 w-full border border-[#cfc5bb] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#292522]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="text-xs uppercase tracking-[0.15em]"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      required
                      autoComplete="address-level1"
                      className="mt-2 w-full border border-[#cfc5bb] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#292522]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="text-xs uppercase tracking-[0.15em]"
                    >
                      PIN Code
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      autoComplete="postal-code"
                      className="mt-2 w-full border border-[#cfc5bb] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#292522]"
                      placeholder="000000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <aside className="h-fit border border-[#ded6ce] bg-white p-7 lg:p-8">
              <h2 className="text-xl font-light">
                Your Order
              </h2>

              <div className="mt-7 space-y-5">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <div>
                      <p>{item.name}</p>
                      <p className="mt-1 text-xs text-[#756b63]">
                        Size {item.size} × {item.quantity}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      {item.discount > 0 && (
                        <p className="text-xs text-[#8b8178] line-through">
                          ₹{(
                            item.mrp * item.quantity
                          ).toLocaleString("en-IN")}
                        </p>
                      )}
                      <p className="font-medium">
                        ₹{(
                          item.price * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>
                      {item.discount > 0 && (
                        <p className="mt-1 text-xs text-[#8b7355]">
                          {item.discount}% OFF
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-7 border-t border-[#ded6ce]" />

              <div className="flex justify-between text-sm">
                <span className="text-[#756b63]">Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="mt-4 flex justify-between text-sm">
                <span className="text-[#756b63]">Shipping</span>
                <span>To be confirmed</span>
              </div>

              <div className="my-7 border-t border-[#ded6ce]" />

              <div className="flex justify-between">
                <span className="text-sm uppercase tracking-[0.15em]">
                  Total
                </span>
                <span className="text-xl">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="mt-7 w-full bg-[#292522] px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039]"
              >
                Place Order on WhatsApp
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-[#756b63]">
                Your order details will open in WhatsApp.
                Review and send the message to place your order.
                Shipping charges and payment will be confirmed by LABEL JIYA.
              </p>
            </aside>
          </div>
        </form>
      </section>

      <footer className="border-t border-[#ded6ce] px-6 py-10 text-center">
        <p className="text-xs tracking-[0.25em] text-[#756b63]">
          © {new Date().getFullYear()} LABEL JIYA
        </p>
      </footer>
    </main>
  );
}
