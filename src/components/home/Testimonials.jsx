"use client";

import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    name: "Rahul Mishra",
    image: "/img/r1.jpeg",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    image: "/img/r1.jpeg",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    rating: 5,
  },
  {
    name: "Rohan Kapoor",
    image: "/img/r1.jpeg",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    rating: 5,
  },
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(1);

  const handleScroll = () => {
    const container = containerRef.current;
    const cards = container.children;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(cards).forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActive(closestIndex);
  };
  useEffect(() => {
    const container = containerRef.current;
    const cards = container.children;
    const centerCard = cards[active];

    container.scrollLeft =
      centerCard.offsetLeft -
      container.offsetWidth / 2 +
      centerCard.offsetWidth / 2;
  }, []);

  return (
    <section className="bg-white py-20">
      <h2 className="text-center text-2xl font-semibold mb-10 text-[#000000]">
        Testimonials
      </h2>

      {/* Scroll container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto px-[30%] scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {testimonials.map((t, i) => {
          const isActive = i === active;

          return (
            <div
              key={i}
              className={
                "snap-center flex-shrink-0 bg-[#0f2742] text-white rounded-2xl w-[300px] h-[220px] px-8 py-6 transition-all duration-300 " +
                (isActive ? "scale-100 opacity-100" : "scale-90 opacity-60")
              }
            >
              {/* Quote */}
              <div className="text-yellow-400 text-4xl leading-none mb-2">
                “
              </div>

              {/* User */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{t.name}</p>
                  <div className="text-yellow-400 text-sm">
                    {"★".repeat(t.rating)}
                  </div>
                </div>
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed text-white/90 line-clamp-3">
                {t.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
