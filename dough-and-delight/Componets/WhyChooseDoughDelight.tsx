"use client";

import { useEffect } from "react";
import AOS from "aos";
import Image from "next/image";

const freshIngredientsLogo = "/fresh-ingredients.png";
const homemadeQualityLogo = "/homemade-quality.png";
const sameDayDeliveryLogo = "/day-delivery.png";
const hygienicPreparationLogo = "/hygienic-preparation.png";

const WhyChooseDoughDelightProps = [
  {
    id: 1,
    title: "Fresh Ingredients",
    description: "We use fresh and high-quality ingredients in every bake.",
    logo: freshIngredientsLogo,
  },
  {
    id: 2,
    title: "Homemade Quality",
    description: "Prepared with care using homemade recipes and techniques.",
    logo: homemadeQualityLogo,
  },
  {
    id: 3,
    title: "Same Day Delivery",
    description: "Get freshly baked items delivered on the same day.",
    logo: sameDayDeliveryLogo,
  },
  {
    id: 4,
    title: "Hygienic Preparation",
    description: "Baked in a clean and hygienic environment.",
    logo: hygienicPreparationLogo,
  },
];

export const WhyChooseDoughDelight = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <section
      className="
        bg-gradient-to-b
        from-[#f6e7dd]
        to-[#fff7f2]
        py-14
        px-4
        mt-5
        mb-5
        rounded-[10px]
        font-['Comic_Sans_MS',cursive]  
        "
      data-aos="zoom-out-up"
    >
      <div className="max-w-4xl mx-auto text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5b2b1d] mb-3">
          Why Choose Dough & Delight?
        </h2>
        <p className="text-sm md:text-base text-[#7a4a3b]">
          Discover our delicious range of breads, cakes, pastries, and more.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {WhyChooseDoughDelightProps.map((item, index) => (
          <div
            key={item.id}
            className="
                bg-white/80
                backdrop-blur-sm
                rounded-2xl
                p-4
                text-center
                shadow-sm
                hover:shadow-md
                transition-all
                "
            data-aos="fade-up"
            data-aos-delay={Math.min(index * 100, 400)}
            // data-aos-delay={index * 100}
          >
            <div className="flex justify-center mb-2">
              <Image
                src={item.logo}
                alt={item.title}
                width={100}
                height={100}
              />
            </div>

            <h3 className="text-lg font-semibold text-[#5b2b1d] mb-2">
              {item.title}
            </h3>

            <p className="text-sm text-[#7a4a3b]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// import Image from "next/image";

// const freshIngredientsLogo = "/fresh-ingredients.png";
// const homemadeQualityLogo = "/homemade-quality.png";
// const sameDayDeliveryLogo = "/day-delivery.png";
// const hygienicPreparationLogo = "/hygienic-preparation.png";

// const WhyChooseDoughDelightProps = [
//   {
//     id: 1,
//     title: "Fresh Ingredients",
//     description: "We use fresh and high-quality ingredients in every bake.",
//     logo: freshIngredientsLogo,
//   },
//   {
//     id: 2,
//     title: "Homemade Quality",
//     description: "Prepared with care using homemade recipes and techniques.",
//     logo: homemadeQualityLogo,
//   },
//   {
//     id: 3,
//     title: "Same Day Delivery",
//     description: "Get freshly baked items delivered on the same day.",
//     logo: sameDayDeliveryLogo,
//   },
//   {
//     id: 4,
//     title: "Hygienic Preparation",
//     description: "Baked in a clean and hygienic environment.",
//     logo: hygienicPreparationLogo,
//   },
// ];

// export const WhyChooseDoughDelight = () => {
//     return (
//         <section className="
//             bg-gradient-to-b
//             from-[#f6e7dd]
//             to-[#fff7f2]
//             py-14
//             px-4
//             mt-5
//             mb-5
//             rounded-t-[10px]
//             rounded-b-[10px]
//         " data-aos="zoom-out-up">
//             {/* HEADER */}
//             <div className="max-w-4xl mx-auto text-center mb-12" aos-data="">
//                 <h2 className="text-3xl md:text-4xl font-bold text-[#5b2b1d] mb-3">
//                     Why Choose Dough & Delight?
//                 </h2>
//                 <p className="text-sm md:text-base text-[#7a4a3b]">
//                     Discover our delicious range of breads, cakes, pastries, and more.
//                 </p>
//             </div>

//             {/* CONTENT */}
//             <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//                 {WhyChooseDoughDelightProps.map((item) => (
//                     <div
//                         key={item.id}
//                         className="
//                         bg-white/80
//                         backdrop-blur-sm
//                         rounded-2xl
//                         p-4
//                         text-center
//                         shadow-sm
//                         hover:shadow-md
//                         transition-all
//                         "
//                     >
//                         <div className="flex justify-center mb-2">
//                             <Image
//                                 src={item.logo}
//                                 alt={item.title}
//                                 width={100}
//                                 height={100}
//                             />
//                         </div>

//                         <h3 className="text-lg font-semibold text-[#5b2b1d] mb-2">
//                             {item.title}
//                         </h3>

//                         <p className="text-sm text-[#7a4a3b]">
//                             {item.description}
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };
