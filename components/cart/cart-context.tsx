"use client";

import { products } from "lib/products";
import {
  createContext,
  ReactNode,
  useCallback,
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

export type StockCorrection = {
  id: string;
  size: string;
  requested: number;
  available: number;
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
  correctStock: () => StockCorrection[];
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

function getAvailableStock(id: string, size: string): number {
  const product = products.find((item) => item.id === id);

  if (!product) return 0;

  const sizeStock = product.sizes.find(
    (item) => item.size === size
  );

  return sizeStock?.quantity ?? 0;
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load the saved cart once when the component mounts.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("label-jiya-cart");

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setItems(parsedCart as CartItem[]);
        }
      }
    } catch {
      console.error("Could not load cart.");
    }

    setLoaded(true);
  }, []);

  // Save cart changes after the initial load.
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        "label-jiya-cart",
        JSON.stringify(items)
      );
    } catch {
      console.error("Could not save cart.");
    }
  }, [items, loaded]);

  // Add one item, without exceeding the available stock.
  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      const available = getAvailableStock(item.id, item.size);

      if (available <= 0) return;

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size
        );

        if (existingItem) {
          if (existingItem.quantity >= available) {
            return currentItems;
          }

          return currentItems.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size
              ? {
                  ...cartItem,
                  quantity: Math.min(
                    available,
                    cartItem.quantity + 1
                  ),
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
    },
    []
  );

  const removeItem = useCallback(
    (id: string, size: string) => {
      setItems((currentItems) =>
        currentItems.filter(
          (item) => !(item.id === id && item.size === size)
        )
      );
    },
    []
  );

  // Update quantity, capped at the current stock.
  const updateQuantity = useCallback(
    (id: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id, size);
        return;
      }

      const available = getAvailableStock(id, size);

      setItems((currentItems) =>
        currentItems
          .map((item) =>
            item.id === id && item.size === size
              ? {
                  ...item,
                  quantity: Math.min(quantity, available),
                }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    [removeItem]
  );

  // Return corrections synchronously and update the cart separately.
  const correctStock = useCallback((): StockCorrection[] => {
    const corrections: StockCorrection[] = [];

    const correctedItems = items
      .map((item) => {
        const available = getAvailableStock(item.id, item.size);

        if (item.quantity > available) {
          corrections.push({
            id: item.id,
            size: item.size,
            requested: item.quantity,
            available,
          });

          return {
            ...item,
            quantity: available,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    if (corrections.length > 0) {
      setItems(correctedItems);
    }

    return corrections;
  }, [items]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
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
        correctStock,
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
