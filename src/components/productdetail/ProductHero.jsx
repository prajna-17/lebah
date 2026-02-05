"use client";

import { Heart, Share2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { addToCart } from "@/utils/cart";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function ProductHero({ product }) {
  const router = useRouter();

  const [activeImg, setActiveImg] = useState(0);
  const [activeImages, setActiveImages] = useState(product.images || []);
  const [selectedColor, setSelectedColor] = useState("Default");
  const [size, setSize] = useState("M");

  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const [liked, setLiked] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const images = activeImages.length ? activeImages : product.images || [];
  const variantId = `${product._id}-${selectedColor}`;

  /* sync wishlist for this variant */
  useEffect(() => {
    setLiked(isInWishlist(variantId));

    const sync = () => setLiked(isInWishlist(variantId));
    window.addEventListener("wishlist-updated", sync);
    return () => window.removeEventListener("wishlist-updated", sync);
  }, [variantId]);

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

  return (
    <>
      {/* ===== MAIN UI (UNCHANGED) ===== */}
      <section className="px-4 pt-4">
        {/* IMAGE SLIDER */}
        <div className="relative w-screen -mx-4 overflow-hidden -top-[16px]">
          <img
            src={images[activeImg]}
            className="w-full h-[550px] md:h-[520px] object-cover"
          />

          {/* SHARE */}
          <button className="absolute top-4 right-4 bg-white p-2 rounded-md shadow text-gray-900">
            <Share2 size={18} />
          </button>

          {/* ❤️ WISHLIST */}
          <button
            onClick={() =>
              requireLogin(() => {
                toggleWishlist({
                  variantId,
                  productId: product._id,
                  title: product.title,
                  image: images[0],
                  price: product.price,
                  color: selectedColor,
                });

                showToast(
                  liked ? "Removed from Wishlist" : "Added to Wishlist",
                );

                const heart = document.createElement("div");
                heart.innerHTML = "💙";
                heart.className = "pop-heart";
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 700);

                const audio = new Audio("/sounds/pop.mp3");
                audio.volume = 0.6;
                audio.play();
              })
            }
            className="absolute top-16 right-4 bg-white p-2 rounded-md shadow"
          >
            <Heart
              size={18}
              fill={liked ? "#5b2d1f" : "none"}
              className="text-[#0f243e]"
            />
          </button>

          {/* DESKTOP ARROWS */}
          <button
            onClick={() =>
              setActiveImg((activeImg - 1 + images.length) % images.length)
            }
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => setActiveImg((activeImg + 1) % images.length)}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-3 mt-0.5 justify-center">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActiveImg(i)}
              className={`w-16 h-20 object-cover rounded cursor-pointer border ${
                activeImg === i ? "border-[#0f243e]" : "border-transparent"
              }`}
            />
          ))}
        </div>

        {/* DETAILS */}
        <div className="mt-6 text-gray-900">
          <h1 className="text-lg font-semibold">{product.title}</h1>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold">₹ {product.price}</span>

            {product.oldPrice && (
              <>
                <span className="line-through text-gray-400">
                  ₹ {product.oldPrice}
                </span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100,
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 mt-2 text-sm">
            <Star size={16} className="text-blue-900 fill-blue-900" />
            <span>{product.rating || 4.3}</span>
          </div>

          <p className="mt-4 text-sm text-gray-700">{product.description}</p>

          {/* COLORS */}
          {product.colorImages?.length > 0 && (
            <div className="mt-7">
              <p className="text-sm font-medium">Color : {selectedColor}</p>

              <div className="flex gap-4 mt-3 flex-wrap">
                {product.colorImages.map((c) => (
                  <button
                    key={c.color}
                    onClick={() => {
                      setSelectedColor(c.color);
                      setActiveImages(c.images);
                      setActiveImg(0);
                    }}
                    className={`flex flex-col items-center gap-1 ${
                      selectedColor === c.color ? "scale-105" : "opacity-80"
                    }`}
                  >
                    <div className="w-12 h-16 rounded overflow-hidden border">
                      <img
                        src={c.images?.[0]}
                        alt={c.color}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs">{c.color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-9">
            <button
              onClick={() => requireLogin()}
              className="flex-1 border border-[#0f243e] py-3 font-medium"
            >
              Buy Now
            </button>

            <button
              onClick={() =>
                requireLogin(() => {
                  addToCart({
                    productId: product._id,
                    variantId,
                    title: product.title,
                    image: images[0],
                    price: product.price,
                    color: selectedColor,
                  });

                  const audio = new Audio("/sounds/pop.mp3");
                  audio.volume = 0.6;
                  audio.play();

                  setAddedItem({
                    image: images[0],
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
                })
              }
              className="flex-1 bg-[#0f243e] text-white py-3 font-medium"
            >
              Add To Cart
            </button>
          </div>
        </div>

        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
      </section>

      {/* ===== CART MODAL (SAME GLOBAL ONE) ===== */}
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
