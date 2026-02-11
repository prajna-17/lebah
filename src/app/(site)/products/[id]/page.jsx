"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "@/utils/api";

import Banner from "@/components/productdetail/Banner";
import DeliveryInfo from "@/components/productdetail/DeliveryInfo";
import ProductHero from "@/components/productdetail/ProductHero";
import ProductMeta from "@/components/productdetail/ProductMeta";
import ProductReviews from "@/components/productdetail/ProductReviews";
import RelatedProducts from "@/components/productdetail/RelatedProducts";
import TrendingWeek from "@/components/products/TrendingWeek";
import CinematicScrollReveal from "@/components/CinematicScrollReveal";
import { SUPER_CATEGORY_MAP } from "@/utils/superCategoryMap";

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-500">Loading product…</div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center text-gray-500">
        Product not found 🤍
      </div>
    );
  }
  const activeTab =
    product.superCategory === SUPER_CATEGORY_MAP.women ? "women" : "men";

  return (
    <main>
      {/* HERO (images, colors, sizes, price) */}
      <ProductHero product={product} />

      <CinematicScrollReveal>
        <ProductMeta product={product} />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <RelatedProducts
          categoryId={product.category?._id || product.category}
          currentProductId={product._id}
        />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <DeliveryInfo />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <ProductReviews reviews={product.reviews || []} />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <Banner activeTab={activeTab} />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <TrendingWeek activeTab={activeTab} />
      </CinematicScrollReveal>
    </main>
  );
}
