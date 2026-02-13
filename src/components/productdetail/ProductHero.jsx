"use client";

import { Heart, Share2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { addToCart } from "@/utils/cart";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { FiX, FiCopy } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function ProductHero({ product }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const colorFromURL = searchParams.get("color");

  const [activeImg, setActiveImg] = useState(0);
  const [activeImages, setActiveImages] = useState(product.images || []);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [unit, setUnit] = useState("in");
  const [openShare, setOpenShare] = useState(false);
  const [productLink, setProductLink] = useState("");

  const [liked, setLiked] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const images = activeImages.length ? activeImages : product.images || [];
  const variantId = `${product._id}-${selectedColor}-${selectedSize}`;
  useEffect(() => {
    if (!product) return;

    // ALWAYS start with default product.images
    setActiveImages(product.images || []);
    setActiveImg(0);

    // colorImages override ONLY when user clicks color
    if (product.colorImages?.length > 0) {
      setSelectedColor(product.colors?.[0] || "Default");
    }
  }, [product]);
  useEffect(() => {
    if (showSizeChart) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "";
    };
  }, [showSizeChart]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setProductLink(window.location.href);
    }
  }, []);

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
  const copyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(productLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* ===== MAIN UI (UNCHANGED) ===== */}
      <section className="px-4 pt-4">
        {/* IMAGE SLIDER */}
        <div className="relative w-screen -mx-4 overflow-hidden -top-[16px]">
          <div
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
            onScroll={(e) => {
              const index = Math.round(
                e.target.scrollLeft / e.target.clientWidth,
              );
              setActiveImg(index);
            }}
          >
            {images.map((img, i) => (
              <div key={i} className="w-full flex-shrink-0 snap-center">
                <img
                  src={img}
                  className="w-full h-[550px] md:h-[520px] object-cover"
                />
              </div>
            ))}
          </div>
          {/* SHARE */}
          <button
            onClick={() => setOpenShare(true)}
            className="absolute top-4 right-4 bg-white p-2 rounded-md shadow text-gray-900"
          >
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

        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeImg === i ? "w-6 bg-[#0f243e]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* THUMBNAILS */}
        {/* <div className="flex gap-3 mt-0.5 justify-center">
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
        </div> */}

        {/* DETAILS */}
        <div className="mt-6 text-gray-900">
          <h1 className="text-lg font-semibold">{product.title}</h1>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl font-bold">₹ {product.price}</span>

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

          <div className="flex items-center gap-1 mt-5 text-sm">
            <Star size={16} className="text-gray-600 fill-blue-900" />
            <span>{product.rating || 4.3} (256) </span>
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

          {/* SIZES */}
          {(
            product.colorImages?.find((c) => c.color === selectedColor)
              ?.sizes || product.sizes
          )?.length > 0 && (
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  Size : <span className="font-semibold">{selectedSize}</span>
                </p>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-sm underline text-gray-600 hover:text-black transition"
                >
                  View Size Chart
                </button>
              </div>

              <div className="flex gap-3 mt-3 flex-wrap">
                {(
                  product.colorImages?.find((c) => c.color === selectedColor)
                    ?.sizes || product.sizes
                ).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-md text-sm border ${
                      selectedSize === s
                        ? "bg-[#0f243e] text-white border-[#0f243e]"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-9">
            <button
              onClick={() =>
                requireLogin(() => {
                  if (!selectedSize) {
                    alert("Please select a size");
                    return;
                  }

                  const buyNowItem = {
                    productId: product._id,
                    variantId,
                    title: product.title,
                    image:
                      product.colorImages?.find(
                        (c) => c.color === selectedColor,
                      )?.images?.[0] || images[0],
                    price: product.price,
                    oldPrice: product.oldPrice,
                    color: selectedColor,
                    size: selectedSize,
                    quantity: 1,
                  };

                  // Store temporarily for checkout
                  localStorage.setItem(
                    "buyNowItem",
                    JSON.stringify(buyNowItem),
                  );

                  router.push("/checkout?type=buyNow");
                })
              }
              className="flex-1 border border-[#0f243e] py-3 font-medium"
            >
              Buy Now
            </button>

            <button
              onClick={() =>
                requireLogin(() => {
                  if (!selectedSize) {
                    alert("Please select a size");
                    return;
                  }
                  console.log("ADDING TO CART 👉", {
                    size: selectedSize,
                    color: selectedColor,
                  });

                  addToCart({
                    productId: product._id,
                    variantId,
                    title: product.title,
                    image:
                      product.colorImages?.find(
                        (c) => c.color === selectedColor,
                      )?.images?.[0] || images[0],
                    price: product.price,
                    oldPrice: product.oldPrice,
                    color: selectedColor,
                    size: selectedSize, // 🔥 THIS FIXES CART SIZE
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
      {showSizeChart &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowSizeChart(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
          bg-white w-full md:w-[90%] md:max-w-md
          rounded-t-3xl md:rounded-2xl
          p-6
          shadow-2xl
          animate-slideUp
          max-h-[85vh]
          overflow-y-auto
        "
            >
              {/* HEADER */}
              <div className="overflow-x-auto text-gray-900">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Size</th>
                      <th>Chest</th>
                      <th>Waist</th>
                      <th>Hips</th>
                      <th>Bust</th>
                      <th>Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        size: "S",
                        chest: 34,
                        waist: 28,
                        hips: 36,
                        bust: 34,
                        length: 24,
                      },
                      {
                        size: "M",
                        chest: 36,
                        waist: 30,
                        hips: 38,
                        bust: 36,
                        length: 25,
                      },
                      {
                        size: "L",
                        chest: 38,
                        waist: 32,
                        hips: 40,
                        bust: 38,
                        length: 26,
                      },
                      {
                        size: "XL",
                        chest: 40,
                        waist: 34,
                        hips: 42,
                        bust: 40,
                        length: 27,
                      },
                    ].map((row, i) => {
                      const convert = (val) =>
                        unit === "cm" ? Math.round(val * 2.54) : val;

                      return (
                        <tr
                          key={i}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="py-3 font-medium">{row.size}</td>
                          <td>{convert(row.chest)}</td>
                          <td>{convert(row.waist)}</td>
                          <td>{convert(row.hips)}</td>
                          <td>{convert(row.bust)}</td>
                          <td>{convert(row.length)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* TABLE STYLE */}
              {/* UNIT TOGGLE */}
              <div className="flex justify-center mb-6">
                <div className="relative flex bg-gray-100 rounded-full p-1 w-40">
                  <div
                    className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-[#0f243e] transition-all duration-300 ${
                      unit === "cm" ? "left-1/2" : "left-0"
                    }`}
                  />
                  <button
                    onClick={() => setUnit("in")}
                    className={`relative z-10 flex-1 text-sm font-medium transition ${
                      unit === "in" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    IN
                  </button>
                  <button
                    onClick={() => setUnit("cm")}
                    className={`relative z-10 flex-1 text-sm font-medium transition ${
                      unit === "cm" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
      {/* SHARE MODAL */}
      <div
        className={`fixed inset-0 z-[99999] flex justify-center items-end transition-all duration-300 text-gray-900 ${
          openShare ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpenShare(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            openShare ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`w-full max-w-[480px] bg-white rounded-t-2xl p-5 pb-8 z-[999999]
               transition-transform duration-300 ${
                 openShare ? "translate-y-0" : "translate-y-full"
               }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Share Order</h3>
            <button onClick={() => setOpenShare(false)}>
              <FiX size={22} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-5 text-center text-sm font-medium">
            <button
              className="flex flex-col items-center"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                    "_blank",
                  );
                }
              }}
            >
              <FaWhatsapp size={28} className="text-green-500" />
              WhatsApp
            </button>

            <button
              className="flex flex-col items-center"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${productLink}`,
                    "_blank",
                  );
                }
              }}
            >
              <FaFacebookF size={28} className="text-blue-600" />
              Facebook
            </button>

            <button
              className="flex flex-col items-center"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open("https://www.instagram.com/", "_blank");
                }
              }}
            >
              <FaInstagram size={28} className="text-pink-500" />
              Instagram
            </button>

            <button className="flex flex-col items-center" onClick={copyLink}>
              <FiCopy size={28} />
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
