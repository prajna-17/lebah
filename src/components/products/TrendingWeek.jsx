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

  const [showVariantModal, setShowVariantModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  // 🔥 SIZE ONLY
  const [selectedSize, setSelectedSize] = useState(null);

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
      {/* ===== MAIN SECTION (UNCHANGED) ===== */}
      <section className="mt-20 mb-24 px-4">
        <h2 className="text-xl font-bold text-center mb-8 text-gray-900">
          Trending In This Week
        </h2>

        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
          {products.map((p, i) => {
            const variantId = `${p._id}-Default`;
            const liked = likedMap[variantId];

            return (
              <div
                key={i}
                className="min-w-[260px] cursor-pointer"
                onClick={() => router.push(`/products/${p._id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-full h-[360px] object-cover"
                  />

                  {/* ❤️ WISHLIST */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                  >
                    <Heart size={16} fill={liked ? "#5b2d1f" : "none"} />
                  </button>

                  {/* OVERLAY */}
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                    <p className="text-white text-sm">{p.title}</p>
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
                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!requireLogin()) return;

                    setActiveProduct(p);
                    setSelectedSize(null);
                    setShowVariantModal(true);
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

      {/* ===== CART MODAL (UNCHANGED) ===== */}
      {showCartModal &&
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

      {/* ===== SIZE ONLY MODAL (WISHLIST STYLE) ===== */}
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
                  addToCart({
                    productId: activeProduct._id,
                    variantId: `${activeProduct._id}-${selectedSize}`,
                    title: activeProduct.title,
                    image: activeProduct.images?.[0],
                    price: activeProduct.price,
                    oldPrice: activeProduct.oldPrice,
                    color: "Default",
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
