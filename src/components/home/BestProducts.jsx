"use client";
import { useAuth } from "@/components/auth/AuthContext";
import LoginGate from "@/components/auth/LoginGate";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BestProducts() {
  const products = [
    { id: 1, img: "/img/b1.jpeg" },
    { id: 2, img: "/img/b2.jpeg" },
    { id: 3, img: "/img/b3.jpeg" },
    { id: 4, img: "/img/p3.jpeg" },
  ];
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const requireLogin = (cb) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    cb && cb();
  };

  return (
    <section className="bg-white px-4 py-10">
      {/* Grid */}
      <div className="grid grid-cols-2 gap-5">
        {products.map((p) => (
          <div key={p.id}>
            {/* Image card */}
            <div className="relative overflow-hidden ">
              <img
                src={p.img}
                alt="Men Pink Formal Linen Shirt"
                className="h-[260px] w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white">
                <div className="flex gap-2 items-end">
                  {/* Small thumbnail */}
                  <img
                    src={p.img}
                    alt=""
                    className="h-15 w-8 rounded object-cover"
                  />

                  <div>
                    <p className="text-xs leading-tight">
                      Men Pink Formal <br /> Linen Shirt
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="font-semibold">₹ 2,999</span>
                      <span className="line-through text-gray-300">
                        ₹ 4,999
                      </span>
                    </div>
                    <p className="text-green-400 text-xs mt-0.5">50% OFF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={() => requireLogin()}
              className="mt-2 w-full bg-[#0b1d36] py-3 text-sm text-white"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* View all */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => router.push("/products")}
          className="
    border border-black px-10 py-3 text-sm text-[#0b1d36]
    transition active:scale-[0.97]
  "
        >
          View All
        </button>
      </div>
      <LoginGate open={showLogin} onClose={() => setShowLogin(false)} />
    </section>
  );
}
