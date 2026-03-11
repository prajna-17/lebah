"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/utils/api";
import { addToCart } from "@/utils/cart";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import { createPortal } from "react-dom";
import { SUPER_CATEGORY_MAP } from "@/utils/superCategoryMap";

export default function RelatedProducts({ activeTab, currentProductId }) {
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const [likedMap, setLikedMap] = useState({});
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => {
        const productArray = Array.isArray(data) ? data : data.data || [];
        const filtered = productArray.filter(
          (p) =>
            p._id !== currentProductId &&
            p.superCategory === SUPER_CATEGORY_MAP[activeTab],
        );
        const sliced = filtered.slice(0, 4);
        setProducts(sliced);
        const map = {};
        sliced.forEach((p) => {
          const defaultColor =
            p.colorImages?.[0]?.color || p.colors?.[0] || "Default";
          const defaultSize = p.sizes?.[0] || "Free";
          const variantId = `${p._id}-${defaultColor}-${defaultSize}`;
          map[variantId] = isInWishlist(variantId);
        });
        setLikedMap(map);
      });
  }, [activeTab, currentProductId]);

  const requireLogin = (cb) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    cb && cb();
  };

  const showToast = (msg) => {
    const toast = document.createElement("div");
    toast.className = "wish-toast";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  if (products.length === 0) {
    return (
      <section className="px-4 mt-14 text-gray-400 text-sm">
        No related products found
      </section>
    );
  }

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .rp-section {
            padding: 0 64px !important;
            margin-top: 56px !important;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }

          /* Header */
          .rp-header {
            margin-bottom: 28px !important;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(201,164,76,0.2);
          }
          .rp-title {
            font-size: 20px !important;
            font-weight: 700 !important;
            letter-spacing: -0.01em !important;
          }
          .rp-view-all {
            font-size: 11px !important;
            font-weight: 500 !important;
            letter-spacing: 0.12em !important;
            text-transform: uppercase !important;
            text-decoration: none !important;
            color: #8a6a1a !important;
            border-bottom: 1px solid rgba(201,164,76,0.4);
            padding-bottom: 1px;
            transition: color 0.2s, border-color 0.2s !important;
          }
          .rp-view-all:hover {
            color: #c9a44c !important;
            border-color: #c9a44c !important;
          }

          /* 4-col grid */
          .rp-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 24px !important;
          }

          /* Card */
          .rp-card {
            opacity: 0;
            transform: translateY(14px);
            animation: rpCardIn 0.4s ease forwards;
          }
          .rp-card:nth-child(1) { animation-delay: 0.04s; }
          .rp-card:nth-child(2) { animation-delay: 0.10s; }
          .rp-card:nth-child(3) { animation-delay: 0.16s; }
          .rp-card:nth-child(4) { animation-delay: 0.22s; }
          @keyframes rpCardIn {
            to { opacity: 1; transform: translateY(0); }
          }

          /* Image wrapper */
          .rp-img-wrap {
            border-radius: 4px;
            overflow: hidden;
            box-shadow:
              0 2px 8px rgba(0,0,0,0.08),
              0 0 0 1px rgba(201,164,76,0.13);
            transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(.2,.8,.3,1);
          }
          .rp-card:hover .rp-img-wrap {
            box-shadow:
              0 10px 28px rgba(0,0,0,0.13),
              0 0 0 1px rgba(201,164,76,0.38);
            transform: translateY(-3px);
          }

          /* Image taller + zoom */
          .rp-img {
            height: 280px !important;
            transition: transform 5s ease !important;
          }
          .rp-card:hover .rp-img {
            transform: scale(1.05);
          }

          /* Icon buttons */
          .rp-icon-btn {
            border: 1px solid rgba(201,164,76,0.15) !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            transition: transform 0.2s ease, box-shadow 0.2s !important;
          }
          .rp-icon-btn:hover:not(:disabled) {
            transform: scale(1.12) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.16) !important;
          }

          /* Rating pill */
          .rp-rating {
            backdrop-filter: blur(4px);
            background: rgba(255,255,255,0.92) !important;
            border: 1px solid rgba(201,164,76,0.18) !important;
            box-shadow: 0 1px 6px rgba(0,0,0,0.09) !important;
          }
        }

        /* Mobile — zero changes */
        @media (max-width: 767px) {
          .rp-section { padding: 0 16px !important; margin-top: 56px !important; }
          .rp-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .rp-card { opacity: 1 !important; transform: none !important; animation: none !important; }
          .rp-img-wrap { border-radius: 0 !important; box-shadow: none !important; transition: none !important; }
          .rp-card:hover .rp-img-wrap { transform: none !important; box-shadow: none !important; }
          .rp-img { height: 230px !important; transition: none !important; }
          .rp-card:hover .rp-img { transform: none !important; }
          .rp-icon-btn { border: none !important; box-shadow: none !important; transition: none !important; }
          .rp-icon-btn:hover:not(:disabled) { transform: none !important; }
          .rp-rating { backdrop-filter: none !important; border: none !important; box-shadow: none !important; }
          .rp-title { font-size: 16px !important; }
          .rp-view-all { font-size: 14px !important; text-transform: none !important; letter-spacing: 0 !important; color: #4b5563 !important; text-decoration: underline !important; border-bottom: none !important; }
          .rp-header { border-bottom: none !important; padding-bottom: 0 !important; margin-bottom: 16px !important; }
        }
      `}</style>

      <section className="rp-section px-4 mt-14 text-gray-900">
        {/* HEADER */}
        <div className="rp-header flex justify-between items-center mb-4">
          <h2 className="rp-title text-base font-semibold">Related Products</h2>
          <button
            onClick={() => router.push(`/products?superCategory=${activeTab}`)}
            className="rp-view-all text-sm underline text-gray-600"
          >
            View All
          </button>
        </div>

        {/* GRID */}
        <div className="rp-grid grid grid-cols-2 gap-4">
          {products.map((p) => {
            const defaultColor =
              p.colorImages?.[0]?.color || p.colors?.[0] || "Default";
            const defaultSize = p.sizes?.[0] || "Free";
            const variantId = `${p._id}-${defaultColor}-${defaultSize}`;
            const liked = likedMap[variantId];

            return (
              <div
                key={p._id}
                onClick={() => router.push(`/products/${p._id}`)}
                className="rp-card relative cursor-pointer"
              >
                {/* IMAGE */}
                <div className="rp-img-wrap relative overflow-hidden">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="rp-img w-full h-[230px] object-cover"
                  />
                  {!p.inStock && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      SOLD OUT
                    </div>
                  )}

                  {/* WISHLIST */}
                  <button
                    disabled={!p.inStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!p.inStock) return;
                      requireLogin(() => {
                        toggleWishlist({
                          variantId,
                          productId: p._id,
                          title: p.title,
                          image: p.images?.[0],
                          price: p.price,
                          color: defaultColor,
                          size: defaultSize,
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
                      });
                    }}
                    className={`rp-icon-btn absolute top-2 right-2 p-1.5 rounded-full shadow transition
                      ${p.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"}`}
                  >
                    <Heart
                      size={16}
                      fill={liked && p.inStock ? "#5b2d1f" : "none"}
                      color={!p.inStock ? "#999" : "currentColor"}
                    />
                  </button>

                  {/* CART */}
                  <button
                    disabled={!p.inStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!p.inStock) return;
                      requireLogin(() => {
                        addToCart({
                          productId: p._id,
                          title: p.title,
                          image: p.images?.[0],
                          price: p.price,
                          color: defaultColor,
                          size: defaultSize,
                        });
                        const audio = new Audio("/sounds/pop.mp3");
                        audio.volume = 0.6;
                        audio.play();
                        setAddedItem({ image: p.images?.[0], title: p.title });
                        setShowCartModal(true);
                        document
                          .querySelector(".cart-icon")
                          ?.classList.add("cart-bounce");
                        setTimeout(() => {
                          document
                            .querySelector(".cart-icon")
                            ?.classList.remove("cart-bounce");
                        }, 600);
                      });
                    }}
                    className={`rp-icon-btn absolute bottom-2 right-2 p-1.5 rounded-full shadow transition
                      ${p.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"}`}
                  >
                    <ShoppingCart
                      size={16}
                      className={p.inStock ? "text-black" : "text-gray-400"}
                    />
                  </button>

                  {/* RATING */}
                  <div className="rp-rating absolute bottom-2 left-2 bg-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 shadow">
                    <span className="font-semibold">{p.rating || 4.6}</span>
                    <Star size={12} className="fill-black text-black" />
                    <span className="text-gray-500">
                      ({p.reviews?.length || 256})
                    </span>
                  </div>
                </div>

                {/* DETAILS — untouched */}
                <div className="mt-2">
                  <p className="text-sm font-semibold leading-tight">
                    {p.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold">₹ {p.price}</span>
                    {p.oldPrice && (
                      <>
                        <span className="line-through text-xs text-gray-400">
                          ₹ {p.oldPrice}
                        </span>
                        <span className="text-xs text-red-500 font-medium">
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
            );
          })}
        </div>

        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
      </section>

      {/* CART MODAL — untouched */}
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
