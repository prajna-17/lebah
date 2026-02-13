"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { API } from "@/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/utils/cart";
import { createPortal } from "react-dom";
import LuxuryLoader from "./LuxuryLoader";
import { SUPER_CATEGORY_MAP } from "@/utils/superCategoryMap";

export default function ProductSlider({ activeTab }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // cart toast
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${API}/products?superCategory=${SUPER_CATEGORY_MAP[activeTab]}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab]);

  const requireLogin = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return false;
    }
    return true;
  };

  return (
    <>
      {/* ===== SLIDER ===== */}
      <section className="bg-white px-4 py-10">
        {loading ? (
          <LuxuryLoader />
        ) : (
          <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {products.map((p) => (
              <div
                key={p._id}
                className="min-w-[180px] max-w-[220px] flex-shrink-0 cursor-pointer transition-all duration-200 ease-in-out active:scale-95"
              >
                {/* IMAGE CARD */}
                <div className="relative rounded-xl overflow-hidden transition-all duration-200 active:scale-[0.98]">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-full aspect-[4/5] object-cover"
                    onClick={() => {
                      // 🔥 detect color from image
                      const matchedColor =
                        p.colorImages?.find((c) =>
                          c.images?.includes(p.images?.[0]),
                        )?.color || null;

                      router.push(
                        matchedColor
                          ? `/products/${p._id}?color=${encodeURIComponent(matchedColor)}`
                          : `/products/${p._id}`,
                      );
                    }}
                  />

                  {/* RATING */}
                  <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-md text-mid text-gray-800 flex items-center gap-1 font-semibold">
                    <span>{p.rating || 4.3}</span>
                    <span>★</span>
                  </div>

                  {/* CART ICON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!requireLogin()) return;

                      fetch(`${API}/products/${p._id}`)
                        .then((res) => res.json())
                        .then((data) => {
                          setSelectedProduct(data);
                          setSelectedSize(null);
                        });
                    }}
                    className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90"
                  >
                    <FiShoppingCart size={18} className="text-[#0f243e]" />
                  </button>
                </div>

                {/* TEXT (UNCHANGED) */}
                <div className="mt-3">
                  <p className="text-mid font-medium text-gray-900">
                    {p.title}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-big text-gray-900">
                    <span className="font-semibold">
                      ₹ {p.price.toLocaleString()}
                    </span>

                    {p.oldPrice && (
                      <>
                        <span className="line-through text-gray-400">
                          ₹ {p.oldPrice.toLocaleString()}
                        </span>
                        <span className="text-red-600 font-medium">
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
            ))}
          </div>
        )}

        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
      </section>

      {/* ===== SIZE MODAL (LIKE WISHLIST) ===== */}
      {selectedProduct &&
        typeof window !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedProduct(null)}
            />

            <div className="fixed inset-x-4 bottom-6 z-50 bg-white rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Select Size
              </h3>

              <div className="flex gap-3 flex-wrap mb-6">
                {(
                  selectedProduct.sizes ||
                  selectedProduct.colorImages?.[0]?.sizes ||
                  []
                ).map((size) => (
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
                    productId: selectedProduct._id,
                    variantId: `${selectedProduct._id}-${selectedSize}`,
                    title: selectedProduct.title,
                    image: selectedProduct.images?.[0],
                    price: selectedProduct.price,
                    color: "Default",
                    size: selectedSize,
                  });

                  setAddedItem({
                    image: selectedProduct.images?.[0],
                    title: selectedProduct.title,
                  });

                  setSelectedProduct(null);
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

      {/* ===== CART TOAST ===== */}
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
