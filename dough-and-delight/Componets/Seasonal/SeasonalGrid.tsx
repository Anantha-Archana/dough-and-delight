"use client";

import SeasonalCard from "./SeasonalCard";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const butterCookie = "/butter-cookie.jpg";
const raisinCookies = "/raisin-cookie.jpg";
const stawberryCookies = "/stawberry-donut.jpg";
const chocolateCroissant = "/chocolate-croissant.jpg";
const chocoTruffle = "/choco-truffle.png";

const items = [
  {
    image: butterCookie,
    title: "Christmas Plum Cake",
    price: 699,
    badge: "Festive Favorite",
  },
  {
    image: raisinCookies,
    title: "Gingerbread Cookies",
    price: 299,
    badge: "Limited Time",
  },
  {
    image: stawberryCookies,
    title: "Peppermint Mocha",
    price: 180,
    badge: "Seasonal Special",
  },
  {
    image: chocolateCroissant,
    title: "Hot Chocolate",
    price: 250,
    badge: "Winter Drink",
  },
  {
    image: chocoTruffle,
    title: "Yule Log Cake",
    price: 599,
    badge: "Holiday Dessert",
  },
];

const SeasonalGrid = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#f8f1e7] py-16 px-4 md:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="rounded-[32px] border border-[#e7d8ce] bg-white/95 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)]">
          <div className="text-center mb-8">
            <p className="inline-flex items-center justify-center rounded-full bg-[#8b2e1f]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8b2e1f]">
              Seasonal favorites
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#8b2e1e]">
              Limited-time treats for the holidays
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-[#6b4a3b] leading-relaxed">
              Enjoy our festive menu with hand-picked favorites and seasonal specials crafted just for you.
            </p>
          </div>

          <div className="relative">
            <button className="seasonal-prev absolute left-0 top-1/2 z-20 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#8b2e1e] shadow-lg shadow-[#8b2e1e]/10 transition duration-300 hover:bg-[#f3e4d3] sm:-left-3">
              <ChevronLeft size={18} />
            </button>

            <button className="seasonal-next absolute right-0 top-1/2 z-20 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#8b2e1e] shadow-lg shadow-[#8b2e1e]/10 transition duration-300 hover:bg-[#f3e4d3] sm:-right-3">
              <ChevronRight size={18} />
            </button>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              loop={true}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".seasonal-prev",
                nextEl: ".seasonal-next",
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-14"
            >
              {items.map((item, index) => (
                <SwiperSlide key={index}>
                  <SeasonalCard
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    badge={item.badge}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalGrid;