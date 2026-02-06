"use client";
import { useRouter } from "next/navigation";

export default function CategoryCard({ id, img, title, subtitle }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products?category=${id}`)}
      className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* GOLDEN BACKGROUND IMAGE */}
      <img
        src="/img/cat.png" // 👈 your golden background image
        alt="gold frame"
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* CONTENT ON TOP */}
      <div className="relative p-1">
        {/* INNER IMAGE CARD */}
        <div className="overflow-hidden rounded-lg bg-black">
          <div className="relative">
            <img
              src={img}
              alt={title}
              className="h-[110px] w-full object-cover "
            />

            {/* BLACK TRANSPARENT GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* TITLE ON GRADIENT */}
            <h3 className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-medium tracking-wide">
              {title}
            </h3>
          </div>
        </div>

        {/* FOOTER TEXT */}
        <div className="relative bottom-3 mt-7 text-center">
          <p className="text-xs tracking-wide text-black font-bold">
            {subtitle}
          </p>
          <div className="mx-auto mt-0 h-[2px] w-12 bg-[#c9a44c] animate-[softGlow_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
