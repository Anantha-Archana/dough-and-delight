"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { OrderNowForm } from "./OrderNowForm";
import { EditMenuModal } from "./EditMenuModal";
import { LuShoppingCart } from "react-icons/lu";
import { useCart } from "@/app/context/cardContext";

interface PriceItem {
  size: string;
  price: number;
}

interface MenuItem {
  id: number;
  itemName: string;
  category: string;
  price: PriceItem[] | string | null;
  image: string;
  description: string;
}

export const MenuSection = ({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange?: (category: string) => void;
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderItem, setOrderItem] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();

  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch("/api/menu/get");
      const result = await res.json();
      if (result.success) setMenuItems(result.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return menuItems;

    return menuItems.filter(
      (item) =>
        item.category?.trim().toLowerCase() ===
        activeCategory.trim().toLowerCase(),
    );
  }, [menuItems, activeCategory]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};

    menuItems.forEach((item) => {
      const cat = item.category || "Others";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });

    return groups;
  }, [menuItems]);

  const parsePrices = (priceData: any): PriceItem[] => {
    if (!priceData) return [];

    if (Array.isArray(priceData)) return priceData;

    if (typeof priceData === "string") {
      try {
        const parsed = JSON.parse(priceData);
        if (Array.isArray(parsed)) return parsed;
        return [{ size: "Price", price: Number(parsed) }];
      } catch {
        return [{ size: "Price", price: Number(priceData) }];
      }
    }

    if (typeof priceData === "number") {
      return [{ size: "Standard", price: priceData }];
    }

    return [];
  };

  return (
    <>
      <div className="w-full py-12 bg-gradient-to-br to-[#6f3e2f] via-[#9c6b46] to-[#f5efe6]">
        {activeCategory === "All" ? (
          <div className="container px-4 md:px-8 space-y-12">
            {Object.entries(groupedItems)
              .filter(([_, items]) => items.length > 0)
              .map(([category, items]) => (
                <div key={category}>
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-5 px-2">
                    <h2 className="text-white text-xl font-bold">{category}</h2>

                    <button
                      onClick={() => onCategoryChange?.(category)}
                      className="text-sm text-white underline hover:text-[#f3d6c6] cursor-pointer"
                    >
                      View More →
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    {items.slice(0, 3).map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="w-[260px] group relative rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:-translate-y-2 hover:shadow-2xl transition-all"
                      >
                        <div className="relative w-full h-40 bg-white">
                          <Image
                            src={
                              item.image.startsWith("/")
                                ? item.image
                                : `/${item.image}`
                            }
                            
                            alt={item.itemName}
                            fill
                            className="object-contain p-3"
                            unoptimized
                          />
                        </div>

                        <div className="p-4 text-center flex flex-col gap-3">
                          <h2 className="text-lg font-bold text-gray-800">
                            {item.itemName}
                          </h2>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex md:grid gap-10 px-4 md:px-8 container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group min-w-[260px] max-w-[260px] md:min-w-0 md:max-w-full relative rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:-translate-y-2 hover:shadow-2xl transition-all"
              >
                <div className="relative w-full h-40 bg-white">
                  <Image
                    src={
                      item.image.startsWith("/") ? item.image : `/${item.image}`
                    }
                    alt={item.itemName}
                    fill
                    className="object-contain p-3"
                    unoptimized
                  />
                </div>

                <div className="p-4 text-center flex flex-col gap-3">
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.itemName}
                  </h2>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#7b4b34] to-[#c08a5a] text-white text-sm "
                    >
                      💰 Price
                    </button>

                    {/* <button
                      onClick={() => setOrderItem(item)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border rounded-full text-sm cursor-pointer"
                    >
                      <LuShoppingCart size="20" />
                      Add
                    </button> */}
                    {/* <button
                      onClick={() => addToCart(item)} // ✅ DONE
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border rounded-full text-sm cursor-pointer"
                    >
                      <LuShoppingCart size="20" />
                      Add
                    </button> */}
                    <button
                      onClick={() => {
                        const prices = parsePrices(item.price);

                        if (!prices.length) return;

                        const selectedPrice = prices[0];

                        addToCart({
                          id: item.id,
                          itemName: item.itemName,
                          image: item.image,
                          price: Number(selectedPrice.price),
                          size: selectedPrice.size,
                        });
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border rounded-full text-sm cursor-pointer"
                    >
                      <LuShoppingCart size="20" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {orderItem && (
        <OrderNowForm
          open={!!orderItem}
          onClose={() => setOrderItem(null)}
          orderItem={orderItem}
        />
      )}

      {/* PRICE MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          />

          <div className="relative z-10 w-[92%] max-w-sm bg-[#fffaf7] rounded-3xl shadow-xl overflow-hidden border border-[#ead7cf]">
            <div className="bg-gradient-to-r from-[#9c6b46] to-[#6f3e2f] text-white text-center px-6 py-5">
              <h2 className="text-2xl font-semibold">
                {selectedItem.itemName}
              </h2>
              <p className="text-sm opacity-90 mt-1">Select your cake size</p>
            </div>

            <div className="p-5 space-y-3">
              {parsePrices(selectedItem.price).map((p, i) => (
                <div
                  key={`${p.size}-${i}`}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-[#ead7cf] hover:bg-[#fdf2ec] transition-all"
                >
                  <span className="font-medium text-[#5b2b1d]">{p.size}</span>
                  <span className="text-[#9c6b46] font-semibold">
                    ₹{p.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-5 pb-5">
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#9c6b46] to-[#6f3e2f] text-white font-medium hover:shadow-md active:scale-95 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <EditMenuModal
        open={isEditOpen}
        item={editItem}
        onClose={() => {
          setIsEditOpen(false);
          setEditItem(null);
        }}
        onUpdate={fetchMenuItems}
      />
    </>
  );
};