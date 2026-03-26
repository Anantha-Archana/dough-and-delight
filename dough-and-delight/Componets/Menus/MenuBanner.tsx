"use client";

import Image from "next/image";

const logo = "/dough-and-doughts.png";
const menuBannerImg = "/menu-banner-imgs.png";

export const MenuBanner = () => {
	return (
		<section className="relative w-full overflow-hidden" data-aos="fade-in" data-aos-duration="1000">
			<div className="relative w-full h-[320px] md:h-[400px]">
				<Image
					src={menuBannerImg}
					alt="Dough & Delight Menu"
					fill
					priority
					sizes="100vw"
					className="object-cover object-center"
				/>
			</div>

			<div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-5">
				<Image
					src={logo}
					alt="Dough & Delight Logo"
					width={250}
					height={250}
					className="mb-4"	
				/>

				<h1 className="text-4xl md:text-5xl font-semibold text-[#5b2b1d] font-['Playfair_Display',serif] tracking-tight">
					Our Menu
				</h1>
				<p className="text-lg md:text-2xl text-[#6f3e2f] leading-relaxed font-light max-w-3xl">
					Discover handcrafted cakes, artisan breads, and delightful pastries
					baked fresh every day with passion and love.
				</p>
			</div>
		</section>
	);
};