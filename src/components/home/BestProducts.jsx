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

export default function BestProducts() {
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => {
        const bestSelling = data.filter(
          (p) => p.productSellingCategory === "best-selling",
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

                    addToCart({
                      productId: p._id,
                      variantId,
                      title: p.title,
                      image: p.images?.[0],
                      price: p.price,
                      color: "Default",
                    });

                    const btn = e.currentTarget;
                    btn.classList.add("cart-anim");

                    setTimeout(() => {
                      btn.classList.remove("cart-anim");

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
                    }, 600);
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

      {/* ===== CART MODAL (PORTAL FIX) ===== */}
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
