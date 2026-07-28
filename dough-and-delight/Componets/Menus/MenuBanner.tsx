"use client";

import { useEffect } from "react";
import AOS from "aos";
// import "aos/dist/aos.css";
import Image from "next/image";

const logo = "/dough-and-doughts.png";
const menuBannerImg = "/menu-banner-imgs.png";

export const MenuBanner = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });

    AOS.refresh();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      data-aos="fade-in"
    >
      <div>
        <div
          className="relative w-full h-[320px] md:h-[400px]"
          data-aos="zoom-out"
        >
          <img
            src={menuBannerImg}
            alt="Dough & Delight Menu"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-5">
          
          
          <div data-aos="zoom-in" data-aos-delay="200">
            <Image
              src={logo}
              alt="Dough & Delight Logo"
              width={250}
              height={250}
              className="mb-4"
              unoptimized
            />
          </div>

          <h1
            className="text-4xl md:text-5xl font-semibold text-[#5b2b1d] font-['Playfair_Display',serif] tracking-tight"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Our Menu
          </h1>

          <p
            className="text-lg md:text-2xl text-[#6f3e2f] leading-relaxed font-light max-w-3xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Discover handcrafted cakes, artisan breads, and delightful pastries
            baked fresh every day with passion and love.
          </p>

        </div>
      </div>
    </section>
  );
};