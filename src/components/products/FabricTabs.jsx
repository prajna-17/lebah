"use client";
import { useState } from "react";

const tabs = ["Oxford", "Corduroy", "Linen", "French"];

export default function FabricTabs() {
  const [active, setActive] = useState("Linen");

  return (
    <div className="px-4 pt-4 mt-10">
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition
              ${
                active === tab
                  ? "bg-[#0f243e] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-500 mt-7">599 Products</p>
    </div>
  );
}
