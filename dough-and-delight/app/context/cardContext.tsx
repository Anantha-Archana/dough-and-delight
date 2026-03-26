"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: number;
  itemName: string;
  image: string;
  size?: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (id: number) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.size === item.size,
      );

      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }

      return [...prev, item];
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("Cart context missing");
  return ctx;
};
