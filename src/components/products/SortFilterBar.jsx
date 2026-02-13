"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowDownUp, SlidersHorizontal, X } from "lucide-react";

export default function SortFilterBar({ sort, setSort, openFilter }) {
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [toast, setToast] = useState("");
  const [tempSort, setTempSort] = useState(sort);

  // Handle Mounting for SSR & Body Scroll Lock
  useEffect(() => {
    setMounted(true);
    if (showSortModal || showFilterModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSortModal, showFilterModal]);

  if (!mounted) return null;

  return (
    <>
      {/* TOP BAR - Remains in the document flow */}
      <section className="w-full border-y border-neutral-200 bg-white mt-10">
        <div className="grid grid-cols-2 divide-x divide-neutral-200">
          <button
            onClick={() => setShowSortModal(true)}
            className="flex items-center gap-3 px-5 py-4 hover:bg-neutral-50 transition"
          >
            <ArrowDownUp className="w-5 h-5 text-neutral-800" />
            <div className="text-left">
              <p className="text-sm font-semibold text-neutral-900">Sort By</p>
              <p className="text-xs text-neutral-500">
                {sort === "newest"
                  ? "Newest Arrival"
                  : sort === "price-low"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
              </p>
            </div>
          </button>

          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-3 px-5 py-4 hover:bg-neutral-50 transition"
          >
            <SlidersHorizontal className="w-5 h-5 text-neutral-800" />
            <div className="text-left">
              <p className="text-sm font-semibold text-neutral-900">Filter</p>
              <p className="text-xs text-neutral-500">Price Range</p>
            </div>
          </button>
        </div>
      </section>

      {/* --- PORTALS --- */}

      {/* SORT MODAL */}
      {/* SORT MODAL */}
      {createPortal(
        <div
          className={`fixed inset-0 z-[100] flex items-end justify-center transition-all duration-300 ${
            showSortModal ? "visible" : "invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            onClick={() => setShowSortModal(false)}
            className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
              showSortModal ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Modal */}
          <div
            className={`relative w-full max-w-md bg-white rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] transform transition-all duration-500 ease-out ${
              showSortModal ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Drag Handle */}
            <div className="w-14 h-1.5 bg-neutral-300 rounded-full mx-auto mb-6" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">
                Sort Products
              </h2>
              <X
                className="cursor-pointer text-neutral-600 hover:text-black transition"
                onClick={() => setShowSortModal(false)}
              />
            </div>

            {/* Sort Options */}
            <div className="space-y-3 text-gray-900">
              {[
                { label: "Newest Arrival", value: "newest" },
                { label: "Price: Low to High", value: "price-low" },
                { label: "Price: High to Low", value: "price-high" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTempSort(option.value)}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl border transition ${
                    tempSort === option.value
                      ? "border-black bg-[#0b1b2f] text-white"
                      : "border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <span className="font-medium">{option.label}</span>

                  {/* Radio Circle */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      tempSort === option.value
                        ? "border-white bg-white"
                        : "border-neutral-400"
                    }`}
                  >
                    {tempSort === option.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0b1b2f]" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-neutral-200" />

            {/* Apply Button */}
            <button
              onClick={() => {
                setSort(tempSort);
                setShowSortModal(false);

                setToast(
                  `${
                    tempSort === "newest"
                      ? "Newest Arrival"
                      : tempSort === "price-low"
                        ? "Price: Low to High"
                        : "Price: High to Low"
                  }`,
                );

                setTimeout(() => setToast(""), 2000);
              }}
              className="w-full bg-[#0b1b2f] text-white py-4 rounded-xl font-medium hover:bg-neutral-800 transition active:scale-[0.98]"
            >
              Apply Sorting
            </button>
          </div>
        </div>,
        document.body,
      )}

      {/* FILTER MODAL */}
      {/* FILTER MODAL */}
      {createPortal(
        <div
          className={`fixed inset-0 z-[100] flex items-end justify-center transition-all duration-300 text-gray-900 ${
            showFilterModal ? "visible" : "invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            onClick={() => setShowFilterModal(false)}
            className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
              showFilterModal ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Modal */}
          <div
            className={`relative w-full max-w-md bg-white rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] transform transition-all duration-500 ease-out ${
              showFilterModal ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Drag Handle */}
            <div className="w-14 h-1.5 bg-neutral-300 rounded-full mx-auto mb-6" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">
                Filter Products
              </h2>
              <X
                className="cursor-pointer text-neutral-600 hover:text-black transition"
                onClick={() => setShowFilterModal(false)}
              />
            </div>

            {/* Price Range Section */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Minimum Price
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="₹ 0"
                  className="mt-2 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0b1b2f]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Maximum Price
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="₹ 5000"
                  className="mt-2 w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0b1b2f]"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-neutral-200" />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                }}
                className="w-1/2 border border-neutral-300 py-3 rounded-xl font-medium hover:bg-neutral-100 transition"
              >
                Reset
              </button>

              <button
                onClick={() => {
                  openFilter({ minPrice, maxPrice });
                  setShowFilterModal(false);

                  setToast("Filters applied!");
                  setTimeout(() => setToast(""), 2000);
                }}
                className="w-1/2 bg-[#0b1b2f] text-white py-3 rounded-xl font-medium hover:bg-neutral-800 transition active:scale-[0.98]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
      {toast && (
        <div className="fixed -top-30 left-1/2 -translate-x-1/2 z-[200] animate-bounce">
          <div className="bg-[#0b1b2f] text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium">
            {toast}
          </div>
        </div>
      )}
    </>
  );
}
