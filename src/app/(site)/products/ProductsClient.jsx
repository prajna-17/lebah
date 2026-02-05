"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API } from "@/utils/api";

import SaleHero from "@/components/products/SaleHero";
import SortFilterBar from "@/components/products/SortFilterBar";
import FabricTabs from "@/components/products/FabricTabs";
import ProductGrid from "@/components/products/ProductGrid";
import BenefitsBanner from "@/components/products/BenefitsBanner";
import TrendingWeek from "@/components/products/TrendingWeek";
import CinematicScrollReveal from "@/components/CinematicScrollReveal";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const url = category
      ? `${API}/products?category=${category}`
      : `${API}/products`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  return (
    <main>
      <SaleHero />

      <CinematicScrollReveal>
        <SortFilterBar />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        <FabricTabs />
      </CinematicScrollReveal>

      <CinematicScrollReveal>
        {loading ? (
          <div className="py-24 text-center text-gray-500">
            Loading products…
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
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
