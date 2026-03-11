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
import { PackageSearch } from "lucide-react";

const PRODUCTS_PER_PAGE = 8;

export default function ProductGrid({ products = [] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);

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
    const map = {};
    products.forEach((p) => {
      const defaultColor =
        p.colorImages?.[0]?.color || p.colors?.[0] || "Default";
      const defaultSize = p.sizes?.[0] || "Free";
      const variantId = `${p._id}-${defaultColor}-${defaultSize}`;
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
      <style>{`
        @media (min-width: 768px) {
          .pg-outer {
            padding: 0 64px;
          }

          /* 4-col grid */
          .pg-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 28px !important;
            padding: 0 !important;
            margin-top: 32px !important;
          }

          /* Card */
          .pg-card {
            opacity: 0;
            transform: translateY(14px);
            animation: pgCardIn 0.4s ease forwards;
          }
          .pg-card:nth-child(1) { animation-delay: 0.03s; }
          .pg-card:nth-child(2) { animation-delay: 0.07s; }
          .pg-card:nth-child(3) { animation-delay: 0.11s; }
          .pg-card:nth-child(4) { animation-delay: 0.15s; }
          .pg-card:nth-child(5) { animation-delay: 0.19s; }
          .pg-card:nth-child(6) { animation-delay: 0.23s; }
          .pg-card:nth-child(7) { animation-delay: 0.27s; }
          .pg-card:nth-child(8) { animation-delay: 0.31s; }
          @keyframes pgCardIn {
            to { opacity: 1; transform: translateY(0); }
          }

          /* Image wrapper */
          .pg-img-wrap {
            border-radius: 4px;
            overflow: hidden;
            box-shadow:
              0 2px 8px rgba(0,0,0,0.08),
              0 0 0 1px rgba(201,164,76,0.14);
            transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(.2,.8,.3,1);
          }
          .pg-card:hover .pg-img-wrap {
            box-shadow:
              0 10px 28px rgba(0,0,0,0.13),
              0 0 0 1px rgba(201,164,76,0.38);
            transform: translateY(-3px);
          }

          /* Image taller */
          .pg-img {
            height: 280px !important;
            transition: transform 5s ease !important;
          }
          .pg-card:hover .pg-img {
            transform: scale(1.05);
          }

          /* Icon buttons */
          .pg-icon-btn {
            width: 32px !important;
            height: 32px !important;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
            border: 1px solid rgba(201,164,76,0.15) !important;
            transition: transform 0.2s ease, background 0.2s, box-shadow 0.2s !important;
          }
          .pg-icon-btn:hover:not(:disabled) {
            transform: scale(1.12) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.18) !important;
          }

          /* Rating pill */
          .pg-rating {
            backdrop-filter: blur(4px);
            background: rgba(255,255,255,0.92) !important;
            border: 1px solid rgba(201,164,76,0.2);
            box-shadow: 0 1px 6px rgba(0,0,0,0.1);
            font-size: 11px !important;
          }

          /* Pagination */
          .pg-pagination {
            margin: 40px 0 !important;
          }
          .pg-page-btn {
            width: 36px !important;
            height: 36px !important;
            border-radius: 3px !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            transition: background 0.2s, box-shadow 0.2s !important;
          }
          .pg-page-btn.active {
            box-shadow: 0 3px 10px rgba(15,36,62,0.3) !important;
          }
          .pg-page-btn:not(.active):hover {
            background: #e5e5e5 !important;
          }
        }

        /* Mobile — zero changes */
        @media (max-width: 767px) {
          .pg-outer { padding: 0; }
          .pg-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            padding: 0 16px !important;
            margin-top: 16px !important;
          }
          .pg-card { opacity: 1 !important; transform: none !important; animation: none !important; }
          .pg-img-wrap { border-radius: 0 !important; box-shadow: none !important; transition: none !important; }
          .pg-card:hover .pg-img-wrap { transform: none !important; box-shadow: none !important; }
          .pg-img { height: 220px !important; transition: none !important; }
          .pg-card:hover .pg-img { transform: none !important; }
          .pg-icon-btn { width: auto !important; height: auto !important; border: none !important; box-shadow: none !important; }
          .pg-icon-btn:hover:not(:disabled) { transform: none !important; }
          .pg-rating { backdrop-filter: none !important; border: none !important; box-shadow: none !important; }
          .pg-pagination { margin: 32px 0 !important; }
          .pg-page-btn { width: 32px !important; height: 32px !important; }
        }
      `}</style>

      <div className="pg-outer">
        {/* EMPTY STATE — untouched */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-6">
              <PackageSearch size={36} className="text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-wide">
              No Products Available
            </h2>
            <p className="mt-3 text-gray-500 max-w-md leading-relaxed">
              We couldn't find any items in this selection. Try exploring our
              full collection.
            </p>
            <button
              onClick={() => router.push("/products")}
              className="mt-8 px-8 py-3 rounded-md bg-blue-900 text-white text-sm font-medium tracking-wide hover:bg-blue-900 transition duration-300"
            >
              Explore All Products
            </button>
          </div>
        )}

        {/* PRODUCT GRID */}
        {products.length > 0 && (
          <div
            ref={gridRef}
            className="pg-grid grid grid-cols-2 gap-x-4 gap-y-8 px-4 mt-4 text-gray-900"
          >
            {visibleProducts.map((product) => {
              const defaultColor =
                product.colorImages?.[0]?.color ||
                product.colors?.[0] ||
                "Default";
              const defaultSize = product.sizes?.[0] || "Free";
              const variantId = `${product._id}-${defaultColor}-${defaultSize}`;
              const liked = likedMap[variantId];

              return (
                <div
                  key={product._id}
                  className="pg-card cursor-pointer"
                  onClick={() => router.push(`/products/${product._id}`)}
                >
                  {/* IMAGE WRAPPER */}
                  <div className="pg-img-wrap relative w-full h-[220px]">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="pg-img w-full h-full object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        SOLD OUT
                      </div>
                    )}

                    {/* WISHLIST */}
                    <button
                      disabled={!product.inStock}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!product.inStock) return;
                        if (!requireLogin()) return;
                        toggleWishlist({
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
                          color: defaultColor,
                          size: product.sizes?.[0] || "Free",
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
                      className={`pg-icon-btn absolute top-2 right-2 p-1.5 rounded-full shadow transition
                        ${product.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"}`}
                    >
                      <Heart
                        size={16}
                        fill={liked && product.inStock ? "#5b2d1f" : "none"}
                        color={!product.inStock ? "#999" : "currentColor"}
                      />
                    </button>

                    {/* RATING */}
                    <div className="pg-rating absolute bottom-3 left-2 bg-white px-2 py-1 rounded-md text-sm flex items-center gap-1 shadow">
                      <span>{product.rating || 4.3}</span>
                      <Star size={12} fill="black" />
                      <span className="text-gray-500">
                        ({product.reviews?.length || 56})
                      </span>
                    </div>

                    {/* CART */}
                    <button
                      disabled={!product.inStock}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!product.inStock) return;
                        if (!requireLogin()) return;
                        addToCart({
                          productId: product._id,
                          title: product.title,
                          image: product.images?.[0],
                          price: product.price,
                          oldPrice: product.oldPrice,
                          color: defaultColor,
                          size: product.sizes?.[0] || "Default",
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
                      className={`pg-icon-btn absolute bottom-3 right-2 p-1.5 rounded-full shadow transition
                        ${product.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"}`}
                    >
                      <ShoppingCart
                        size={16}
                        className={
                          product.inStock ? "text-black" : "text-gray-400"
                        }
                      />
                    </button>
                  </div>

                  {/* TEXT — untouched */}
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
          <div className="pg-pagination flex justify-center items-center gap-2 my-8">
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
                className={`pg-page-btn w-8 h-8 rounded text-sm font-medium ${
                  currentPage === i + 1
                    ? "active bg-[#0f243e] text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />

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
      </div>
    </>
  );
}
