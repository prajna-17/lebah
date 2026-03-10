"use client";

import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { useRouter } from "next/navigation";
import { API } from "@/utils/api";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { addToCart } from "@/utils/cart";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import { createPortal } from "react-dom";
import { SUPER_CATEGORY_MAP } from "@/utils/superCategoryMap";
import { FiStar } from "react-icons/fi";

export default function BestProducts({ activeTab }) {
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    fetch(`${API}/products?superCategory=${SUPER_CATEGORY_MAP[activeTab]}`)
      .then((res) => res.json())
      .then((data) => {
        const productArray = Array.isArray(data) ? data : data.data || [];
        const bestSelling = productArray.filter(
          (p) =>
            p.productSellingCategory === "best-selling" && p.category !== null,
        );
        console.log(
          "BEST SELLING FINAL:",
          bestSelling.map((p) => ({
            title: p.title,
            selling: p.productSellingCategory,
            category: p.category?.name,
          })),
        );
        setProducts(bestSelling);
        const map = {};
        bestSelling.forEach((p) => {
          const defaultColor =
            p.colorImages?.[0]?.color || p.colors?.[0] || "Default";
          const defaultSize = p.sizes?.[0] || "Free";
          const variantId = `${p._id}-${defaultColor}-${defaultSize}`;
          map[variantId] = isInWishlist(variantId);
        });
        setLikedMap(map);
      });

    const sync = () => setLikedMap((prev) => ({ ...prev }));
    window.addEventListener("wishlist-updated", sync);
    return () => window.removeEventListener("wishlist-updated", sync);
  }, [activeTab]);

  const requireLogin = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return false;
    }
    return true;
  };

  const showToast = (msg) => {
    const toast = document.createElement("div");
    toast.className = "wish-toast";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .bp-section {
            background: linear-gradient(160deg, #fdfaf5 0%, #f7f0e6 60%, #fdfaf5 100%);
            padding: 48px 64px 56px !important;
            position: relative;
          }
          .bp-section::before,
          .bp-section::after {
            content: '';
            position: absolute;
            left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #c9a44c66, #c9a44caa, #c9a44c66, transparent);
            pointer-events: none;
          }
          .bp-section::before { top: 0; }
          .bp-section::after  { bottom: 0; }

          /* Section header */
          .bp-header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 36px;
          }
          .bp-eyebrow {
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.38em;
            text-transform: uppercase;
            color: #c9a44c;
            margin-bottom: 4px;
          }
          .bp-headline {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.01em;
            color: #1a1208;
            line-height: 1;
          }
          .bp-header-rule {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
          }
          .bp-header-rule span {
            width: 4px; height: 4px;
            background: #c9a44c;
            border-radius: 50%;
          }
          .bp-header-rule::before {
            content: '';
            width: 48px; height: 1px;
            background: linear-gradient(90deg, #c9a44c, transparent);
          }
          .bp-header-rule::after {
            content: '';
            width: 80px; height: 1px;
            background: linear-gradient(90deg, transparent, #c9a44c44);
          }

          /* Grid — 4 cols on desktop */
          .bp-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 28px !important;
          }

          /* Card */
          .bp-card {
            opacity: 0;
            transform: translateY(16px);
            animation: bpCardIn 0.45s ease forwards;
          }
          .bp-card:nth-child(1) { animation-delay: 0.04s; }
          .bp-card:nth-child(2) { animation-delay: 0.10s; }
          .bp-card:nth-child(3) { animation-delay: 0.16s; }
          .bp-card:nth-child(4) { animation-delay: 0.22s; }
          .bp-card:nth-child(5) { animation-delay: 0.28s; }
          .bp-card:nth-child(6) { animation-delay: 0.34s; }
          .bp-card:nth-child(7) { animation-delay: 0.40s; }
          .bp-card:nth-child(8) { animation-delay: 0.46s; }
          @keyframes bpCardIn {
            to { opacity: 1; transform: translateY(0); }
          }

          /* Image wrapper */
          .bp-img-wrap {
            border-radius: 4px;
            overflow: hidden;
            box-shadow:
              0 2px 8px rgba(0,0,0,0.09),
              0 0 0 1px rgba(201,164,76,0.14);
            transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(.2,.8,.3,1);
          }
          .bp-card:hover .bp-img-wrap {
            box-shadow:
              0 12px 32px rgba(0,0,0,0.14),
              0 0 0 1px rgba(201,164,76,0.4);
            transform: translateY(-3px);
          }

          /* Image taller on desktop */
          .bp-main-img {
            height: 340px !important;
            transition: transform 5s ease !important;
          }
          .bp-card:hover .bp-main-img {
            transform: scale(1.04);
          }

          /* Heart button */
          .bp-heart {
            width: 34px !important;
            height: 34px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.14) !important;
            transition: transform 0.2s ease, box-shadow 0.2s !important;
            border: 1px solid rgba(201,164,76,0.18) !important;
          }
          .bp-heart:hover:not(:disabled) {
            transform: scale(1.12) !important;
            box-shadow: 0 4px 14px rgba(0,0,0,0.18) !important;
          }

          /* Add to cart button */
          .bp-atc {
            border-radius: 2px !important;
            font-size: 11px !important;
            font-weight: 600 !important;
            letter-spacing: 0.12em !important;
            text-transform: uppercase !important;
            padding: 12px !important;
            transition: background 0.22s ease, box-shadow 0.22s ease !important;
            box-shadow: 0 2px 8px rgba(11,29,54,0.15) !important;
          }
          .bp-atc:hover:not(:disabled) {
            background: #1a3560 !important;
            box-shadow: 0 6px 20px rgba(11,29,54,0.28) !important;
          }

          /* View All button */
          .bp-view-all {
            border: 1px solid rgba(201,164,76,0.6) !important;
            color: #8a6a1a !important;
            font-size: 10px !important;
            font-weight: 600 !important;
            letter-spacing: 0.25em !important;
            text-transform: uppercase !important;
            padding: 12px 40px !important;
            transition: background 0.22s, border-color 0.22s, color 0.22s !important;
          }
          .bp-view-all:hover {
            background: rgba(201,164,76,0.1) !important;
            border-color: #c9a44c !important;
            color: #1a1208 !important;
          }
        }

        /* Mobile — keep everything default */
        @media (max-width: 767px) {
          .bp-header { display: none !important; }
          .bp-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
          .bp-card { opacity: 1 !important; transform: none !important; animation: none !important; }
          .bp-main-img { height: 280px !important; }
        }
      `}</style>

      <section className="bp-section bg-white px-4 py-10">
        {/* Desktop header */}
        <div className="bp-header">
          <span className="bp-eyebrow">Top Picks</span>
          <span className="bp-headline">Best Sellers</span>
          <div className="bp-header-rule">
            <span />
          </div>
        </div>

        <div className="bp-grid grid grid-cols-2 gap-5">
          {products.length === 0 ? (
            <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center py-28 text-center">
              {" "}
              <h3 className="text-xl font-semibold text-[#0b1d36] tracking-wide">
                No Best Sellers Yet
              </h3>
              <p className="text-sm text-gray-500 mt-3 max-w-sm leading-relaxed">
                Our curated best-selling pieces will appear here once selected.
                Discover our full collection in the meantime.
              </p>
              <button
                onClick={() =>
                  router.push(`/products?superCategory=${activeTab}`)
                }
                className="mt-8 border border-[#0b1d36] px-8 py-3 text-sm tracking-wide text-[#0b1d36] font-bold hover:bg-[#0b1d36] hover:text-white transition-all duration-300"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            products.map((p) => {
              const defaultColor =
                p.colorImages?.[0]?.color || p.colors?.[0] || "Default";
              const defaultSize = p.sizes?.[0] || "Free";
              const variantId = `${p._id}-${defaultColor}-${defaultSize}`;
              const liked = likedMap[variantId];

              return (
                <div
                  key={p._id}
                  onClick={() => router.push(`/products/${p._id}`)}
                  className="bp-card cursor-pointer relative transition-all duration-200 ease-in-out active:scale-95"
                >
                  {/* IMAGE */}
                  <div className="bp-img-wrap relative overflow-hidden transition-all duration-200 active:scale-[0.98]">
                    <div className="relative overflow-hidden">
                      <img
                        src={p.images?.[0]}
                        alt={p.title}
                        className="bp-main-img h-[280px] w-full object-cover"
                      />
                      {!p.inStock && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
                          SOLD OUT
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white">
                        <div className="flex items-end gap-3">
                          <img
                            src={p.images?.[0]}
                            alt="preview"
                            className="w-12 h-18 object-cover rounded-md border border-white/30"
                          />
                          <div className="flex-1">
                            <p className="text-xs font-medium leading-tight">
                              {p.title}
                            </p>
                            <div className="text-xs mt-1">
                              ₹ {p.price}
                              {p.oldPrice && (
                                <span className="line-through ml-2 text-gray-300">
                                  ₹ {p.oldPrice}
                                </span>
                              )}
                            </div>
                            {p.oldPrice && (
                              <p className="text-green-500 text-xs font-semibold mt-1">
                                {Math.round(
                                  ((p.oldPrice - p.price) / p.oldPrice) * 100,
                                )}
                                % OFF
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* HEART */}
                    <button
                      disabled={!p.inStock}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!p.inStock) return;
                        if (!requireLogin()) return;
                        toggleWishlist({
                          productId: p._id,
                          title: p.title,
                          image: p.images?.[0],
                          price: p.price,
                          color: defaultColor,
                          size: p.sizes?.[0] || "Free",
                        });
                        showToast(
                          liked ? "Removed from Wishlist" : "Added to Wishlist",
                        );
                        const heart = document.createElement("div");
                        heart.innerHTML = "💙";
                        heart.className = "pop-heart";
                        e.currentTarget.appendChild(heart);
                        setTimeout(() => heart.remove(), 700);
                        setLikedMap((prev) => ({
                          ...prev,
                          [variantId]: !liked,
                        }));
                        const audio = new Audio("/sounds/pop.mp3");
                        audio.volume = 0.6;
                        audio.play();
                      }}
                      className={`bp-heart absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow z-50 transition
                        ${p.inStock ? "bg-white hover:scale-105" : "bg-gray-200 opacity-50 cursor-not-allowed"}`}
                    >
                      <FiHeart
                        size={18}
                        fill={liked && p.inStock ? "#5b2d1f" : "none"}
                        color={!p.inStock ? "#999" : "#333"}
                      />
                    </button>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    disabled={!p.inStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!requireLogin()) return;
                      if (!p.inStock) return;
                      setActiveProduct(p);
                      setSelectedSize(null);
                      setShowVariantModal(true);
                    }}
                    className={`bp-atc mt-2 w-full py-3 text-sm text-white transition-all duration-150 active:scale-95
                      ${p.inStock ? "bg-[#0b1d36]" : "bg-gray-400 cursor-not-allowed"}`}
                  >
                    {p.inStock ? "Add to cart" : "Sold Out"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {products.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() =>
                router.push(`/products?superCategory=${activeTab}`)
              }
              className="bp-view-all border border-black px-10 py-3 text-sm text-[#0b1d36]"
            >
              View All
            </button>
          </div>
        )}

        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
      </section>

      {/* ===== CART MODAL — UNTOUCHED ===== */}
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

      {/* ===== SIZE MODAL — UNTOUCHED ===== */}
      {showVariantModal &&
        activeProduct &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => {
                setShowVariantModal(false);
                setActiveProduct(null);
              }}
            />
            <div className="fixed inset-x-4 bottom-6 z-50 bg-white rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Select Size
              </h3>
              <div className="flex gap-3 flex-wrap mb-6">
                {activeProduct.sizes?.map((size) => (
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
                    activeProduct.colorImages?.[0]?.color ||
                    activeProduct.colors?.[0] ||
                    "Default";
                  addToCart({
                    productId: activeProduct._id,
                    title: activeProduct.title,
                    image: activeProduct.images?.[0],
                    price: activeProduct.price,
                    oldPrice: activeProduct.oldPrice,
                    color: defaultColor,
                    size: selectedSize,
                  });
                  setAddedItem({
                    image: activeProduct.images?.[0],
                    title: activeProduct.title,
                  });
                  setShowVariantModal(false);
                  setActiveProduct(null);
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
    </>
  );
}
