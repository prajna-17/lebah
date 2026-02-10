"use client";

import { useRouter } from "next/navigation";

export default function PremiumCottonBanner({ activeTab }) {
  const router = useRouter();

  return (
    <section className="w-full">
      <img
        src={activeTab === "women" ? "/img/bet.jpg" : "/img/precotton.jpeg"}
        className="
          w-full h-[120px] object-cover
          cursor-pointer
          transition-transform duration-200
          active:scale-[0.97]
        "
      />
    </section>
  );
}
