"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API } from "@/utils/api";

export default function FabricTabs() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : data.data || []);
      });
  }, []);

  const handleTabClick = (cat) => {
    router.push(`/products?category=${cat._id}`);
  };

  return (
    <div className="px-4 pt-4 mt-3">
      <p className="mt-1 text-xs text-gray-500">
        Showing {categories.length} categories
      </p>
      <div className="flex gap-3 overflow-x-auto no-scrollbar mt-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat._id;

          return (
            <button
              key={cat._id}
              onClick={() => handleTabClick(cat)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition
                ${
                  isActive
                    ? "bg-[#0f243e] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
