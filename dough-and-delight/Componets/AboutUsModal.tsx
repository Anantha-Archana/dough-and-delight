"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const breadImg = "/bread-image.png";
const cheeseImg = "/cheese-image.png";
const breadIcon = "/bread-icon.png";
const happinessIcon = "/heart-icon.png";

const features = [
  {
    id: 1,
    title: "Fresh Ingredients",
    description: "Quality you can taste in every bite",
    icon: cheeseImg,
  },
  {
    id: 2,
    title: "Homemade Quality",
    description: "Baked with love and care in every batch",
    icon: breadIcon,
  },
  {
    id: 3,
    title: "Customer Happiness",
    description: "Delighting our customers",
    icon: happinessIcon,
  },
];

export const AboutUsModal = () => {

  // FIX: Proper AOS initialization
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
      className="relative min-h-screen w-full overflow-hidden font-['Comic_Sans_MS',cursive]"
      data-aos="fade-in"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/background-image.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf4ee]/80 via-[#fdf4ee]/60 to-[#fdf4ee]/85" />

      <div className="relative z-10 px-4 py-20">
        <div
          className="max-w-6xl mx-auto rounded-3xl shadow-2xl px-6 md:px-14 py-16
          bg-gradient-to-b from-[#fffdfb] via-[#fff8f2] to-[#fde9dc]"
        >
          {/* Heading */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-3xl md:text-5xl font-bold text-[#5b2b1d] mb-3">
              About Dough & Delight
            </h1>

            <p className="text-base md:text-lg text-[#7a4a3b] max-w-2xl mx-auto">
              Freshly baked happiness, handcrafted with love ❤️
            </p>

            <div className="w-24 h-[2px] bg-[#d8b7a3] mx-auto mt-6 rounded-full" />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div data-aos="fade-right">
              <h2 className="text-2xl font-semibold text-[#5b2b1d] mb-2">
                Our Story
              </h2>

              <div className="w-16 h-[2px] bg-[#e6cbb8] mb-6 rounded-full" />

              <p className="text-base text-[#7a4a3b] leading-relaxed mb-6">
                Dough & Delight is a home-baker brand dedicated to creating
                delicious breads, cakes, and pastries using fresh, high-quality
                ingredients. Every bake is crafted with patience and passion.
              </p>

              <div className="w-full h-[1.5px] bg-[#e0c2ae] mb-6 rounded-full" />

              <p className="text-base text-[#7a4a3b] leading-relaxed mb-8">
                We believe baking is not just food — it’s an emotion, a
                celebration, and a little moment of joy in every bite.
              </p>
            </div>

            {/* Image */}
            <div className="flex justify-center" data-aos="zoom-in">
              <Image
                src={breadImg}
                alt="Fresh bakery items"
                width={460}
                height={320}
                className="rounded-2xl shadow-lg object-cover border-8 border-white"
                unoptimized
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[2px] bg-[#d8b7a3] rounded-full mt-8 mb-12" />

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#fffaf6] border border-[#f0dccc] shadow-md hover:shadow-lg transition"
                data-aos="flip-up"
                data-aos-delay={index * 100}
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={100}
                  height={100}
                  className="mb-4"
                  unoptimized
                />

                <h3 className="text-lg font-semibold text-[#5b2b1d] mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-[#7a4a3b]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
