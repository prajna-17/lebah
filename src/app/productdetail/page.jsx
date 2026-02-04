import Banner from "@/components/productdetail/Banner";
import DeliveryInfo from "@/components/productdetail/DeliveryInfo";
import ProductHero from "@/components/productdetail/ProductHero";
import ProductMeta from "@/components/productdetail/ProductMeta";
import ProductReviews from "@/components/productdetail/ProductReviews";
import RelatedProducts from "@/components/productdetail/RelatedProducts";
import TrendingWeek from "@/components/products/TrendingWeek";
import CinematicScrollReveal from "@/components/CinematicScrollReveal";

export default function ProductDetailPage() {
  return (
    <main>
      {/* Keep hero clean */}
      <ProductHero />

      <CinematicScrollReveal>
        <ProductMeta />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <RelatedProducts />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <DeliveryInfo />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <ProductReviews />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <Banner />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <TrendingWeek />
      </CinematicScrollReveal>
    </main>
  );
}
