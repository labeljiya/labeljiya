import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderItem = {
  name: string;
  size: string;
  quantity: number;
  price: number;
  mrp?: number;
  discount?: number;
};

type PaymentInfo = {
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
};

function formatPrice(value: number) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      orderId,
      customer,
      items,
      subtotal,
      payment,
    }: {
      orderId: string;
      customer: {
        name: string;
        phone: string;
        email: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
      };
      items: OrderItem[];
      subtotal: number;
      payment?: PaymentInfo;
    } = body;

    if (!orderId || !customer || !items) {
      return NextResponse.json(
        { error: "Missing order information" },
        { status: 400 }
      );
    }

    const ownerEmail = process.env.LABEL_JIYA_ORDER_EMAIL;

    if (!ownerEmail) {
      return NextResponse.json(
        { error: "LABEL JIYA order email is not configured" },
        { status: 500 }
      );
    }

    const paymentId =
      payment?.razorpayPaymentId || "Not available";

    const razorpayOrderId =
      payment?.razorpayOrderId || "Not available";

    /* =====================================================
       CUSTOMER ITEMS
    ===================================================== */

    const customerItemsHtml = items
      .map(
        (item: OrderItem) => `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #eee;">
              <strong>${item.name}</strong>
              <br />
              <span style="color:#756b63;font-size:13px;">
                Size ${item.size} × ${item.quantity}
              </span>
            </td>

            <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right;">
              ${formatPrice(item.price * item.quantity)}
            </td>
          </tr>
        `
      )
      .join("");

    /* =====================================================
       CUSTOMER EMAIL
    ===================================================== */

    const customerEmailResult = await resend.emails.send({
      from: "LABEL JIYA <onboarding@resend.dev>",
      to: [customer.email],
      subject: `LABEL JIYA Order Confirmed — ${orderId}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#292522;padding:30px 20px;">

          <h1 style="font-family:Georgia,serif;letter-spacing:4px;">
            LABEL JIYA
          </h1>

          <p style="color:#756b63;">
            Thank you for shopping with LABEL JIYA.
          </p>

          <h2 style="font-weight:400;">
            Order Confirmed ✓
          </h2>

          <p>
            Hi <strong>${customer.name}</strong>,
          </p>

          <p>
            Your payment has been successfully received and your
            LABEL JIYA order has been placed.
          </p>

          <div style="background:#f8f5f1;padding:18px;margin:25px 0;">
            <p style="margin:0 0 8px;">
              <strong>Order Number:</strong> ${orderId}
            </p>

            <p style="margin:0 0 8px;">
              <strong>Payment Status:</strong>
              <span style="color:#55734d;"> PAID</span>
            </p>

            <p style="margin:0;">
              <strong>Payment ID:</strong> ${paymentId}
            </p>
          </div>

          <hr style="border:none;border-top:1px solid #ded6ce;" />

          <h3 style="font-weight:400;">
            Your Order
          </h3>

          <table style="width:100%;border-collapse:collapse;">
            ${customerItemsHtml}
          </table>

          <p style="font-size:18px;margin-top:25px;">
            <strong>Total Paid: ${formatPrice(subtotal)}</strong>
          </p>

          <hr style="border:none;border-top:1px solid #ded6ce;" />

          <h3 style="font-weight:400;">
            Delivery Details
          </h3>

          <p style="line-height:1.7;">
            ${customer.name}<br />
            ${customer.address}<br />
            ${customer.city}, ${customer.state}<br />
            PIN Code: ${customer.pincode}<br />
            WhatsApp: ${customer.phone}
          </p>

          <p style="color:#756b63;font-size:13px;line-height:1.6;">
            We will contact you on WhatsApp with further updates about
            your order and delivery.
          </p>

          <p style="margin-top:40px;">
            Regards,<br />
            <strong>LABEL JIYA</strong>
          </p>

        </div>
      `,
    });

    /* =====================================================
       OWNER ITEMS
    ===================================================== */

    const ownerItemsHtml = items
      .map((item: OrderItem) => {
        const originalPrice =
          item.mrp && item.mrp > 0
            ? item.mrp * item.quantity
            : item.price * item.quantity;

        const salePrice = item.price * item.quantity;

        return `
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #eee;">
              <strong>${item.name}</strong>

              <br />

              <span style="color:#756b63;font-size:13px;">
                Size ${item.size} × ${item.quantity}
              </span>
            </td>

            <td style="padding:14px 0;border-bottom:1px solid #eee;text-align:right;">

              ${
                item.mrp && item.mrp > item.price
                  ? `
                    <div style="font-size:12px;color:#8b8178;text-decoration:line-through;">
                      ${formatPrice(originalPrice)}
                    </div>
                  `
                  : ""
              }

              <div style="font-weight:bold;">
                ${formatPrice(salePrice)}
              </div>

              ${
                item.discount && item.discount > 0
                  ? `
                    <div style="font-size:12px;color:#8b7355;margin-top:4px;">
                      ${item.discount}% OFF
                    </div>
                  `
                  : ""
              }

            </td>
          </tr>
        `;
      })
      .join("");

    /* =====================================================
       OWNER EMAIL
    ===================================================== */

    const ownerEmailResult = await resend.emails.send({
      from: "LABEL JIYA <onboarding@resend.dev>",
      to: [ownerEmail],
      subject: `NEW PAID ORDER — LABEL JIYA — ${orderId}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#292522;padding:30px 20px;">

          <h1 style="font-family:Georgia,serif;letter-spacing:4px;">
            LABEL JIYA
          </h1>

          <h2 style="font-weight:400;">
            New Paid Order Received ✓
          </h2>

          <div style="background:#f8f5f1;padding:18px;margin:20px 0;">

            <p style="margin:0 0 8px;">
              <strong>Order Number:</strong> ${orderId}
            </p>

            <p style="margin:0 0 8px;">
              <strong>Payment Status:</strong>
              <span style="color:#55734d;"> PAID</span>
            </p>

            <p style="margin:0 0 8px;">
              <strong>Razorpay Payment ID:</strong>
              ${paymentId}
            </p>

            <p style="margin:0;">
              <strong>Razorpay Order ID:</strong>
              ${razorpayOrderId}
            </p>

          </div>

          <hr style="border:none;border-top:1px solid #ded6ce;" />

          <h3 style="font-weight:400;">
            Customer Information
          </h3>

          <table style="width:100%;border-collapse:collapse;">

            <tr>
              <td style="padding:6px 0;color:#756b63;">
                Name
              </td>
              <td style="padding:6px 0;">
                ${customer.name}
              </td>
            </tr>

            <tr>
              <td style="padding:6px 0;color:#756b63;">
                WhatsApp
              </td>
              <td style="padding:6px 0;">
                ${customer.phone}
              </td>
            </tr>

            <tr>
              <td style="padding:6px 0;color:#756b63;">
                Email
              </td>
              <td style="padding:6px 0;">
                ${customer.email}
              </td>
            </tr>

          </table>

          <h3 style="font-weight:400;margin-top:30px;">
            Delivery Address
          </h3>

          <p style="line-height:1.7;">
            ${customer.address}<br />
            ${customer.city}, ${customer.state}<br />
            PIN Code: ${customer.pincode}
          </p>

          <hr style="border:none;border-top:1px solid #ded6ce;" />

          <h3 style="font-weight:400;">
            Order Items
          </h3>

          <table style="width:100%;border-collapse:collapse;">
            ${ownerItemsHtml}
          </table>

          <div style="margin-top:25px;padding:18px;background:#f8f5f1;">

            <div style="font-size:12px;color:#756b63;">
              TOTAL PAID
            </div>

            <div style="font-size:22px;margin-top:5px;">
              ${formatPrice(subtotal)}
            </div>

          </div>

          <p style="margin-top:30px;color:#756b63;font-size:13px;">
            Customer has completed payment successfully.
            Please contact the customer on WhatsApp for order
            and delivery coordination.
          </p>

          <p style="margin-top:35px;">
            <strong>LABEL JIYA</strong>
          </p>

        </div>
      `,
    });

    console.log("CUSTOMER EMAIL:", customerEmailResult);
    console.log("OWNER EMAIL:", ownerEmailResult);

    return NextResponse.json({
      success: true,
      message: "Order confirmation emails sent successfully",
    });

  } catch (error) {
    console.error("RESEND ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to send order emails",
      },
      { status: 500 }
    );
  }
}