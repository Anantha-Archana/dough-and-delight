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
    <section className="w-full py-12 px-4 bg-[#f8f1e7] overflow-hidden">

      <div className="max-w-7xl mx-auto relative">

        <div className="text-center mb-10">

          <h2 className="text-3xl md:text-4xl font-bold text-[#8B2E1E]">
            Seasonal Favorites
          </h2>

          <p className="text-[#6b4a3b] mt-3 text-sm md:text-base">
            Enjoy our festive treats available for a limited time
          </p>

        </div>

        <button className="seasonal-prev absolute left-0 md:-left-3 top-[65%] z-10 -translate-y-1/2 bg-white/90 shadow-md p-2 rounded-full hover:bg-[#f3e4d3] transition duration-300">

          <ChevronLeft
            size={16}
            className="text-[#8B2E1E]"
          />

        </button>

        <button className="seasonal-next absolute right-0 md:-right-3 top-[65%] z-10 -translate-y-1/2 bg-white/90 shadow-md p-2 rounded-full hover:bg-[#f3e4d3] transition duration-300">

          <ChevronRight
            size={16}
            className="text-[#8B2E1E]"
          />

        </button>

        <Swiper
          modules={[
            Autoplay,
            Pagination,
            Navigation,
          ]}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: ".seasonal-prev",
            nextEl: ".seasonal-next",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },

            640: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 3,
            },
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
    </section>
  );
};

export default SeasonalGrid;