"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  mrp: number;
  discount: number;
  image: string;
  size: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart from the browser
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("label-jiya-cart");

      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch {
      console.error("Could not load cart.");
    }

    setLoaded(true);
  }, []);

  // Save cart to the browser
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "label-jiya-cart",
      JSON.stringify(items)
    );
  }, [items, loaded]);

  function addItem(item: Omit<CartItem, "quantity">) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  }

  function removeItem(id: string, size: string) {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => !(item.id === id && item.size === size)
      )
    );
  }

  function updateQuantity(
    id: string,
    size: string,
    quantity: number
  ) {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.size === size
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      ),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}