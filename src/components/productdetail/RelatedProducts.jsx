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

export default function RelatedProducts({ categoryId, currentProductId }) {
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
          (p) => p._id !== currentProductId && p.superCategory === categoryId,
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
  }, [categoryId, currentProductId]);

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
      {/* ===== MAIN UI (UNCHANGED) ===== */}
      <section className="px-4 mt-14 text-gray-900">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold">Related Products</h2>
          <button
            onClick={() => router.push(`/products?superCategory=${categoryId}`)}
            className="text-sm underline text-gray-600"
          >
            View
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4">
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
                className="relative cursor-pointer"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-full h-[230px] object-cover"
                  />
                  {!p.inStock && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      SOLD OUT
                    </div>
                  )}

                  {/* ❤️ WISHLIST */}
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
                    className={`absolute top-2 right-2 p-1.5 rounded-full shadow transition
    ${p.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"}
  `}
                  >
                    <Heart
                      size={16}
                      fill={liked && p.inStock ? "#5b2d1f" : "none"}
                      color={!p.inStock ? "#999" : "currentColor"}
                    />
                  </button>

                  {/* 🛒 CART */}
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
                      });
                    }}
                    className={`absolute bottom-2 right-2 p-1.5 rounded-full shadow transition
    ${p.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"}
  `}
                  >
                    <ShoppingCart
                      size={16}
                      className={p.inStock ? "text-black" : "text-gray-400"}
                    />
                  </button>

                  {/* RATING */}
                  <div className="absolute bottom-2 left-2 bg-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 shadow">
                    <span className="font-semibold">{p.rating || 4.6}</span>
                    <Star size={12} className="fill-black text-black" />
                    <span className="text-gray-500">
                      ({p.reviews?.length || 256})
                    </span>
                  </div>
                </div>

                {/* DETAILS */}
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

      {/* ===== CART MODAL (GLOBAL, SAME EVERYWHERE) ===== */}
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
