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

  // 🔥 SIZE ONLY (NO COLOR STATE)
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    fetch(`${API}/products?superCategory=${SUPER_CATEGORY_MAP[activeTab]}`)
      .then((res) => res.json())
      .then((data) => {
        const bestSelling = data.filter(
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
          const variantId = `${p._id}-Default`;
          map[variantId] = isInWishlist(variantId);
        });
        setLikedMap(map);
      });

    const sync = () => {
      setLikedMap((prev) => ({ ...prev }));
    };

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
      {/* ===== MAIN SECTION (UNCHANGED UI) ===== */}
      <section className="bg-white px-4 py-10">
        <div className="grid grid-cols-2 gap-5">
          {products.map((p) => {
            const variantId = `${p._id}-Default`;
            const liked = likedMap[variantId];

            return (
              <div
                key={p._id}
                onClick={() => router.push(`/products/${p._id}`)}
                className="cursor-pointer relative"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="h-[260px] w-full object-cover"
                  />

                  {/* ❤️ HEART */}
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

                      const audio = new Audio("/sounds/pop.mp3");
                      audio.volume = 0.6;
                      audio.play();
                    }}
                    className="absolute top-2 right-2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow z-50"
                    style={{ color: liked ? "#0b1b2f" : "#333" }}
                  >
                    <FiHeart size={18} fill={liked ? "#5b2d1f" : "none"} />
                  </button>

                  {/* PRICE OVERLAY */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white">
                    <p className="text-xs">{p.title}</p>
                    <div className="mt-1 text-xs">
                      ₹ {p.price}
                      {p.oldPrice && (
                        <span className="line-through ml-2 text-gray-300">
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
                  className="mt-2 w-full bg-[#0b1d36] py-3 text-sm text-white active:scale-[0.97]"
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => router.push("/products")}
            className="border border-black px-10 py-3 text-sm text-[#0b1d36]"
          >
            View All
          </button>
        </div>

        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
      </section>

      {/* ===== CART MODAL (UNCHANGED) ===== */}
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

      {/* ===== SIZE-ONLY MODAL (WISHLIST STYLE) ===== */}
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
