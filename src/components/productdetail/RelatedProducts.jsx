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
        const filtered = data.filter(
          (p) =>
            p._id !== currentProductId &&
            (p.category === categoryId || p.category?._id === categoryId),
        );

        const sliced = filtered.slice(0, 4);
        setProducts(sliced);

        const map = {};
        sliced.forEach((p) => {
          const variantId = `${p._id}-Default`;
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
            onClick={() => router.push("/products")}
            className="text-sm underline text-gray-600"
          >
            View All
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => {
            const variantId = `${p._id}-Default`;
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

                  {/* ❤️ WISHLIST */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      requireLogin(() => {
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
                      });
                    }}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow"
                  >
                    <Heart size={16} fill={liked ? "#5b2d1f" : "none"} />
                  </button>

                  {/* 🛒 CART */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      requireLogin(() => {
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
                      });
                    }}
                    className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow"
                  >
                    <ShoppingCart size={16} />
                  </button>

                  {/* RATING */}
                  <div className="absolute bottom-2 left-2 bg-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 shadow">
                    <span className="font-semibold">{p.rating || 0}</span>
                    <Star size={12} className="fill-black text-black" />
                    <span className="text-gray-500">
                      ({p.reviews?.length || 0})
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
