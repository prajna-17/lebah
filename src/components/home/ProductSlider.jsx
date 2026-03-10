"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { API } from "@/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/utils/cart";
import { createPortal } from "react-dom";
import LuxuryLoader from "./LuxuryLoader";
import { SUPER_CATEGORY_MAP } from "@/utils/superCategoryMap";

export default function ProductSlider({ activeTab }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = `${API}/products`;
    if (activeTab) {
      url += `?superCategory=${SUPER_CATEGORY_MAP[activeTab]}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab]);

  const requireLogin = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return false;
    }
    return true;
  };

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .ps-section {
            background: linear-gradient(160deg, #fdfaf5 0%, #f7f0e6 60%, #fdfaf5 100%);
            padding: 48px 64px 56px !important;
            position: relative;
          }

          .ps-section::before,
          .ps-section::after {
            content: '';
            position: absolute;
            left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #c9a44c66, #c9a44caa, #c9a44c66, transparent);
            pointer-events: none;
          }
          .ps-section::before { top: 0; }
          .ps-section::after  { bottom: 0; }

          .ps-header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 32px;
          }

          .ps-eyebrow {
            font-size: 9px;
            letter-spacing: 0.35em;
            text-transform: uppercase;
            color: #c9a44c;
            font-weight: 500;
            margin-bottom: 4px;
          }

          .ps-headline {
            font-size: 26px;
            font-weight: 600;
            letter-spacing: -0.01em;
            color: #1a1208;
            line-height: 1;
          }

          .ps-header-rule {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
          }
          .ps-header-rule span {
            width: 4px; height: 4px;
            background: #c9a44c;
            border-radius: 50%;
          }
          .ps-header-rule::before {
            content: '';
            width: 48px; height: 1px;
            background: linear-gradient(90deg, #c9a44c, transparent);
          }
          .ps-header-rule::after {
            content: '';
            width: 80px; height: 1px;
            background: linear-gradient(90deg, transparent, #c9a44c44);
          }

          .ps-track {
            display: grid !important;
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 24px !important;
            overflow: visible !important;
          }

          .ps-card {
            min-width: unset !important;
            max-width: unset !important;
            opacity: 0;
            transform: translateY(16px);
            animation: psCardIn 0.45s ease forwards;
          }
          .ps-card:nth-child(1)  { animation-delay: 0.04s; }
          .ps-card:nth-child(2)  { animation-delay: 0.09s; }
          .ps-card:nth-child(3)  { animation-delay: 0.14s; }
          .ps-card:nth-child(4)  { animation-delay: 0.19s; }
          .ps-card:nth-child(5)  { animation-delay: 0.24s; }
          .ps-card:nth-child(6)  { animation-delay: 0.29s; }
          .ps-card:nth-child(7)  { animation-delay: 0.34s; }
          .ps-card:nth-child(8)  { animation-delay: 0.39s; }
          .ps-card:nth-child(9)  { animation-delay: 0.44s; }
          .ps-card:nth-child(10) { animation-delay: 0.49s; }

          @keyframes psCardIn {
            to { opacity: 1; transform: translateY(0); }
          }

          .ps-img-wrap {
            box-shadow:
              0 2px 8px rgba(0,0,0,0.09),
              0 0 0 1px rgba(201,164,76,0.15);
            border-radius: 12px !important;
            transition:
              box-shadow 0.3s ease,
              transform 0.3s cubic-bezier(.2,.8,.3,1) !important;
          }
          .ps-card:hover .ps-img-wrap {
            box-shadow:
              0 10px 28px rgba(0,0,0,0.14),
              0 0 0 1px rgba(201,164,76,0.4);
            transform: translateY(-3px);
          }

          .ps-cart-btn {
            width: 36px !important;
            height: 36px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s !important;
          }
          .ps-cart-btn:hover:not(:disabled) {
            background: #0f243e !important;
            transform: scale(1.1) !important;
            box-shadow: 0 4px 14px rgba(15,36,62,0.3) !important;
          }
          .ps-cart-btn:hover:not(:disabled) svg {
            color: #fff !important;
          }

          .ps-rating {
            font-size: 11px !important;
            background: rgba(255,255,255,0.93) !important;
            backdrop-filter: blur(4px);
            border: 1px solid rgba(201,164,76,0.25);
            box-shadow: 0 1px 6px rgba(0,0,0,0.1);
          }

          .ps-discount {
            font-size: 10px !important;
            font-weight: 600 !important;
            letter-spacing: 0.02em !important;
          }
        }

        /* ── Mobile — restore defaults ── */
        @media (max-width: 767px) {
          .ps-header { display: none !important; }
          .ps-track {
            display: flex !important;
            overflow-x: auto !important;
            gap: 20px !important;
          }
          .ps-card {
            min-width: 100px !important;
            max-width: 200px !important;
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>

      {/* ===== SLIDER ===== */}
      <section className="ps-section bg-white px-4 py-10">
        {/* Desktop section header */}
        <div className="ps-header">
          <span className="ps-eyebrow">Handpicked For You</span>
          <span className="ps-headline">Featured Products</span>
          <div className="ps-header-rule">
            <span />
          </div>
        </div>

        {loading ? (
          <LuxuryLoader />
        ) : (
          <div className="ps-track flex gap-5 overflow-x-auto scrollbar-hide">
            {products.map((p) => (
              <div
                key={p._id}
                className="ps-card min-w-[100px] max-w-[200px] flex-shrink-0 cursor-pointer transition-all duration-200 ease-in-out active:scale-95"
              >
                {/* IMAGE CARD */}
                <div className="ps-img-wrap relative rounded-xl overflow-hidden transition-all duration-200 active:scale-[0.98]">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-full aspect-[4/5] object-cover"
                    onClick={() => {
                      const matchedColor =
                        p.colorImages?.find((c) =>
                          c.images?.includes(p.images?.[0]),
                        )?.color || null;
                      router.push(
                        matchedColor
                          ? `/products/${p._id}?color=${encodeURIComponent(matchedColor)}`
                          : `/products/${p._id}`,
                      );
                    }}
                  />
                  {!p.inStock && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
                      SOLD OUT
                    </div>
                  )}

                  {/* RATING */}
                  <div className="ps-rating absolute bottom-3 left-3 bg-white px-2 py-1 rounded-md text-mid text-gray-800 flex items-center gap-1 font-semibold">
                    <span>{p.rating || 4.3}</span>
                    <span>★</span>
                  </div>

                  {/* CART ICON */}
                  <button
                    disabled={!p.inStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!p.inStock) return;
                      if (!requireLogin()) return;
                      fetch(`${API}/products/${p._id}`)
                        .then((res) => res.json())
                        .then((data) => {
                          setSelectedProduct(data);
                          setSelectedSize(null);
                        });
                    }}
                    className={`ps-cart-btn absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90
                      ${p.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"}
                    `}
                  >
                    <FiShoppingCart
                      size={18}
                      className={p.inStock ? "text-[#0f243e]" : "text-gray-400"}
                    />
                  </button>
                </div>

                {/* TEXT — fonts untouched */}
                <div className="mt-3">
                  <p className="text-mid font-medium text-gray-900">
                    {p.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-big text-gray-900">
                    <span className="font-semibold">
                      ₹ {p.price.toLocaleString()}
                    </span>
                    {p.oldPrice && (
                      <>
                        <span className="line-through text-gray-400">
                          ₹ {p.oldPrice.toLocaleString()}
                        </span>
                        <span className="ps-discount text-red-600 font-medium">
                          {Math.round(
                            ((p.oldPrice - p.price) / p.oldPrice) * 100,
                          )}
                          % OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
      </section>

      {/* ===== SIZE MODAL — UNTOUCHED ===== */}
      {selectedProduct &&
        typeof window !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedProduct(null)}
            />
            <div className="fixed inset-x-4 bottom-6 z-50 bg-white rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Select Size
              </h3>
              <div className="flex gap-3 flex-wrap mb-6">
                {(
                  selectedProduct.sizes ||
                  selectedProduct.colorImages?.[0]?.sizes ||
                  []
                ).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border text-gray-900 ${
                      selectedSize === size
                        ? "bg-[#0f243e] text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                disabled={!selectedSize}
                onClick={() => {
                  const defaultColor =
                    selectedProduct.colorImages?.[0]?.color ||
                    selectedProduct.colors?.[0] ||
                    "Default";
                  addToCart({
                    productId: selectedProduct._id,
                    title: selectedProduct.title,
                    image: selectedProduct.images?.[0],
                    price: selectedProduct.price,
                    color: defaultColor,
                    size: selectedSize,
                  });
                  setAddedItem({
                    image: selectedProduct.images?.[0],
                    title: selectedProduct.title,
                  });
                  setSelectedProduct(null);
                  setShowCartModal(true);
                }}
                className="w-full py-3 bg-[#0f243e] text-white rounded-full disabled:opacity-40"
              >
                Add to cart
              </button>
            </div>
          </>,
          document.body,
        )}

      {/* ===== CART TOAST — UNTOUCHED ===== */}
      {showCartModal &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="added-bar-wrapper">
            <div className="added-bar">
              <span
                className="close-icon"
                onClick={() => setShowCartModal(false)}
              >
                ✕
              </span>
              <div className="added-content">
                <img src={addedItem?.image} alt="product" />
                <span>Added to cart ✔</span>
              </div>
              <button
                className="go-to-cart-btn"
                onClick={() => router.push("/cart")}
              >
                Go to Cart
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
