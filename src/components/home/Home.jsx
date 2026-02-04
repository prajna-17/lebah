import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import NewArrivalsBanner from "@/components/home/NewArrivalsBanner";
import ProductSlider from "@/components/home/ProductSlider";
import PremiumCottonBanner from "@/components/home/PremiumCottonBanner";
import BestProducts from "@/components/home/BestProducts";
import CoreFeatures from "@/components/home/CoreFeatures";
import Testimonials from "@/components/home/Testimonials";
import CinematicScrollReveal from "@/components/CinematicScrollReveal";

export default function Home() {
  return (
    <>
      <Hero />

      <CinematicScrollReveal>
        <CategoryCards />
      </CinematicScrollReveal>
      <CinematicScrollReveal>
        <NewArrivalsBanner />
      </CinematicScrollReveal>
      <CinematicScrollReveal>
        <ProductSlider />
      </CinematicScrollReveal>
      <CinematicScrollReveal>
        <PremiumCottonBanner />
      </CinematicScrollReveal>
      <CinematicScrollReveal>
        <BestProducts />
      </CinematicScrollReveal>
      <CinematicScrollReveal>
        <CoreFeatures />
      </CinematicScrollReveal>
      <CinematicScrollReveal>
        <Testimonials />
      </CinematicScrollReveal>
    </>
  );
}
