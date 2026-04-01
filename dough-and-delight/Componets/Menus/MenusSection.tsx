"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { OrderNowForm } from "./OrderNowForm";
import { EditMenuModal } from "./EditMenuModal";
import { LuShoppingCart } from "react-icons/lu";

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

export const MenuSection = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderItem, setOrderItem] = useState<MenuItem | null>(null);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  console.log("editItem", editItem);
  
  const fetchMenuItems = async () => {
    try {
      const res = await fetch("/api/menu/get");
      const result = await res.json();
      console.log("result", result);

      if (result.success) setMenuItems(result.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const parsePrices = (priceData: any): PriceItem[] => {
    if (!priceData) return [];

    if (Array.isArray(priceData)) return priceData;

    if (typeof priceData === "string") {
      try {
        const parsed = JSON.parse(priceData);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  return (
    <>
      <div
        id="menu-scroll"
        className="w-full py-12 overflow-x-auto md:overflow-visible no-scrollbar bg-gradient-to-br to-[#6f3e2f] via-[#9c6b46] to-[#f5efe6]"
      >
        <div className="flex md:grid gap-10 px-4 md:px-8 container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="group min-w-[260px] max-w-[260px] md:min-w-0 md:max-w-full relative rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative w-full h-40 sm:h-44 md:h-50 overflow-hidden bg-white">
                <Image
                  src={
                    item.image.startsWith("/")
                      ? item.image
                      : `/${item.image}`
                  }
                  alt={item.itemName}
                  fill
                  sizes="(max-width:768px) 100vw, 300px"
                  className="object-contain p-3"
                  unoptimized
                />

                <button
                  onClick={() => setEditItem(item)}
                  className="absolute top-2 right-2 bg-white/90 px-3 py-1 text-xs rounded-full shadow hover:bg-white"
                >
                  ✏️ Edit
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/20 blur-xl rounded-full"></div>
              </div>

              <div className="p-4 text-center flex flex-col gap-3">
                <h2 className="text-lg font-bold text-gray-800 tracking-wide">
                  {item.itemName}
                </h2>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-gradient-to-r from-[#7b4b34] via-[#9c6b46] to-[#c08a5a] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all duration-300"
                  >
                    💰 Price
                  </button>

                  <button
                    onClick={() => setOrderItem(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-full border border-[#9c6b46] text-[#6f3e2f] text-sm font-semibold bg-white hover:bg-[#fff1e7] hover:shadow-md hover:scale-[1.03] active:scale-95 transition-all duration-300"
                  >
                    <LuShoppingCart size="25" className="text-black" />
                      Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
              <p className="text-sm opacity-90 mt-1">
                Select your cake size
              </p>
            </div>

            <div className="p-5 space-y-3">
              {parsePrices(selectedItem.price).map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-[#ead7cf] hover:bg-[#fdf2ec] transition-all"
                >
                  <span className="font-medium text-[#5b2b1d]">
                    {p.size}
                  </span>
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

      {orderItem && (
        <OrderNowForm
          open={!!orderItem}
          onClose={() => setOrderItem(null)}
          orderItem={orderItem}
        />
      )}

      {editItem && (
        <EditMenuModal
          open={!!editItem}
          item={editItem}
          onClose={() => setEditItem(null)}
          onUpdate={fetchMenuItems}
        />
      )}
    </>
  );
};