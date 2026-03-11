export default function SaleHero({ superCategory }) {
  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .sh-section {
            padding: 0 64px;
            margin: 8px 0;
            position: relative;
          }

          .sh-wrapper {
            position: relative;
            overflow: hidden;
            border-radius: 4px;
            box-shadow:
              0 4px 24px rgba(0,0,0,0.13),
              0 0 0 1px rgba(201,164,76,0.22);
          }

          .sh-wrapper::before,
          .sh-wrapper::after {
            content: '';
            position: absolute;
            left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #c9a44c, #f0d080, #c9a44c, transparent);
            z-index: 5;
            pointer-events: none;
          }
          .sh-wrapper::before { top: 0; }
          .sh-wrapper::after  { bottom: 0; }

          .sh-img {
            height: 160px !important;
            width: 100%;
            display: block;
            object-fit: cover;
            filter: brightness(0.8) saturate(1.1);
            transition: transform 5s ease, filter 0.4s ease;
          }
          .sh-wrapper:hover .sh-img {
            transform: scale(1.03);
            filter: brightness(0.88) saturate(1.15);
          }

          /* Centered text overlay */
          .sh-overlay {
            display: flex;
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.28);
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 6px;
            z-index: 3;
          }

          .sh-eyebrow {
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.4em;
            text-transform: uppercase;
            color: #c9a44c;
          }

          .sh-headline {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #fff;
            line-height: 1;
            text-shadow: 0 2px 16px rgba(0,0,0,0.5);
          }

          .sh-rule {
            width: 48px;
            height: 1px;
            background: #c9a44c;
            margin-top: 2px;
          }

          .sh-sub {
            font-size: 11px;
            font-weight: 400;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.65);
          }
        }

        @media (max-width: 767px) {
          .sh-wrapper { border-radius: 0; box-shadow: none; }
          .sh-wrapper::before,
          .sh-wrapper::after { display: none; }
          .sh-overlay { display: none !important; }
          .sh-img { height: 130px !important; filter: none !important; transition: none !important; }
          .sh-wrapper:hover .sh-img { transform: none; filter: none; }
        }
      `}</style>

      <section className="sh-section w-full mt-0.2 h-[130px]">
        <div className="sh-wrapper">
          <img
            src={superCategory === "women" ? "/img/c6.jpeg" : "/img/flat.png"}
            alt="Sale Banner"
            className="sh-img w-full h-full object-cover"
          />

          {/* Desktop overlay */}
          <div className="sh-overlay">
            <span className="sh-eyebrow">Limited Time</span>
            <span className="sh-headline">Sale is Live</span>
            <div className="sh-rule" />
            <span className="sh-sub">Shop the best deals now</span>
          </div>
        </div>
      </section>
    </>
  );
}
