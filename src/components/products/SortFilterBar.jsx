"use client";

import { ArrowDownUp, SlidersHorizontal } from "lucide-react";

export default function SortFilterBar({ sort, setSort, openFilter }) {
  return (
    <section className="w-full border-y border-gray-200 bg-white mt-10">
      <div className="grid grid-cols-2">
        {/* SORT */}
        <button
          onClick={() =>
            setSort((prev) => (prev === "newest" ? "price-low" : "newest"))
          }
          className="flex items-center gap-3 px-4 py-3 border-r border-gray-200 text-left"
        >
          <ArrowDownUp className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Sort By</p>
            <p className="text-xs text-gray-500">
              {sort === "newest"
                ? "Newest Arrival"
                : sort === "price-low"
                  ? "Price: Low to High"
                  : "Price: High to Low"}
            </p>
          </div>
        </button>

        {/* FILTER */}
        <button
          onClick={openFilter}
          className="flex items-center gap-3 px-4 py-3 text-left"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Filter</p>
            <p className="text-xs text-gray-500">Theme, Size, etc.</p>
          </div>
        </button>
      </div>
    </section>
  );
}
