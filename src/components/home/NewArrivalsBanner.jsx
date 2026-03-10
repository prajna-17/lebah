"use client";

export default function NewArrivalsBanner({ activeTab }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,400;1,600&family=Cinzel:wght@400&display=swap');

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (min-width: 768px) {
          .na-section {
            margin-top: 40px;
            padding: 0 64px;
          }

          .na-wrapper {
            position: relative;
            overflow: hidden;
            border-radius: 4px;
            box-shadow:
              0 4px 24px rgba(0,0,0,0.13),
              0 0 0 1px rgba(201,164,76,0.22);
          }

          /* Gold top & bottom rule */
          .na-wrapper::before,
          .na-wrapper::after {
            content: '';
            position: absolute;
            left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #c9a44c, #f0d080, #c9a44c, transparent);
            z-index: 5;
            pointer-events: none;
          }
          .na-wrapper::before { top: 0; }
          .na-wrapper::after  { bottom: 0; }

          .na-img-desktop {
            height: 200px !important;
            display: block;
            width: 100%;
            object-fit: cover;
            object-position: center 30%;
            filter: brightness(0.82) saturate(1.1);
            transition: transform 6s ease, filter 0.5s ease;
          }

          .na-wrapper:hover .na-img-desktop {
            transform: scale(1.03);
            filter: brightness(0.88) saturate(1.15);
          }

          /* Dark gradient overlay */
          .na-overlay {
            display: flex;
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              rgba(10,7,2,0.62) 0%,
              rgba(10,7,2,0.28) 45%,
              transparent 100%
            );
            align-items: center;
            padding-left: 52px;
            z-index: 3;
          }

          .na-text-block {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .na-eyebrow {
            font-family: 'Cinzel', Georgia, serif;
            font-size: 9px;
            letter-spacing: 0.4em;
            text-transform: uppercase;
            color: #c9a44c;
          }

          .na-headline {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 34px;
            font-style: italic;
            font-weight: 600;
            letter-spacing: 0.03em;
            color: #fff;
            line-height: 1.1;
            text-shadow: 0 2px 16px rgba(0,0,0,0.4);
          }

          .na-rule {
            width: 48px;
            height: 1px;
            background: linear-gradient(90deg, #c9a44c, transparent);
            margin-top: 2px;
          }

          .na-sub {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 12px;
            font-weight: 300;
            letter-spacing: 0.18em;
            color: rgba(255,255,255,0.65);
            text-transform: uppercase;
          }
        }

        /* Mobile — keep everything default */
        @media (max-width: 767px) {
          .na-overlay { display: none !important; }
          .na-wrapper::before,
          .na-wrapper::after { display: none !important; }
        }
      `}</style>

      <section className="na-section w-full mt-6">
        <div className="na-wrapper">
          <img
            src={
              activeTab === "women" ? "/img/new.jpeg" : "/img/NewArrival.jpg"
            }
            className="na-img-desktop w-full h-[120px] object-cover animate-fadeIn"
          />

          {/* Desktop overlay text */}
          <div className="na-overlay">
            <div className="na-text-block">
              <span className="na-eyebrow">Just Landed</span>
              <span className="na-headline">New Arrivals</span>
              <div className="na-rule" />
              <span className="na-sub">Fresh styles, every season</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
