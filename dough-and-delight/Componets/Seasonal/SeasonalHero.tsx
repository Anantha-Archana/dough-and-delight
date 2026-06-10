"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    image: "/chirstmas-banner-img.png",
    title: "Christmas Specials",
    subtitle: "Holiday Treats for a Limited Time!",
    offer: "🎄 15% OFF on All Holiday Items",
    validity: "Offer valid until December 31st",
  },
  {
    image: "/diwali-banner-img.png",
    title: "Diwali Specials",
    subtitle: "Celebrate the Festival of Lights!",
    offer: "🪔 Flat 20% OFF on Festive Collections",
    validity: "Offer valid this festive season",
  },
  {
    image: "/pongal-banner-img.png",
    title: "Pongal Specials",
    subtitle: "Celebrate Harvest Festival with Happiness!",
    offer: "🌾 Special Discounts on Festive Products",
    validity: "Offer valid until Pongal Festival",
  },
  {
    image: "/summer-banner-img.png",
    title: "Summer Specials",
    subtitle: "Cool Deals for Hot Summer Days!",
    offer: "☀️ Up to 25% OFF on Summer Collections",
    validity: "Offer valid this Summer",
  },
];

const SeasonalHero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(slider);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full bg-[#f5f1ea] py-3 px-2 md:px-2">

      {/* Main Banner */}
      <div className="relative overflow-hidden rounded-[35px] shadow-2xl">

        {/* Banner Height */}
        <div className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] lg:h-[650px]">

          {/* Background Image */}
          <Image
            src={banners[current].image}
            alt={banners[current].title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-all duration-700"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

          {/* Left Content */}
          <div className="absolute inset-0 flex items-center">

            <div className="max-w-7xl mx-auto w-full px-6 md:px-14">

              <div className="max-w-2xl">

                {/* Tag */}
                <p className="text-orange-300 text-xs sm:text-sm md:text-base tracking-[4px] uppercase font-semibold mb-4">
                  Seasonal Collection
                </p>

                {/* Heading */}
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                  {banners[current].title}
                </h1>

                {/* Subtitle */}
                <p className="text-gray-200 text-sm sm:text-lg md:text-xl mt-5 leading-relaxed max-w-xl">
                  {banners[current].subtitle}
                </p>

                {/* Offer Box */}
                <div className="mt-8 inline-flex flex-col bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl px-6 py-5 shadow-2xl">

                  <h2 className="text-[#ffe7c1] text-lg sm:text-2xl md:text-3xl font-bold">
                    {banners[current].offer}
                  </h2>

                  <p className="text-gray-200 text-xs sm:text-sm md:text-base mt-2">
                    {banners[current].validity}
                  </p>

                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">

                  <button className="bg-white text-black px-7 py-3 rounded-full font-semibold hover:bg-orange-200 transition-all duration-300 shadow-lg">
                    Shop Now
                  </button>

                  <button className="border border-white text-white px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300">
                    Explore
                  </button>

                </div>

              </div>
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/20 text-white p-3 rounded-full transition-all duration-300 z-20"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/20 text-white p-3 rounded-full transition-all duration-300 z-20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">

            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`transition-all duration-300 rounded-full ${
                  current === index
                    ? "w-10 h-3 bg-white"
                    : "w-3 h-3 bg-white/50"
                }`}
              />
            ))}

          </div>

        </div>
      </div>

    </section>
  );
};

export default SeasonalHero;