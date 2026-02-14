"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API } from "@/utils/api";

export default function FabricTabs() {
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSubCategory = searchParams.get("subCategory");
  const superCategory = searchParams.get("superCategory");

  useEffect(() => {
    fetch(`${API}/sub-categories`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        // ✅ remove duplicates by name
        const uniqueByName = Array.from(
          new Map(data.map((s) => [s.name.toLowerCase(), s])).values(),
        );

        setSubCategories(uniqueByName);
      });
  }, []);

  const handleTabClick = (sub) => {
    const params = new URLSearchParams();

    params.set("subCategory", sub._id);

    if (superCategory) {
      params.set("superCategory", superCategory);
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="px-4 pt-4 mt-3 mb-10">
      <p className="mt-1 text-xs text-gray-500">
        Showing {subCategories.length} subcategories
      </p>
      <div className="flex gap-3 overflow-x-auto no-scrollbar mt-2">
        <button
          onClick={() => {
            const params = new URLSearchParams();

            if (superCategory) {
              params.set("superCategory", superCategory);
            }

            router.push(`/products?${params.toString()}`);
          }}
          className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition
    ${!activeSubCategory ? "bg-[#0f243e] text-white" : "bg-gray-200 text-gray-700"}`}
        >
          All
        </button>

        {subCategories.map((sub) => {
          const isActive = activeSubCategory === sub._id;

          return (
            <button
              key={sub._id}
              onClick={() => handleTabClick(sub)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition
        ${isActive ? "bg-[#0f243e] text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {sub.name.charAt(0).toUpperCase() + sub.name.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
