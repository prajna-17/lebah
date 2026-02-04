"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { useState } from "react";

const products = [
  {
    img: "/img/b1.jpeg",
    title: "Men Beige Casual Shirt",
  },
  {
    img: "/img/b3.jpeg",
    title: "Men Beige Casual Shirt",
  },
  {
    img: "/img/p3.jpeg",
    title: "Men Beige Casual Shirt",
  },
  {
    img: "/img/linen.jpeg",
    title: "Men Beige Casual Shirt",
  },
];

export default function RelatedProducts() {
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
    <section className="px-4 mt-14 text-gray-900">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold">Related Product</h2>
        <button className="text-sm underline text-gray-600">View All</button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((p, i) => (
          <div key={i} className="relative">
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img src={p.img} className="w-full h-[230px] object-cover" />

              {/* WISHLIST */}
              <button
                onClick={() => requireLogin()}
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow"
              >
                <Heart size={16} />
              </button>

              {/* CART */}
              <button
                onClick={() => requireLogin()}
                className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow"
              >
                <ShoppingCart size={16} />
              </button>

              {/* RATING */}
              <div className="absolute bottom-2 left-2 bg-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 shadow">
                <span className="font-semibold">4.3</span>
                <Star size={12} className="fill-black text-black" />
                <span className="text-gray-500">(50)</span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-2">
              <p className="text-sm font-semibold leading-tight">{p.title}</p>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold">₹ 2,999</span>
                <span className="line-through text-xs text-gray-400">
                  ₹ 4,999
                </span>
                <span className="text-xs text-red-500 font-medium">
                  56% OFF
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
    </section>
  );
}
