"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroBanner({ activeTab }) {
  const router = useRouter();

  const banners =
    activeTab === "women"
      ? ["/img/w1.png", "/img/w2.png", "/img/w3.png"]
      : ["/img/menimm.jpeg", "/img/homebannermen.png", "/img/menbannerrr.png"];

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [banners.length, isHovered, index]);

  const goTo = (i) => {
    setPrevIndex(index);
    setIndex(i);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&display=swap');

        .hero-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* ── Desktop-only enhancements ── */
        @media (min-width: 768px) {
          .hero-wrapper {
            border-radius: 2px;
            box-shadow:
              0 4px 6px -1px rgba(0,0,0,0.07),
              0 20px 60px -10px rgba(0,0,0,0.12);
          }

          /* Subtle vignette overlay */
          .hero-wrapper::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%);
            pointer-events: none;
            z-index: 2;
          }

          /* Left / right arrow buttons */
          .hero-arrow {
            display: flex;
          }

          /* Dot bar */
          .hero-dots-desktop {
            display: flex;
          }

          .hero-dots-default {
            display: none;
          }
        }

        @media (max-width: 767px) {
          .hero-arrow { display: none !important; }
          .hero-dots-desktop { display: none !important; }
          .hero-dots-default { display: flex; }
        }

        /* Arrow button */
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 50%;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.25s ease, background 0.2s;
          box-shadow: 0 2px 16px rgba(0,0,0,0.14);
        }
        .hero-arrow:hover {
          background: rgba(255,255,255,1);
          transform: translateY(-50%) scale(1.08);
        }
        .hero-arrow.left { left: 20px; }
        .hero-arrow.right { right: 20px; }
        .hero-wrapper:hover .hero-arrow {
          opacity: 1;
        }

        /* Arrow SVG */
        .hero-arrow svg {
          width: 18px;
          height: 18px;
          stroke: #1a1a1a;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Desktop dot bar */
        .hero-dots-desktop {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          gap: 8px;
          align-items: center;
          background: rgba(0,0,0,0.22);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .dot-pill {
          height: 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: width 0.4s cubic-bezier(.4,0,.2,1), background 0.3s;
        }
        .dot-pill.active {
          width: 28px;
          background: rgba(255,255,255,0.95);
        }
        .dot-pill:not(.active) {
          width: 6px;
        }
        .dot-pill:hover:not(.active) {
          background: rgba(255,255,255,0.7);
        }

        /* Slide counter label */
        .slide-counter {
          display: none;
        }
        @media (min-width: 768px) {
          .slide-counter {
            display: block;
            position: absolute;
            top: 20px;
            right: 24px;
            z-index: 10;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 13px;
            font-weight: 300;
            letter-spacing: 0.12em;
            color: rgba(255,255,255,0.75);
            text-shadow: 0 1px 4px rgba(0,0,0,0.3);
            pointer-events: none;
          }
        }

        /* Progress bar */
        .progress-bar {
          display: none;
        }
        @media (min-width: 768px) {
          .progress-bar {
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            z-index: 10;
            background: rgba(255,255,255,0.7);
            animation: progressFill 4.5s linear infinite;
          }
          .progress-bar.paused {
            animation-play-state: paused;
          }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      <div
        className="hero-wrapper w-full h-[260px] md:h-[380px] lg:h-[480px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* SLIDER TRACK — untouched */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {banners.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="banner"
              onClick={() =>
                router.push(`/products?superCategory=${activeTab}`)
              }
              className="w-full h-full object-contain bg-white flex-shrink-0 cursor-pointer"
            />
          ))}
        </div>

        {/* DESKTOP: Slide counter */}
        <span className="slide-counter">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(banners.length).padStart(2, "0")}
        </span>

        {/* DESKTOP: Progress bar */}
        <div
          className={`progress-bar${isHovered ? " paused" : ""}`}
          key={index}
        />

        {/* DESKTOP: Left arrow */}
        <button
          className="hero-arrow left"
          onClick={() => goTo((index - 1 + banners.length) % banners.length)}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* DESKTOP: Right arrow */}
        <button
          className="hero-arrow right"
          onClick={() => goTo((index + 1) % banners.length)}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        {/* DESKTOP: Pill dots */}
        <div className="hero-dots-desktop">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`dot-pill${i === index ? " active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* MOBILE: Original dots — untouched */}
        <div className="hero-dots-default absolute bottom-4 left-1/2 -translate-x-1/2 gap-3">
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
    </>
  );
}
