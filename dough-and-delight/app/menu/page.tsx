"use client";

import { MenuBanner } from "@/Componets/Menus/MenuBanner";
import { Menus } from "@/Componets/Menus/Menus";
import { MenuSection } from "@/Componets/Menus/MenusSection";

const MenuPage = () => {
  return (
    <>
      <MenuBanner />
      <Menus />
      <MenuSection />
    </>
  );
};

export default MenuPage;
