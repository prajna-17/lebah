"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { useState } from "react";

export default function ProductSlider() {
  const products = [
    {
      id: 1,
      name: "Men Beige Casual Shirt",
      img: "/img/oxford.jpeg",
      rating: 4.3,
      price: 2999,
      oldPrice: 4999,
      off: "56% OFF",
    },
    {
      id: 2,
      name: "Men Beige Casual Shirt",
      img: "/img/linen.jpeg",
      rating: 4.3,
      price: 2999,
      oldPrice: 4999,
      off: "56% OFF",
    },
    {
      id: 3,
      name: "Men Beige Casual Shirt",
      img: "/img/p3.jpeg",
      rating: 4.3,
      price: 2999,
      oldPrice: 4999,
      off: "56% OFF",
    },
  ];
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
    <section className="bg-white px-4 py-10">
      <div className="flex gap-5 overflow-x-auto scrollbar-hide font-semibold">
        {products.map((p) => (
          <div key={p.id} className="min-w-[220px] flex-shrink-0">
            {/* Image card */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="h-[300px] w-full object-cover"
              />

              {/* Rating */}
              <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-md text-mid text-gray-800 flex items-center gap-1 font-semibold">
                <span>{p.rating}</span>
                <span className="text-gray-900">★</span>
              </div>

              {/* Cart icon */}
              <button
                onClick={() => requireLogin()}
                className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                <FiShoppingCart size={18} className="text-[#0f243e]" />
              </button>
            </div>

            {/* Text */}
            <div className="mt-3">
              <p className="text-mid font-medium text-gray-900">{p.name}</p>

              <div className="flex items-center gap-2 mt-1 text-big text-gray-900">
                <span className="font-semibold">
                  ₹ {p.price.toLocaleString()}
                </span>
                <span className="line-through text-gray-400">
                  ₹ {p.oldPrice.toLocaleString()}
                </span>
                <span className="text-red-600 font-medium">{p.off}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
    </section>
  );
}
