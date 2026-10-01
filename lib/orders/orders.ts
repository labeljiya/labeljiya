export type OrderItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

export type Order = {
  id: string;
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
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
};

export function createOrder(
  customer: Order["customer"],
  items: OrderItem[],
  subtotal: number
): Order {
  return {
    id: `LJ-${Date.now()}`,
    customer,
    items,
    subtotal,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}