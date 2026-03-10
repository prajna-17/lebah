"use client";

import { useRouter } from "next/navigation";

export default function PremiumCottonBanner({ activeTab }) {
  const router = useRouter();

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .pcb-section {
            padding: 0 64px;
            margin: 8px 0;
          }

          .pcb-wrapper {
            position: relative;
            overflow: hidden;
            border-radius: 4px;
            box-shadow:
              0 4px 24px rgba(0,0,0,0.11),
              0 0 0 1px rgba(201,164,76,0.2);
          }

          .pcb-wrapper::before,
          .pcb-wrapper::after {
            content: '';
            position: absolute;
            left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #c9a44c, #f0d080, #c9a44c, transparent);
            z-index: 5;
            pointer-events: none;
          }
          .pcb-wrapper::before { top: 0; }
          .pcb-wrapper::after  { bottom: 0; }

          .pcb-img {
            height: 220px !important;
            display: block;
            width: 100%;
            object-fit: cover;
            object-position: center 40%;
            filter: brightness(0.8) saturate(1.08);
            transition: transform 5s ease, filter 0.4s ease;
          }

          .pcb-wrapper:hover .pcb-img {
            transform: scale(1.04);
            filter: brightness(0.88) saturate(1.13);
          }

          /* Right-side text overlay */
          .pcb-overlay {
            display: flex;
            position: absolute;
            inset: 0;
            background: linear-gradient(
              270deg,
              rgba(10,7,2,0.65) 0%,
              rgba(10,7,2,0.28) 50%,
              transparent 100%
            );
            align-items: center;
            justify-content: flex-end;
            padding-right: 52px;
            z-index: 3;
          }

          .pcb-text {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 6px;
          }

          .pcb-eyebrow {
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.38em;
            text-transform: uppercase;
            color: #c9a44c;
          }

          .pcb-headline {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #fff;
            line-height: 1.05;
            text-shadow: 0 2px 16px rgba(0,0,0,0.4);
          }

          .pcb-rule {
            width: 48px;
            height: 1px;
            background: linear-gradient(270deg, #c9a44c, transparent);
            margin-top: 2px;
          }

          .pcb-sub {
            font-size: 11px;
            font-weight: 400;
            letter-spacing: 0.16em;
            color: rgba(255,255,255,0.6);
            text-transform: uppercase;
          }

          .pcb-cta {
            margin-top: 8px;
            padding: 7px 20px;
            border: 1px solid rgba(201,164,76,0.7);
            border-radius: 2px;
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: #f0d080;
            background: rgba(0,0,0,0.25);
            backdrop-filter: blur(4px);
            cursor: pointer;
            transition: background 0.25s, border-color 0.25s, color 0.25s;
          }
          .pcb-cta:hover {
            background: rgba(201,164,76,0.18);
            border-color: #c9a44c;
            color: #fff;
          }
        }

        /* Mobile — keep everything default */
        @media (max-width: 767px) {
          .pcb-overlay { display: none !important; }
          .pcb-wrapper::before,
          .pcb-wrapper::after { display: none !important; }
          .pcb-img { height: 160px !important; }
        }
      `}</style>

      <section className="pcb-section w-full">
        <div className="pcb-wrapper">
          <img
            src={activeTab === "women" ? "/img/bet.jpg" : "/img/precotton.jpeg"}
            className="pcb-img w-full h-[160px] object-cover cursor-pointer transition-transform duration-200 active:scale-[0.97]"
            onClick={() => router.push(`/products?superCategory=${activeTab}`)}
          />

          {/* Desktop overlay */}
          <div
            className="pcb-overlay"
            onClick={() => router.push(`/products?superCategory=${activeTab}`)}
          >
            <div className="pcb-text">
              <span className="pcb-eyebrow">Exclusive Collection</span>
              <span className="pcb-headline">
                {activeTab === "women" ? "Premium Wear" : "Premium Cotton"}
              </span>
              <div className="pcb-rule" />
              <span className="pcb-sub">Crafted for comfort & style</span>
              <span className="pcb-cta">Shop Now</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
