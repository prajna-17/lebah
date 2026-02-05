"use client";

import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { useState, useEffect } from "react";
import { API } from "@/utils/api";
import { Heart } from "lucide-react";
import { addToCart } from "@/utils/cart";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function TrendingWeek() {
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);

  const [likedMap, setLikedMap] = useState({});
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => {
        const trending = data.filter(
          (p) =>
            p.productSellingCategory === "best-selling" ||
            p.productSellingCategory === "featured",
        );
        setProducts(trending);

        const map = {};
        trending.forEach((p) => {
          const variantId = `${p._id}-Default`;
          map[variantId] = isInWishlist(variantId);
        });
        setLikedMap(map);
      });

    const sync = () => setLikedMap((prev) => ({ ...prev }));
    window.addEventListener("wishlist-updated", sync);
    return () => window.removeEventListener("wishlist-updated", sync);
  }, []);

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
      {/* ===== MAIN SECTION (UI UNCHANGED) ===== */}
      <section className="mt-20 mb-24 px-4">
        <h2 className="text-xl font-bold text-center mb-8 text-gray-900">
          Trending In This Week
        </h2>

        {/* SLIDER */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
          {products.map((p, i) => {
            const variantId = `${p._id}-Default`;
            const liked = likedMap[variantId];

            return (
              /* ✅ CARD CLICK */
              <div
                key={i}
                className="min-w-[260px] cursor-pointer"
                onClick={() => router.push(`/products/${p._id}`)}
              >
                {/* IMAGE CARD */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-full h-[360px] object-cover"
                  />

                  {/* ❤️ WISHLIST */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 prevent navigation
                      if (!requireLogin()) return;

                      toggleWishlist({
                        variantId,
                        productId: p._id,
                        title: p.title,
                        image: p.images?.[0],
                        price: p.price,
                        color: "Default",
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
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                  >
                    <Heart size={16} fill={liked ? "#5b2d1f" : "none"} />
                  </button>

                  {/* BLACK TRANSPARENT OVERLAY */}
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                    <div className="flex items-end gap-3">
                      <img
                        src={p.images?.[0]}
                        alt={p.title}
                        className="w-10 h-14 object-cover rounded"
                      />

                      <div>
                        <p className="text-white text-sm leading-tight">
                          {p.title}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-white font-semibold">
                            ₹ {p.price}
                          </span>

                          {p.oldPrice && (
                            <span className="line-through text-gray-300 text-xs">
                              ₹ {p.oldPrice}
                            </span>
                          )}
                        </div>

                        {p.oldPrice && (
                          <p className="text-green-400 text-sm">
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

                {/* 🛒 ADD TO CART */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 prevent navigation
                    if (!requireLogin()) return;

                    addToCart({
                      productId: p._id,
                      variantId,
                      title: p.title,
                      image: p.images?.[0],
                      price: p.price,
                      color: "Default",
                    });

                    const audio = new Audio("/sounds/pop.mp3");
                    audio.volume = 0.6;
                    audio.play();

                    setAddedItem({
                      image: p.images?.[0],
                      title: p.title,
                    });
                    setShowCartModal(true);

                    document
                      .querySelector(".cart-icon")
                      ?.classList.add("cart-bounce");
                    setTimeout(() => {
                      document
                        .querySelector(".cart-icon")
                        ?.classList.remove("cart-bounce");
                    }, 600);
                  }}
                  className="w-full mt-4 py-3 bg-[#0f243e] text-white text-sm"
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>

        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
      </section>

      {/* ===== CART MODAL (GLOBAL) ===== */}
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
