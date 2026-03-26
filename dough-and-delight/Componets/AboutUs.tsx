"use client";

import Image from "next/image";
import Link from "next/link";

const aboutImg = "/about-background-img.png";

export const AboutUs = () => {
    return (
        <section className="w-full bg-[#fff6ee] overflow-hidden rounded-[10px] font-['Comic_Sans_MS',cursive]" data-aos="fade-down-left">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="order-1 md:order-2 container mx-auto px-6 py-16" data-aos="flip=left">
                    <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#5b2b1d] mb-4 font-['Playfair_Display',serif]">
                            About Dough & Delight
                        </h2>

                        <p className="text-[#7a4a3b] text-sm md:text-lg leading-relaxed mb-6">
                            Dough & Delight is a passion-driven bakery dedicated to bringing
                            happiness through freshly baked treats. We use only the finest
                            ingredients to craft delightful cakes, donuts, pastries, and more.
                        </p>

                        <Link href="/about">
                            <button className="px-6 py-3 rounded-full bg-[#f1c6a8] text-[#5b2b1d] font-semibold hover:bg-[#e7b391] transition">
                                Know More
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="order-2 md:order-1 relative h-[260px] md:h-[420px] w-full">
                    <Image
                        src={aboutImg}
                        alt="About Dough & Delight"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#fff6ee]" />
                </div>
            </div>
        </section>
    );
};