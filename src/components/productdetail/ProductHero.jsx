"use client";

import { Heart, Share2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { addToCart } from "@/utils/cart";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { FiX, FiCopy } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function ProductHero({ product, activeTab }) {
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
  const sliderRef = useRef(null);
  const images = activeImages.length ? activeImages : product.images || [];
  const variantId = `${product._id}-${selectedColor}-${selectedSize || "Free"}`;

  useEffect(() => {
    if (!product) return;
    setActiveImages(product.images || []);
    setActiveImg(0);
    const defaultColor =
      product.colorImages?.[0]?.color || product.colors?.[0] || "Default";
    setSelectedColor(defaultColor);
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
    if (typeof window !== "undefined") setProductLink(window.location.href);
  }, []);

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

  const menSizeChart = [
    {
      size: "XS",
      chest: 36,
      waist: 30,
      length: 27,
      shoulder: 16.5,
      sleeve: 23,
    },
    {
      size: "S",
      chest: 38,
      waist: 32,
      length: 27.5,
      shoulder: 17,
      sleeve: 23.5,
    },
    { size: "M", chest: 40, waist: 34, length: 28, shoulder: 17.5, sleeve: 24 },
    {
      size: "L",
      chest: 42,
      waist: 36,
      length: 28.5,
      shoulder: 18,
      sleeve: 24.5,
    },
    {
      size: "XL",
      chest: 44,
      waist: 38,
      length: 29,
      shoulder: 18.5,
      sleeve: 25,
    },
    {
      size: "XXL",
      chest: 46,
      waist: 40,
      length: 29.5,
      shoulder: 19,
      sleeve: 25.5,
    },
  ];

  const womenSizeChart = [
    { size: "XS", bust: 32, waist: 26, hips: 34 },
    { size: "S", bust: 34, waist: 28, hips: 36 },
    { size: "M", bust: 36, waist: 30, hips: 38 },
    { size: "L", bust: 38, waist: 32, hips: 40 },
    { size: "XL", bust: 40, waist: 34, hips: 42 },
    { size: "XXL", bust: 42, waist: 36, hips: 44 },
  ];

  const isWomen = activeTab === "women";
  const sizeData = isWomen ? womenSizeChart : menSizeChart;

  return (
    <>
      <style>{`
        /* ── Desktop layout ── */
        @media (min-width: 768px) {
          .ph-section {
            padding: 40px 64px !important;
            max-width: 1200px;
            margin: 0 auto;
          }

          /* Two-column layout */
          .ph-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: start;
          }

          /* Left: image column */
          .ph-img-col {
            position: sticky;
            top: 24px;
          }

          /* Image slider — full width, no negative margin */
          .ph-slider-wrap {
            position: relative;
            width: 100% !important;
            margin: 0 !important;
            top: 0 !important;
            border-radius: 6px;
            overflow: hidden;
            box-shadow:
              0 4px 24px rgba(0,0,0,0.1),
              0 0 0 1px rgba(201,164,76,0.18);
          }

          .ph-slider-track {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
          }
          .ph-slider-track::-webkit-scrollbar { display: none; }

          .ph-slide img {
            width: 100%;
            height: 560px !important;
            object-fit: cover;
          }

          /* Thumbnails row below image */
          .ph-thumbs {
            display: flex;
            gap: 10px;
            margin-top: 14px;
            flex-wrap: wrap;
          }
          .ph-thumb {
            width: 60px;
            height: 72px;
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
            border: 2px solid transparent;
            transition: border-color 0.2s, transform 0.2s;
            flex-shrink: 0;
          }
          .ph-thumb.active {
            border-color: #c9a44c;
            transform: scale(1.05);
          }
          .ph-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* Dot pills — hide on desktop, use thumbs instead */
          .ph-dots { display: none !important; }

          /* Share + wishlist reposition */
          .ph-share-btn {
            top: 14px !important;
            right: 14px !important;
          }
          .ph-wish-btn {
            top: 58px !important;
            right: 14px !important;
          }

          /* Arrow buttons bigger + styled */
          .ph-arrow {
            padding: 10px !important;
            background: rgba(255,255,255,0.92) !important;
            border: 1px solid rgba(201,164,76,0.2) !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.12) !important;
            transition: background 0.2s, transform 0.2s !important;
          }
          .ph-arrow:hover {
            background: #fff !important;
            transform: translateY(-50%) scale(1.08) !important;
          }

          /* Right: details column */
          .ph-details {
            padding-top: 4px;
          }
          .ph-details h1 {
            font-size: 22px !important;
            font-weight: 700 !important;
            line-height: 1.3 !important;
          }

          /* Price row */
          .ph-price-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 12px;
            flex-wrap: wrap;
          }
          .ph-price-main {
            font-size: 28px !important;
            font-weight: 800 !important;
          }

          /* Gold divider under price */
          .ph-gold-rule {
            display: block;
            width: 48px;
            height: 2px;
            background: linear-gradient(90deg, #c9a44c, transparent);
            margin: 14px 0;
          }

          /* Color swatches */
          .ph-color-swatch {
            width: 56px !important;
            height: 70px !important;
            border-radius: 6px !important;
          }

          /* Size buttons */
          .ph-size-btn {
            border-radius: 4px !important;
            min-width: 52px !important;
            text-align: center !important;
            transition: background 0.2s, border-color 0.2s, transform 0.15s !important;
          }
          .ph-size-btn:hover:not(.active-size) {
            border-color: #c9a44c !important;
            transform: scale(1.04) !important;
          }

          /* Action buttons */
          .ph-actions {
            margin-top: 28px !important;
            gap: 14px !important;
          }
          .ph-buy-btn,
          .ph-cart-btn {
            border-radius: 3px !important;
            padding: 14px !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            letter-spacing: 0.06em !important;
            transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s !important;
          }
          .ph-buy-btn:hover:not(:disabled) {
            box-shadow: 0 4px 14px rgba(15,36,62,0.2) !important;
            transform: translateY(-1px) !important;
          }
          .ph-cart-btn:hover:not(:disabled) {
            opacity: 0.88 !important;
            box-shadow: 0 4px 14px rgba(15,36,62,0.3) !important;
            transform: translateY(-1px) !important;
          }
        }

        /* ── Mobile — zero changes ── */
        @media (max-width: 767px) {
          .ph-layout   { display: block; }
          .ph-img-col  { position: static; }
          .ph-thumbs   { display: none; }
          .ph-dots     { display: flex !important; }
          .ph-slider-wrap {
            width: 100vw !important;
            margin-left: -16px !important;
            margin-right: -16px !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .ph-slide img { height: 550px !important; }
          .ph-gold-rule { display: none; }
          .ph-details { padding-top: 0; }
          .ph-price-main { font-size: 30px !important; }
          .ph-arrow { display: none !important; }
        }
      `}</style>

      <section className="ph-section px-4 pt-4">
        <div className="ph-layout">
          {/* ── LEFT: Image column ── */}
          <div className="ph-img-col">
            <div className="ph-slider-wrap relative w-screen -mx-4 overflow-hidden -top-[16px]">
              <div
                ref={sliderRef}
                className="ph-slider-track flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
                onScroll={(e) => {
                  const index = Math.round(
                    e.target.scrollLeft / e.target.clientWidth,
                  );
                  setActiveImg(index);
                }}
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="ph-slide w-full flex-shrink-0 snap-center"
                  >
                    <img
                      src={img}
                      className="w-full h-[550px] md:h-[520px] object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded z-20">
                        SOLD OUT
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Share */}
              <button
                onClick={() => setOpenShare(true)}
                className="ph-share-btn absolute top-4 right-4 bg-white p-2 rounded-md shadow text-gray-900"
              >
                <Share2 size={18} />
              </button>

              {/* Wishlist */}
              <button
                disabled={!product.inStock}
                onClick={() =>
                  requireLogin(() => {
                    if (!product.inStock) return;
                    toggleWishlist({
                      variantId,
                      productId: product._id,
                      title: product.title,
                      image: images[0],
                      price: product.price,
                      color: selectedColor,
                      size: selectedSize || "Free",
                    });
                    const updatedState = isInWishlist(variantId);
                    setLiked(updatedState);
                    showToast(
                      updatedState
                        ? "Added to Wishlist"
                        : "Removed from Wishlist",
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
                className={`ph-wish-btn absolute top-16 right-4 p-2 rounded-md shadow transition
                  ${product.inStock ? "bg-white" : "bg-gray-200 opacity-50 cursor-not-allowed"}`}
              >
                <Heart
                  size={18}
                  fill={liked && product.inStock ? "#5b2d1f" : "none"}
                  className={
                    product.inStock ? "text-[#0f243e]" : "text-gray-400"
                  }
                />
              </button>

              {/* Arrows */}
              <button
                onClick={() =>
                  setActiveImg((activeImg - 1 + images.length) % images.length)
                }
                className="ph-arrow hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setActiveImg((activeImg + 1) % images.length)}
                className="ph-arrow hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots — mobile only */}
            <div className="ph-dots flex justify-center gap-2 mt-4">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${activeImg === i ? "w-6 bg-[#0f243e]" : "w-2 bg-gray-300"}`}
                />
              ))}
            </div>

            {/* Thumbnails — desktop only */}
            <div className="ph-thumbs">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`ph-thumb ${activeImg === i ? "active" : ""}`}
                  onClick={() => {
                    setActiveImg(i);
                    sliderRef.current?.scrollTo({
                      left: i * sliderRef.current.clientWidth,
                      behavior: "smooth",
                    });
                  }}
                >
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Details column ── */}
          <div className="ph-details mt-6 text-gray-900">
            <h1 className="text-lg font-semibold">{product.title}</h1>

            <div className="ph-price-row flex items-center gap-2 mt-2">
              <span className="ph-price-main text-3xl font-bold">
                ₹ {product.price}
              </span>
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

            <span className="ph-gold-rule" />

            <div className="flex items-center gap-1 mt-5 text-sm">
              <Star size={16} className="text-gray-600 fill-blue-900" />
              <span>{product.rating || 4.3} (256)</span>
            </div>

            <p className="mt-4 text-sm text-gray-700">{product.description}</p>

            {/* Colors */}
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
                      className={`flex flex-col items-center gap-1 ${selectedColor === c.color ? "scale-105" : "opacity-80"}`}
                    >
                      <div className="ph-color-swatch w-12 h-16 rounded overflow-hidden border">
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

            {/* Sizes */}
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
                      className={`ph-size-btn px-4 py-2 rounded-md text-sm border ${selectedSize === s ? "active-size bg-[#0f243e] text-white border-[#0f243e]" : "bg-gray-100 border-gray-300"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="ph-actions flex gap-4 mt-9">
              <button
                disabled={!product.inStock}
                onClick={() =>
                  requireLogin(() => {
                    if (!product.inStock) return;
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
                      qty: 1,
                    };
                    localStorage.setItem(
                      "buyNowItem",
                      JSON.stringify(buyNowItem),
                    );
                    router.push("/checkout");
                  })
                }
                className={`ph-buy-btn flex-1 py-3 font-medium transition
                  ${product.inStock ? "border border-[#0f243e]" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
              >
                {product.inStock ? "Buy Now" : "Sold Out"}
              </button>

              <button
                disabled={!product.inStock}
                onClick={() =>
                  requireLogin(() => {
                    if (!product.inStock) return;
                    if (!selectedSize) {
                      alert("Please select a size");
                      return;
                    }
                    addToCart({
                      productId: product._id,
                      title: product.title,
                      image:
                        product.colorImages?.find(
                          (c) => c.color === selectedColor,
                        )?.images?.[0] || images[0],
                      price: product.price,
                      oldPrice: product.oldPrice,
                      color: selectedColor,
                      size: selectedSize,
                    });
                    const audio = new Audio("/sounds/pop.mp3");
                    audio.volume = 0.6;
                    audio.play();
                    setAddedItem({ image: images[0], title: product.title });
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
                className={`ph-cart-btn flex-1 py-3 font-medium transition
                  ${product.inStock ? "bg-[#0f243e] text-white" : "bg-gray-400 text-white cursor-not-allowed"}`}
              >
                {product.inStock ? "Add To Cart" : "Sold Out"}
              </button>
            </div>
          </div>
        </div>

        <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
      </section>

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

      {/* SIZE CHART — untouched */}
      {showSizeChart &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowSizeChart(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full md:w-[90%] md:max-w-md rounded-t-3xl md:rounded-2xl p-6 shadow-2xl animate-slideUp max-h-[85vh] overflow-y-auto"
            >
              <div className="overflow-x-auto text-gray-900">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Size</th>
                      {isWomen ? (
                        <>
                          <th>Bust</th>
                          <th>Waist</th>
                          <th>Hips</th>
                        </>
                      ) : (
                        <>
                          <th>Chest</th>
                          <th>Waist</th>
                          <th>Length</th>
                          <th>Shoulder</th>
                          <th>Sleeve</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.map((row, i) => {
                      const convert = (val) =>
                        unit === "cm" ? Math.round(val * 2.54) : val;
                      return (
                        <tr
                          key={i}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="py-3 font-medium">{row.size}</td>
                          {isWomen ? (
                            <>
                              <td>{convert(row.bust)}</td>
                              <td>{convert(row.waist)}</td>
                              <td>{convert(row.hips)}</td>
                            </>
                          ) : (
                            <>
                              <td>{convert(row.chest)}</td>
                              <td>{convert(row.waist)}</td>
                              <td>{convert(row.length)}</td>
                              <td>{convert(row.shoulder)}</td>
                              <td>{convert(row.sleeve)}</td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mb-6">
                <div className="relative flex bg-gray-100 rounded-full p-1 w-40">
                  <div
                    className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-[#0f243e] transition-all duration-300 ${unit === "cm" ? "left-1/2" : "left-0"}`}
                  />
                  <button
                    onClick={() => setUnit("in")}
                    className={`relative z-10 flex-1 text-sm font-medium transition ${unit === "in" ? "text-white" : "text-gray-700"}`}
                  >
                    IN
                  </button>
                  <button
                    onClick={() => setUnit("cm")}
                    className={`relative z-10 flex-1 text-sm font-medium transition ${unit === "cm" ? "text-white" : "text-gray-700"}`}
                  >
                    CM
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* SHARE MODAL — untouched */}
      <div
        className={`fixed inset-0 z-[99999] flex justify-center items-end transition-all duration-300 text-gray-900 ${openShare ? "visible" : "invisible pointer-events-none"}`}
      >
        <div
          onClick={() => setOpenShare(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${openShare ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`w-full max-w-[480px] bg-white rounded-t-2xl p-5 pb-8 z-[999999] transition-transform duration-300 ${openShare ? "translate-y-0" : "translate-y-full"}`}
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
                if (typeof window !== "undefined")
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                    "_blank",
                  );
              }}
            >
              <FaWhatsapp size={28} className="text-green-500" />
              WhatsApp
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() => {
                if (typeof window !== "undefined")
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${productLink}`,
                    "_blank",
                  );
              }}
            >
              <FaFacebookF size={28} className="text-blue-600" />
              Facebook
            </button>
            <button
              className="flex flex-col items-center"
              onClick={() => {
                if (typeof window !== "undefined")
                  window.open("https://www.instagram.com/", "_blank");
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
