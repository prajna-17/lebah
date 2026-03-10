"use client";
import { useRouter } from "next/navigation";

export default function CategoryCard({
  id,
  img,
  title,
  subtitle,
  superCategory,
}) {
  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Cinzel:wght@400;500&display=swap');

        @keyframes softGlow {
          0%, 100% { opacity: 0.6; box-shadow: 0 0 4px #c9a44c44; }
          50%       { opacity: 1;   box-shadow: 0 0 10px #c9a44c99; }
        }

        @media (min-width: 768px) {
          .cat-card-desktop {
            height: 260px !important;
            border-radius: 4px !important;
            box-shadow:
              0 2px 8px rgba(0,0,0,0.08),
              0 0 0 1px rgba(201,164,76,0.18);
            transition: transform 0.32s cubic-bezier(.2,.8,.3,1),
                        box-shadow 0.32s ease !important;
          }

          .cat-card-desktop:hover {
            transform: scale(1.035) translateY(-3px) !important;
            box-shadow:
              0 12px 32px rgba(0,0,0,0.14),
              0 0 0 1px rgba(201,164,76,0.45),
              inset 0 0 0 1px rgba(201,164,76,0.12) !important;
          }

          .cat-inner-img-desktop {
            height: 210px !important;
          }

          .cat-title-desktop {
            font-family: 'Cormorant Garamond', Georgia, serif !important;
            font-size: 15px !important;
            font-style: italic !important;
            font-weight: 400 !important;
            letter-spacing: 0.06em !important;
            text-shadow: 0 1px 6px rgba(0,0,0,0.5) !important;
          }

          .cat-subtitle-desktop {
            font-family: 'Cinzel', Georgia, serif !important;
            font-size: 9px !important;
            letter-spacing: 0.28em !important;
            text-transform: uppercase !important;
            color: #8a6a1a !important;
            margin-top: 3px !important;
          }

          /* Shimmer on hover */
          .cat-card-desktop::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              115deg,
              transparent 40%,
              rgba(201,164,76,0.08) 50%,
              transparent 60%
            );
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 5;
            pointer-events: none;
            border-radius: inherit;
          }
          .cat-card-desktop:hover::before {
            opacity: 1;
          }
        }

        @media (max-width: 767px) {
          .cat-card-desktop { height: 190px; }
          .cat-inner-img-desktop { height: 155px; }
        }
      `}</style>

      <div
        onClick={() =>
          router.push(`/products?category=${id}&superCategory=${superCategory}`)
        }
        className="cat-card-desktop relative w-full h-[190px] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ease-in-out active:scale-95 active:shadow-inner hover:scale-[1.02]"
      >
        {/* GOLDEN BACKGROUND IMAGE */}
        <img
          src="/img/cat.png"
          alt="gold frame"
          className="absolute inset-0 w-full h-full object-fill"
        />

        {/* CONTENT ON TOP */}
        <div className="relative p-1 pt-1">
          {/* INNER IMAGE CARD */}
          <div className="overflow-hidden rounded-lg bg-black">
            <div className="relative">
              <img
                src={img}
                alt={title}
                className="cat-inner-img-desktop h-[155px] w-full object-cover"
              />

              {/* BLACK TRANSPARENT GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* TITLE ON GRADIENT */}
              <h3 className="cat-title-desktop absolute bottom-4 left-0 right-0 text-center text-white text-sm font-medium tracking-wide italic">
                {title}
              </h3>
            </div>
          </div>

          {/* FOOTER TEXT */}
          <div className="relative bottom-3 mt-4 text-center">
            <p className="cat-subtitle-desktop text-xs tracking-wide text-black font-bold">
              {subtitle}
            </p>
            <div className="mx-auto mt-0 h-[2px] w-12 bg-[#c9a44c] animate-[softGlow_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </>
  );
}
