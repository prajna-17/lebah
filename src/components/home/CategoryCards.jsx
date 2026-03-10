import CategoryCard from "./CategoryCard";
import { API } from "@/utils/api";
import { useEffect, useState } from "react";
import LuxuryLoader from "./LuxuryLoader";
import { SUPER_CATEGORY_MAP } from "@/utils/superCategoryMap";

export default function CategoryCards({ activeTab }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log("ACTIVE TAB:", activeTab);

    fetch(`${API}/categories?superCategory=${SUPER_CATEGORY_MAP[activeTab]}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      });
  }, [activeTab]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&display=swap');

        @media (min-width: 768px) {
          .cat-section-desktop {
            background: linear-gradient(160deg, #fdfaf5 0%, #f7f0e6 50%, #fdf8f0 100%);
            padding: 48px 64px 56px;
            position: relative;
          }

          .cat-section-desktop::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #c9a44c55, #c9a44c99, #c9a44c55, transparent);
          }

          .cat-section-desktop::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #c9a44c55, #c9a44c99, #c9a44c55, transparent);
          }

          .cat-section-label {
            display: block;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 11px;
            font-weight: 300;
            letter-spacing: 0.35em;
            text-transform: uppercase;
            color: #c9a44c;
            text-align: center;
            margin-bottom: 6px;
          }

          .cat-section-title {
            display: block;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 28px;
            font-weight: 300;
            font-style: italic;
            letter-spacing: 0.04em;
            color: #1a1208;
            text-align: center;
            margin-bottom: 36px;
          }

          .cat-section-divider {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 40px;
            margin-top: -24px;
          }

          .cat-section-divider::before,
          .cat-section-divider::after {
            content: '';
            height: 1px;
            width: 80px;
            background: linear-gradient(90deg, transparent, #c9a44c88);
          }

          .cat-section-divider::after {
            background: linear-gradient(90deg, #c9a44c88, transparent);
          }

          .cat-section-divider span {
            width: 4px;
            height: 4px;
            background: #c9a44c;
            border-radius: 50%;
          }

          .cat-grid-desktop {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 24px !important;
          }

          /* Stagger card entrance */
          .cat-card-wrap {
            opacity: 0;
            transform: translateY(18px);
            animation: catCardIn 0.5s ease forwards;
          }
          .cat-card-wrap:nth-child(1) { animation-delay: 0.05s; }
          .cat-card-wrap:nth-child(2) { animation-delay: 0.12s; }
          .cat-card-wrap:nth-child(3) { animation-delay: 0.19s; }
          .cat-card-wrap:nth-child(4) { animation-delay: 0.26s; }
          .cat-card-wrap:nth-child(5) { animation-delay: 0.33s; }
          .cat-card-wrap:nth-child(6) { animation-delay: 0.40s; }
          .cat-card-wrap:nth-child(7) { animation-delay: 0.47s; }
          .cat-card-wrap:nth-child(8) { animation-delay: 0.54s; }

          @keyframes catCardIn {
            to { opacity: 1; transform: translateY(0); }
          }
        }

        /* Hide desktop labels on mobile */
        @media (max-width: 767px) {
          .cat-section-label,
          .cat-section-title,
          .cat-section-divider { display: none !important; }
          .cat-grid-desktop { display: grid; }
          .cat-card-wrap { opacity: 1; transform: none; animation: none; }
        }
      `}</style>

      <section className="cat-section-desktop bg-white px-4 py-6">
        {/* Desktop header */}
        <span className="cat-section-label">Our Collection</span>
        <span className="cat-section-title">Shop by Category</span>
        <div className="cat-section-divider">
          <span />
        </div>

        {loading ? (
          <LuxuryLoader />
        ) : (
          <div className="cat-grid-desktop grid grid-cols-3 gap-4 md:grid-cols-3">
            {categories.map((cat) => (
              <div key={cat._id} className="cat-card-wrap">
                <CategoryCard
                  id={cat._id}
                  title={cat.name}
                  subtitle={cat.description || "Explore"}
                  img={cat.image || "/img/placeholder.png"}
                  superCategory={activeTab}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
