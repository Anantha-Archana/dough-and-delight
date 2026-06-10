import HurrySection from "@/Componets/Seasonal/HurrySection";
import OfferBanner from "@/Componets/Seasonal/OfferBanner";
import SeasonalCard from "@/Componets/Seasonal/SeasonalCard";
import SeasonalGrid from "@/Componets/Seasonal/SeasonalGrid";
import SeasonalHero from "@/Componets/Seasonal/SeasonalHero";

const SeasonalPage = () => {
  return (
    <div className="bg-[#f8f1e7] min-h-screen">
      <SeasonalHero />
      {/* <OfferBanner /> */}
      <SeasonalGrid />
      <HurrySection />

      <div className="container mx-auto px-4 py-10">
        <SeasonalCard
          image="/chocolate-eclair.jpg"
          title="Yule Log Cake"
          price={599}
          badge="Seasonal Special"
        />
      </div>
    </div>
  );
};

export default SeasonalPage;