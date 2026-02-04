"use client";

import { Heart, Share2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";

const images = [
  "/img/b1.jpeg",
  "/img/b2.jpeg",
  "/img/p3.jpeg",
  "/img/halfsleeve.jpeg",
];

export default function ProductHero() {
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("M");
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const requireLogin = (cb) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    cb && cb();
  };

  return (
    <section className="px-4 pt-4">
      {/* IMAGE SECTION */}
      {/* IMAGE SLIDER */}
      <div className="relative w-screen -mx-4 overflow-hidden -top-[16px]">
        <img
          src={images[activeImg]}
          className="w-full h-[550px] md:h-[520px] object-cover"
        />

        {/* SHARE + WISHLIST */}
        <button className="absolute top-4 right-4 bg-white p-2 rounded-md shadow text-gray-900">
          <Share2 size={18} />
        </button>
        <button
          onClick={() => requireLogin()}
          className="absolute top-16 right-4 bg-white p-2 rounded-md shadow"
        >
          <Heart size={18} className="text-[#0f243e]" />
        </button>

        {/* DESKTOP ARROWS ONLY */}
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
        <h1 className="text-lg font-semibold">Men Pink Linen Shirt</h1>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold">₹ 2230.00</span>
          <span className="line-through text-gray-400">₹ 3512.58</span>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            45% OFF
          </span>
        </div>

        <div className="flex items-center gap-1 mt-2 text-sm">
          <Star size={16} className="text-blue-900 fill-blue-900" />
          <span>4.9</span>
          <span className="text-gray-500">(256)</span>
        </div>

        {/* Change text-[13px] to text-xs (12px) or text-sm (14px) */}
        <p className="text-xs text-gray-500 mt-1 font-medium">
          Inclusive of all taxes.
        </p>

        <p className="mt-4 text-sm text-gray-700 leading-relaxed">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>

        {/* COLORS */}
        <div className="mt-7">
          <p className="text-sm font-medium text-gray-900">
            Color : Royal Pink
          </p>
          <div className="flex gap-3 mt-3">
            <div className="w-8 h-8 rounded bg-[#c7b6c8]" />
            <div className="w-8 h-8 rounded bg-[#5a4326]" />
            <div className="w-8 h-8 rounded bg-[#0c1117]" />
            <div className="w-8 h-8 rounded bg-[#3c6c93]" />
          </div>
        </div>

        {/* SIZE */}
        <div className="mt-7 flex justify-between items-center">
          <p className="text-sm font-medium text-gray-900">Size : {size}</p>
          <button className="text-sm underline text-gray-700">
            View Size Chart
          </button>
        </div>

        <div className="flex gap-3 mt-3">
          {["S", "M", "L", "XL", "2XL"].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-4 py-2 rounded text-sm font-medium ${
                size === s
                  ? "bg-[#0f243e] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {/* COUPON */}
        <div className="mt-6 border border-dashed border-blue-900 rounded-lg p-4 flex gap-3">
          <div className="text-green-600 text-xl font-bold">%</div>
          <div>
            <p className="text-[15px] text-gray-800 leading-relaxed font-normal">
              Get 10% on first order. Apply code on checkout
            </p>

            <p className="mt-1 text-sm font-semibold">Code : SHOP10</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-9">
          <button
            onClick={() => requireLogin()}
            className="flex-1 border border-[#0f243e] py-3 font-medium"
          >
            Buy Now
          </button>

          <button
            onClick={() => requireLogin()}
            className="flex-1 bg-[#0f243e] text-white py-3 font-medium"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
    </section>
  );
}
