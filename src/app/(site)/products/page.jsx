import SaleHero from "@/components/products/SaleHero";
import SortFilterBar from "@/components/products/SortFilterBar";
import FabricTabs from "@/components/products/FabricTabs";
import ProductGrid from "@/components/products/ProductGrid";
import BenefitsBanner from "@/components/products/BenefitsBanner";
import TrendingWeek from "@/components/products/TrendingWeek";
import CinematicScrollReveal from "@/components/CinematicScrollReveal";

export default function ProductsPage() {
  return (
    <main>
      {/* Hero stays instant */}
      <SaleHero />

      <CinematicScrollReveal>
        <SortFilterBar />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <FabricTabs />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <ProductGrid />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <BenefitsBanner />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <TrendingWeek />
      </CinematicScrollReveal>
    </main>
  );
}
