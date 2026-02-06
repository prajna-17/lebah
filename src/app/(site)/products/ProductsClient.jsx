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
  const subCategory = searchParams.get("subCategory");
  const search = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let url = `${API}/products`;
    const params = [];

    if (category) params.push(`category=${category}`);
    if (subCategory) params.push(`subCategory=${subCategory}`);
    if (search) params.push(`search=${search}`);

    if (params.length) {
      url += `?${params.join("&")}`;
    }

    if (category) {
      url += `?category=${category}`;
    }

    if (subCategory) {
      url += category
        ? `&subCategory=${subCategory}`
        : `?subCategory=${subCategory}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, subCategory, search]);

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
