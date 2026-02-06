"use client";
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";

const quotes = [
  "Curating timeless styles",
  "Refining elegance for you",
  "Luxury takes a moment",
  "Where fashion meets grace",
];

export default function LuxuryLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-[40vh] flex-col items-center justify-center gap-4">
      {/* ICON */}
      <FiLoader className="animate-spin-slow text-3xl text-[#c9a44c]" />

      {/* TEXT */}
      <p className="animate-luxury-fade text-center text-sm tracking-[0.25em] text-gray-700 uppercase">
        {quotes[index]}
      </p>

      {/* GOLD LINE */}
      <div className="h-[1px] w-16 bg-[#c9a44c]/70" />
    </div>
  );
}
