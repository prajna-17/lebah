"use client";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { useState } from "react";

const products = [
  {
    img: "/img/b1.jpeg",
    title: "Men Pink Formal\nLining Shirt",
    price: "₹ 2,999",
    old: "₹ 4,999",
    off: "50% OFF",
  },
  {
    img: "/img/b2.jpeg",
    title: "Men Pink Formal\nLining Shirt",
    price: "₹ 2,999",
    old: "₹ 4,999",
    off: "50% OFF",
  },
  {
    img: "/img/b3.jpeg",
    title: "Men Pink Formal\nLining Shirt",
    price: "₹ 2,999",
    old: "₹ 4,999",
    off: "50% OFF",
  },
];

export default function TrendingWeek() {
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
    <section className="mt-20 mb-24 px-4">
      <h2 className="text-xl font-bold text-center mb-8 text-gray-900">
        Trending In This Week
      </h2>

      {/* SLIDER */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
        {products.map((p, i) => (
          <div key={i} className="min-w-[260px]">
            {/* IMAGE CARD */}
            <div className="relative  overflow-hidden">
              <img src={p.img} className="w-full h-[360px] object-cover" />

              {/* BLACK TRANSPARENT OVERLAY */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                <div className="flex items-end gap-3">
                  {/* SMALL PREVIEW */}
                  <img src={p.img} className="w-10 h-14 object-cover rounded" />

                  {/* DETAILS */}
                  <div>
                    <p className="text-white text-sm leading-tight whitespace-pre-line">
                      {p.title}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white font-semibold">
                        {p.price}
                      </span>
                      <span className="line-through text-gray-300 text-xs">
                        {p.old}
                      </span>
                    </div>

                    <p className="text-green-400 text-sm">{p.off}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={() => requireLogin()}
              className="w-full mt-4 py-3 bg-[#0f243e] text-white text-sm"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
    </section>
  );
}
