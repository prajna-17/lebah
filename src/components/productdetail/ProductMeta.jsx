"use client";

import { MapPin, ChevronRight } from "lucide-react";

const items = [
  "PRODUCT DETAILS",
  "MANUFACTURING INFORMATION",
  "RETURN & EXCHANGE POLICY",
  "FAQ's",
];

export default function ProductMeta() {
  return (
    <section className="px-4 mt-10 text-gray-900 ">
      {/* DELIVERY DETAILS */}
      <h2 className="text-lg font-bold mb-4">Delivery Details</h2>

      <div className="flex items-center border border-gray-400 rounded-lg px-4 py-3">
        <MapPin size={18} className="text-red-500 mr-3" />
        <input
          type="text"
          placeholder="Enter Pincode"
          className="flex-1 outline-none text-sm text-gray-700"
        />
        <button className="text-sm font-medium text-red-500">CHECK</button>
      </div>

      {/* ACCORDION LIST */}
      <div className="mt-10 ">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-5 border-b border-gray-300 "
          >
            <p className="text-sm font-bold tracking-wide">{item}</p>
            <ChevronRight size={20} className="text-gray-600" />
          </div>
        ))}
      </div>
    </section>
  );
}
