"use client";

import { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  itemName: string;
  image: string;
  price: number;
  size?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  totalCount: number;

  addToCart: (item: any) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;

  cartOpen: boolean;
  selectedItem: any;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);

      if (exist) {
        return prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + 1,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          itemName: item.itemName,
          image: item.image,
          price: Number(item.price) || 0,
          size: item.size || "",
          quantity: 1,
        },
      ];
    });

    setSelectedItem(item);
    setCartOpen(true);
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
    setSelectedItem(null);
    setCartOpen(false);
  };

  const totalCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalCount,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        openCart,
        closeCart,
        cartOpen,
        selectedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return ctx;
};
