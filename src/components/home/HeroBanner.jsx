"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const banners = [
  "/img/heroim.jpeg",
  "/img/heroim.jpeg",
  "/img/heroim.jpeg",
  "/img/heroim.jpeg",
];

export default function HeroBanner() {
  const router = useRouter();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[260px] overflow-hidden">
      {/* IMAGE */}
      <img
        key={index}
        src={banners[index]}
        alt="banner"
        onClick={() => router.push("/products")}
        className="absolute inset-0 w-full h-full object-cover animate-banner-slide cursor-pointer active:scale-[0.98] transition"
      />

      {/* DOTS — ON IMAGE, BOTTOM */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300
              ${i === index ? "bg-white scale-110" : "bg-gray-400/70"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
