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

  const [sort, setSort] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  useEffect(() => {
    setLoading(true);

    let url = `${API}/products`;
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (subCategory) params.append("subCategory", subCategory);
    if (search) params.append("search", search);

    const query = params.toString();
    if (query) url += `?${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, subCategory, search]);
  let sortedProducts = [...products];

  // SORT
  if (sort === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // PRICE FILTER
  sortedProducts = sortedProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
  );

  if (sort === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <main>
      <SaleHero />

      <CinematicScrollReveal>
        <SortFilterBar
          sort={sort}
          setSort={setSort}
          openFilter={() => {
            const min = prompt("Min price?", priceRange[0]);
            const max = prompt("Max price?", priceRange[1]);

            if (min !== null && max !== null) {
              setPriceRange([Number(min), Number(max)]);
            }
          }}
        />
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
          <ProductGrid products={sortedProducts} />
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
