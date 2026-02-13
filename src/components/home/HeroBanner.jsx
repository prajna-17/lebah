"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroBanner({ activeTab }) {
  const router = useRouter();

  const banners =
    activeTab === "women"
      ? ["/img/womenim.png", "/img/women2.png", "/img/women3.png"]
      : ["/img/menimm.jpeg", "/img/homebannermen.png", "/img/menbannerrr.png"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full h-[260px] overflow-hidden">
      {/* SLIDER TRACK */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="banner"
            onClick={() => router.push(`/products?superCategory=${activeTab}`)}
            className="w-full h-full object-contain bg-white
 flex-shrink-0 cursor-pointer"
          />
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-white scale-110" : "bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
