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
  // const [loading, setLoading] = useState(true);

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
  // useEffect(() => {
  //   if (products.length === 0) {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [products]);

  /* sync wishlist state */
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
      <>
        {/* EMPTY STATE */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div
              className="w-20 h-20 flex items-center justify-center 
      rounded-full bg-gray-100 mb-6"
            >
              <PackageSearch size={36} className="text-gray-500" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 tracking-wide">
              No Products Available
            </h2>

            <p className="mt-3 text-gray-500 max-w-md leading-relaxed">
              We couldn’t find any items in this selection. Try exploring our
              full collection.
            </p>

            <button
              onClick={() => router.push("/products")}
              className="mt-8 px-8 py-3 rounded-md 
      bg-blue-900 text-white 
      text-sm font-medium tracking-wide
      hover:bg-blue-900 transition duration-300"
            >
              Explore All Products
            </button>
          </div>
        )}

        {/* PRODUCT GRID */}
        {products.length > 0 && (
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-x-4 gap-y-8 px-4 mt-4 text-gray-900"
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
                /* ✅ CARD CLICK */
                <div
                  key={product._id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/products/${product._id}`)}
                >
                  {/* IMAGE WRAPPER */}
                  <div className="relative w-full h-[220px]">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        SOLD OUT
                      </div>
                    )}

                    {/* ❤️ WISHLIST */}
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
                      className={`absolute top-2 right-2 p-1.5 rounded-full shadow transition
    ${
      product.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"
    }
  `}
                    >
                      <Heart
                        size={16}
                        fill={liked && product.inStock ? "#5b2d1f" : "none"}
                        color={!product.inStock ? "#999" : "currentColor"}
                      />
                    </button>

                    {/* RATING */}
                    <div className="absolute bottom-3 left-2 bg-white px-2 py-1 rounded-md text-sm flex items-center gap-1 shadow">
                      <span>{product.rating || 4.3}</span>
                      <Star size={12} fill="black" />
                      <span className="text-gray-500">
                        ({product.reviews?.length || 56})
                      </span>
                    </div>

                    {/* 🛒 CART */}
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
                      className={`absolute bottom-3 right-2 p-1.5 rounded-full shadow transition
    ${
      product.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"
    }
  `}
                    >
                      <ShoppingCart
                        size={16}
                        className={
                          product.inStock ? "text-black" : "text-gray-400"
                        }
                      />
                    </button>
                  </div>

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
    </>
  );
}
