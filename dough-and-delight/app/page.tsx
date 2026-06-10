"use client";

import { useEffect } from "react";
import AOS from "aos";
// import "aos/dist/aos.css";
import { HomeBanner } from "@/Componets/HomeBanner";
import { WhyChooseDoughDelight } from "@/Componets/WhyChooseDoughDelight";
import { AboutUs } from "@/Componets/AboutUs";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow ">
        <HomeBanner />
        <WhyChooseDoughDelight />
        <AboutUs />
      </main>
    </div>
  );
};

export default Home;
