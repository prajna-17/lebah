"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API } from "@/utils/api";

export default function FabricTabs() {
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSubCategory = searchParams.get("subCategory");

  useEffect(() => {
    fetch(`${API}/sub-categories`)
      .then((res) => res.json())
      .then((data) => {
        setSubCategories(Array.isArray(data) ? data : []);
      });
  }, []);

  const handleTabClick = (sub) => {
    router.push(`/products?subCategory=${sub._id}`);
  };

  return (
    <div className="px-4 pt-4 mt-3">
      <p className="mt-1 text-xs text-gray-500">
        Showing {subCategories.length} subcategories
      </p>
      <div className="flex gap-3 overflow-x-auto no-scrollbar mt-2">
        {subCategories.map((sub) => {
          const isActive = activeSubCategory === sub._id;

          return (
            <button
              key={sub._id}
              onClick={() => handleTabClick(sub)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition
        ${isActive ? "bg-[#0f243e] text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {sub.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
