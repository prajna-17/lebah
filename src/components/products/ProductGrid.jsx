"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { addToCart } from "@/utils/cart";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import LuxuryLoader from "@/components/home/LuxuryLoader";

const PRODUCTS_PER_PAGE = 8;

export default function ProductGrid({ products = [] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const [likedMap, setLikedMap] = useState({});
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  useEffect(() => {
    setLoading(false);
  }, [products]);

  /* sync wishlist state */
  useEffect(() => {
    const map = {};
    products.forEach((p) => {
      const variantId = `${p._id}-Default`;
      map[variantId] = isInWishlist(variantId);
    });
    setLikedMap(map);

    const sync = () => setLikedMap({ ...map });
    window.addEventListener("wishlist-updated", sync);
    return () => window.removeEventListener("wishlist-updated", sync);
  }, [products]);

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
      {loading ? (
        <div className="py-20">
          <LuxuryLoader />
        </div>
      ) : (
        <>
          {/* EMPTY STATE */}
          {products.length === 0 && (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Nothing here yet 🤍
              </h2>
              <p className="mt-2 text-gray-500">
                We’re curating products for this category.
                <br />
                Check back soon ✨
              </p>
            </div>
          )}

          {/* PRODUCT GRID */}
          {products.length > 0 && (
            <div
              ref={gridRef}
              className="grid grid-cols-2 gap-4 px-4 mt-4 text-gray-900"
            >
              {visibleProducts.map((product) => {
                const defaultColor =
                  product.colorImages?.[0]?.color || "Default";
                const defaultSize = product.sizes?.[0] || "Free";

                const variantId = `${product._id}-${defaultColor}-${defaultSize}`;
                const liked = likedMap[variantId];

                return (
                  /* ✅ CARD CLICK */
                  <div
                    key={product._id}
                    className="relative cursor-pointer"
                    onClick={() => router.push(`/products/${product._id}`)}
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-[260px] object-cover"
                    />

                    {/* ❤️ WISHLIST */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 🔥 prevent navigation
                        if (!requireLogin()) return;

                        toggleWishlist({
                          variantId,
                          productId: product._id,
                          title: product.title,
                          image: product.images?.[0],
                          price: product.price,
                          oldPrice: product.oldPrice,
                          discount: product.oldPrice
                            ? Math.round(
                                ((product.oldPrice - product.price) /
                                  product.oldPrice) *
                                  100,
                              )
                            : null,
                          color: product.colorImages?.[0]?.color || "Default",
                          size: product.sizes?.[0] || null,
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
                      className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow"
                    >
                      <Heart size={16} fill={liked ? "#5b2d1f" : "none"} />
                    </button>

                    {/* RATING */}
                    <div className="absolute bottom-24 left-2 bg-white px-2 py-1 rounded-md text-sm flex items-center gap-1 shadow">
                      <span>{product.rating || 4.3}</span>
                      <Star size={12} fill="black" />
                      <span className="text-gray-500">
                        ({product.reviews?.length || 56})
                      </span>
                    </div>

                    {/* 🛒 CART */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 🔥 prevent navigation
                        if (!requireLogin()) return;

                        addToCart({
                          productId: product._id,
                          variantId,
                          title: product.title,
                          image: product.images?.[0],
                          price: product.price,
                          oldPrice: product.oldPrice,
                          color: "Default",
                          size: product.sizes?.[0] || "Default", // 🔥 THIS
                        });

                        const audio = new Audio("/sounds/pop.mp3");
                        audio.volume = 0.6;
                        audio.play();

                        setAddedItem({
                          image: product.images?.[0],
                          title: product.title,
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
                      className="absolute bottom-16 right-2 bg-white p-1.5 rounded-full shadow"
                    >
                      <ShoppingCart size={16} />
                    </button>

                    {/* TEXT */}
                    <div className="mt-2">
                      <p className="font-medium">{product.title}</p>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">₹ {product.price}</span>

                        {product.oldPrice && (
                          <>
                            <span className="line-through text-gray-400 text-xs">
                              ₹ {product.oldPrice}
                            </span>
                            <span className="text-red-500 text-xs">
                              {Math.round(
                                ((product.oldPrice - product.price) /
                                  product.oldPrice) *
                                  100,
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
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 my-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    gridRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`w-8 h-8 rounded text-sm font-medium ${
                    currentPage === i + 1
                      ? "bg-[#0f243e] text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />

          {/* CART MODAL */}
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
      )}
    </>
  );
}
