"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";

import { useCart } from "components/cart/cart-context";
import { WhatsAppButton } from "components/whats-app-button";
import { createOrder, Order } from "lib/orders/orders";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  async function handlePayment(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    try {
      if (!items.length) {
        alert("Your bag is empty.");
        return;
      }

      const form = event.currentTarget.form;

      if (!form) {
        alert("Checkout form could not be found.");
        return;
      }

      // Validate all required checkout fields
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

      // Create Razorpay order
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: subtotal,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error("PAYMENT ORDER ERROR:", data);

        alert(
          "Unable to start payment. Please try again."
        );

        return;
      }

      const RazorpayCheckout = (
        window as Window & {
          Razorpay?: new (
            options: Record<string, unknown>
          ) => {
            open: () => void;
          };
        }
      ).Razorpay;

      if (!RazorpayCheckout) {
        alert(
          "Payment system is still loading. Please try again."
        );

        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "LABEL JIYA",
        description: "Designer Women's Suits",
        order_id: data.orderId,

        prefill: {
          name: customer.name,
          email: customer.email,
          contact: `+91${customer.phone}`,
        },

        notes: {
          customer_name: customer.name,
          whatsapp: customer.phone,
        },

        theme: {
          color: "#292522",
        },

        handler: async function (paymentResponse: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            console.log(
              "RAZORPAY PAYMENT:",
              paymentResponse
            );

            // Verify Razorpay payment on our server
            const verifyResponse = await fetch(
              "/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentResponse),
              }
            );

            const verifyResult =
              await verifyResponse.json();

            if (
              !verifyResponse.ok ||
              !verifyResult.success
            ) {
              console.error(
                "PAYMENT VERIFICATION ERROR:",
                verifyResult
              );

              alert(
                "Payment could not be verified. Please contact LABEL JIYA."
              );

              return;
            }

            console.log(
              "PAYMENT VERIFIED:",
              verifyResult
            );

            // Create LABEL JIYA order
            const newOrder = createOrder(
              customer,
              items,
              subtotal
            );

            console.log(
              "LABEL JIYA ORDER:",
              newOrder
            );

            // Send order emails
            const orderResponse = await fetch(
              "/api/orders",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderId: newOrder.id,
                  customer: newOrder.customer,
                  items: newOrder.items,
                  subtotal: newOrder.subtotal,

                  payment: {
                    razorpayPaymentId:
                      paymentResponse.razorpay_payment_id,

                    razorpayOrderId:
                      paymentResponse.razorpay_order_id,
                  },
                }),
              }
            );

            const orderResult =
              await orderResponse.json();

            if (!orderResponse.ok) {
              console.error(
                "ORDER EMAIL ERROR:",
                orderResult
              );

              // Payment succeeded even though email failed.
              alert(
                "Payment successful. Your order has been received, but the confirmation email could not be sent. LABEL JIYA will contact you on WhatsApp."
              );
            } else {
              console.log(
                "LABEL JIYA EMAIL:",
                orderResult
              );
            }

            // Show confirmation
            setOrder(newOrder);
            setOrderPlaced(true);
            clearCart();
          } catch (error) {
            console.error(
              "POST-PAYMENT ERROR:",
              error
            );

            alert(
              "Payment was successful, but there was a problem completing your order. Please contact LABEL JIYA."
            );
          }
        },

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay checkout closed."
            );
          },
        },
      };

      const razorpay =
        new RazorpayCheckout(options);

      razorpay.open();
    } catch (error) {
      console.error(
        "PAYMENT ERROR:",
        error
      );

      alert(
        "Something went wrong while starting payment."
      );
    }
  }

  /* =========================================================
     ORDER CONFIRMED
  ========================================================= */

  if (orderPlaced && order) {
    return (
      <main className="min-h-screen bg-[#f8f5f1] text-[#292522]">
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* Header */}
        <header className="border-b border-[#ded6ce]">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-5">
            <Link
              href="/"
              className="flex items-center gap-4"
            >
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
          </div>
        </header>

        {/* Confirmation */}
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#292522] text-2xl text-white">
            ✓
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-[#756b63]">
            Order Confirmed
          </p>

          <h1 className="mt-3 text-4xl font-light md:text-5xl">
            Thank You
          </h1>

          <p className="mt-5 text-sm text-[#756b63]">
            Order Number
          </p>

          <p className="mt-2 text-lg tracking-[0.15em]">
            {order.id}
          </p>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#756b63]">
            Your payment has been received and your
            LABEL JIYA order has been placed successfully.
            We will contact you on WhatsApp shortly
            regarding order confirmation and shipping
            updates.
          </p>

          {/* Order Summary */}
          <div className="mx-auto mt-10 max-w-md border border-[#ded6ce] bg-white p-6 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-[#756b63]">
                Customer
              </span>

              <span>{order.customer.name}</span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-[#756b63]">
                Items
              </span>

              <span>
                {order.items.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-[#756b63]">
                Total
              </span>

              <span>
                ₹
                {order.subtotal.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-[#756b63]">
                Status
              </span>

              <span className="uppercase tracking-wider">
                {order.status}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-[#756b63]">
                Payment
              </span>

              <span className="uppercase tracking-wider">
                Paid
              </span>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <WhatsAppButton
              message={`Hello LABEL JIYA, I have placed and paid for an order.

Order Number: ${order.id}

Customer: ${order.customer.name}
Phone: ${order.customer.phone}
Email: ${order.customer.email}

Delivery Address:
${order.customer.address}
${order.customer.city}, ${order.customer.state}
PIN Code: ${order.customer.pincode}

Items:
${order.items
  .map(
    (item) =>
      `${item.name} — Size ${item.size} × ${item.quantity} — ₹${(
        item.price * item.quantity
      ).toLocaleString("en-IN")}`
  )
  .join("\n")}

Total Paid: ₹${order.subtotal.toLocaleString(
                "en-IN"
              )}

My payment has been completed. Please confirm my order and shipping details.`}
            />

            <Link
              href="/"
              className="text-xs uppercase tracking-[0.18em] underline underline-offset-4"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /* =========================================================
     EMPTY BAG
  ========================================================= */

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f5f1] text-[#292522]">
        {/* Header */}
        <header className="border-b border-[#ded6ce]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
            <Link
              href="/"
              className="flex items-center gap-4"
            >
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

        {/* Empty Bag */}
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

  /* =========================================================
     CHECKOUT
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#f8f5f1] text-[#292522]">
      {/* Razorpay Checkout Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {/* Header */}
      <header className="border-b border-[#ded6ce]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-4"
          >
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

      {/* Checkout */}
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
            {/* Delivery Details */}
            <div className="border border-[#ded6ce] bg-white p-6 lg:p-8">
              <h2 className="text-xl font-light">
                Delivery Details
              </h2>

              <div className="mt-8 grid gap-6">
                {/* Name */}
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

                {/* Phone + Email */}
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
                      Please enter the WhatsApp number we
                      can use to contact you about your order.
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

                {/* Address */}
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

                {/* City / State / PIN */}
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

            {/* Order Summary */}
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
                          ₹
                          {(
                            item.mrp * item.quantity
                          ).toLocaleString("en-IN")}
                        </p>
                      )}

                      <p className="font-medium">
                        ₹
                        {(
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
                <span className="text-[#756b63]">
                  Subtotal
                </span>

                <span>
                  ₹
                  {subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="mt-4 flex justify-between text-sm">
                <span className="text-[#756b63]">
                  Shipping
                </span>

                <span>To be confirmed</span>
              </div>

              <div className="my-7 border-t border-[#ded6ce]" />

              <div className="flex justify-between">
                <span className="text-sm uppercase tracking-[0.15em]">
                  Total
                </span>

                <span className="text-xl">
                  ₹
                  {subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                className="mt-7 w-full bg-[#292522] px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#4a4039]"
              >
                Pay Now — ₹
                {subtotal.toLocaleString("en-IN")}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-[#756b63]">
                Secure payment powered by Razorpay.
                Your order will be sent to LABEL JIYA
                after payment is successfully verified.
              </p>
            </aside>
          </div>
        </form>
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