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

export default function ProductSlider() {
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

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
          <div className="flex gap-5 overflow-x-auto scrollbar-hide font-semibold">
            {products.map((p) => {
              const variantId = `${p._id}-Default`;

              return (
                <div
                  key={p._id}
                  className="min-w-[220px] flex-shrink-0 cursor-pointer"
                  onClick={() => router.push(`/products/${p._id}`)}
                >
                  {/* Image card */}
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={p.images?.[0]}
                      alt={p.title}
                      className="h-[300px] w-full object-cover"
                    />

                    {/* Rating */}
                    <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-md text-mid text-gray-800 flex items-center gap-1 font-semibold">
                      <span>{p.rating || 4.3}</span>
                      <span>★</span>
                    </div>

                    {/* Cart icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
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
                      }}
                      className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <FiShoppingCart size={18} className="text-[#0f243e]" />
                    </button>
                  </div>

                  {/* Text */}
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
              );
            })}
          </div>
        )}

        {/* ✅ ALWAYS OUTSIDE TERNARY */}
        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
      </section>

      {/* ===== CART MODAL ===== */}
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
