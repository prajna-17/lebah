"use client";

import { useState } from "react";

import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import NewArrivalsBanner from "@/components/home/NewArrivalsBanner";
import ProductSlider from "@/components/home/ProductSlider";
import PremiumCottonBanner from "@/components/home/PremiumCottonBanner";
import BestProducts from "@/components/home/BestProducts";
import CoreFeatures from "@/components/home/CoreFeatures";
// import Testimonials from "@/components/home/Testimonials";
import CinematicScrollReveal from "@/components/CinematicScrollReveal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("men");

  return (
    <>
      <Hero activeTab={activeTab} setActiveTab={setActiveTab} />

      <CinematicScrollReveal>
        <CategoryCards activeTab={activeTab} />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <NewArrivalsBanner activeTab={activeTab} />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <ProductSlider activeTab={activeTab} />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <PremiumCottonBanner activeTab={activeTab} />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <BestProducts activeTab={activeTab} />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <CoreFeatures activeTab={activeTab} />
      </CinematicScrollReveal>

      <CinematicScrollReveal>{/* <Testimonials /> */}</CinematicScrollReveal>
    </>
  );
}
