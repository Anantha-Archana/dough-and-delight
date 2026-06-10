"use client";

import { useState, useEffect } from "react";
import { menus } from "..";
import { AddMenuModal } from "./AddMenuModal";
import { MenuSection } from "./MenusSection";

export const Menus = () => {
  const [active, setActive] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (menus.length > 0) {
      setActive(menus[0].name);
    }
  }, []);

  return (
    <section className="w-full bg-[#f3ebe6] py-6 cursor-pointer">
      <div className="max-w-7xl mx-auto container cursor-pointer">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex gap-6 flex-wrap">
            {menus.map((menu, index) => (
              <button
                key={`${menu.id}-${menu.name}-${index}`}
                onClick={() => setActive(menu.name)}
                className={`px-5 py-2 rounded-full ${
                  active === menu.name ? "bg-[#e6c5b5]" : ""
                } cursor-pointer`}
              >
                {menu.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#823920] text-white px-6 py-2 rounded-full cursor-pointer"
          >
            + Add Menu Item
          </button>
        </div>

        <AddMenuModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => setIsModalOpen(false)}
        />
      </div>

      {/* {active && <MenuSection activeCategory={active} />} */}
      {active && (
        <MenuSection activeCategory={active} onCategoryChange={setActive} />
      )}
    </section>
  );
};