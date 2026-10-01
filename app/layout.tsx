import { CartProvider } from "components/cart/cart-context";
import { GeistSans } from "geist/font/sans";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LABEL JIYA | Designer Women's Suits",
    template: "%s | LABEL JIYA",
  },
  description:
    "LABEL JIYA — Luxury designer women's suits, anarkali, festive and wedding collections.",
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}