"use client";

import { useRouter } from "next/navigation";

export default function PremiumCottonBanner() {
  const router = useRouter();

  return (
    <section className="w-full">
      <img
        src="/img/precotton.jpeg"
        alt="Premium Cotton Shirts"
        onClick={() => router.push("/products")}
        className="
          w-full h-[180px] object-cover
          cursor-pointer
          transition-transform duration-200
          active:scale-[0.97]
        "
      />
    </section>
  );
}
