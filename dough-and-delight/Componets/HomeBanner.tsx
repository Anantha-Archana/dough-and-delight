import Image from "next/image";
import Link from "next/link";

const homeBannerImg = "/home-banner-img-1.png";

export const HomeBanner = () => {
  return (
    <section
      className="relative w-full min-h-[460px] md:min-h-[520px] bg-[#f6e7dd] overflow-hidden font-['Comic_Sans_MS',cursive]"
      data-aos="zoom-out-up"
    >
      <div className="absolute inset-0">
        <Image
          src={homeBannerImg}
          alt="Desserts"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="
              object-cover
              object-[center_70%]
              md:object-right
          "
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#f6e7dd]/95 via-[#f6e7dd]/80 to-[#f6e7dd]/95 md:hidden" />
      <div className="relative z-10 h-full container">
        <div className="max-w-7xl py-14 md:py-24">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-6 text-center md:text-left">
              <span className="inline-block mb-3 rounded-full bg-[#f0d6c8] px-4 py-1 text-xs md:text-sm font-medium text-[#8b3e2f]">
                Freshly baked
              </span>

              <h1 className="text-[26px] leading-snug md:text-5xl font-bold text-[#5b2b1d] mb-4">
                Freshly Baked Happiness Every Day
              </h1>

              <p className="text-sm md:text-lg text-[#7a4a3b] mb-7 max-w-sm mx-auto md:mx-0">
                Discover our delicious range of breads, cakes, pastries, and
                more. Freshly baked with love using premium ingredients.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                <button
                  className="
                      w-full sm:w-auto
                      rounded-full
                      bg-[#8b3e2f]
                      px-5 py-2.5
                      text-sm
                      md:px-6 md:py-3 md:text-base
                      text-white
                      font-medium
                      hover:bg-[#733225]
                  "
                >
                  Order Now
                </button>

                <Link href="/menu">
                  <button
                    className="
                        w-full sm:w-auto
                        rounded-full
                        border border-[#8b3e2f]
                        px-5 py-2.5
                        text-sm
                        md:px-6 md:py-3 md:text-base
                        text-[#8b3e2f]
                        hover:bg-[#8b3e2f]
                        hover:text-white
                        transition-all duration-300
                    "
                  >
                    View Menu
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
